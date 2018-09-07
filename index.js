#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

const tripQuery = require('./trip-query')
const utils = require('./utils')

program
  .version(pkg.version)
  .description(pkg.description)
  .arguments('<source|url>')
  .option('-t, --test', 'Use test environment')
  .parse(process.argv);

function generateShamashUrl(query, variables, env = 'api') {
    const v = JSON.stringify(variables)
    const q = query.replace(/\n/g, ' ').replace(/\s+/g, ' ')
    return `https://${env}.entur.org/doc/shamash-journeyplanner/?variables=${v}&query=${q}`
}

function handleRawRequestJson(rawString) {
    const parsed = JSON.parse(rawString)

    const query = parsed.query
    const variables = parsed.variables

    const env = program.test ? 'api-test' : 'api'
    return generateShamashUrl(query, variables, env)
}

function handleWebAppUrl(url) {
  if (!url.includes('en-tur.no')) {
    throw new Error('Wrong URL. Expected en-tur.no, dev.en-tur.no or staging.en-tur.no')
  }

  const transportModes = [...utils.getParam(url, 'transportModes').split(','), 'foot']
  if (transportModes.includes('bus')) {
    transportModes.push('coach')
  }
  const arriveBy = utils.getParam(url, 'timepickerMode') === 'arriveBefore'
  const dateTime = utils.formatDate(Number(utils.getParam(url, 'date', new Date().getTime())))

  const startId = utils.getParam(url, 'startId')
  const startLat = Number(utils.getParam(url, 'startLat'))
  const startLon = Number(utils.getParam(url, 'startLon'))
  const startLabel = utils.getParam(url, 'startParam')
  const startName = utils.getParam(url, 'startName')

  const stopId = utils.getParam(url, 'stopId')
  const stopLat = Number(utils.getParam(url, 'stopLat'))
  const stopLon = Number(utils.getParam(url, 'stopLon'))
  const stopLabel = utils.getParam(url, 'stopLabel')
  const stopName = utils.getParam(url, 'stopName')

  const variables = {
    modes: transportModes.filter(mode => mode !== 'flytog'),
    dateTime,
    arriveBy,
    numTripPatterns: 10,
    from: {
      name: startLabel || startName,
      place: startId,
      coordinates: {
        latitude: startLat,
        longitude: startLon,
      }
    },
    to: {
      name: stopLabel || startLabel,
      place: stopId,
      coordinates: {
        latitude: stopLat,
        longitude: stopLon,
      }
    },
    maxPreTransitWalkDistance: 2000,
  }

  const webEnv = utils.safeRegexMatch(url, /https:\/\/(.+?)\.en-tur/)
  const otpEnv = utils.webEnvToOtpEnv(webEnv)
  return generateShamashUrl(tripQuery, variables, otpEnv)
}

function main() {
  const raw = program.args

  if (!raw.length) {
    console.log("No arguments passed")
    return
  }

  let shamashUrl = ''
  if (raw[0].startsWith('http')) {
    shamashUrl = handleWebAppUrl(raw[0])
    console.log()
    console.log('This Shamash URL is generated from the contents of the web URL.')
    console.log('The request is not guaranteed to be exactly the same as the actual search done by the web client.')
  } else {
    shamashUrl = handleRawRequestJson(raw[0])
  }

  console.log("\n")
  console.log("Your Shamash URL:\n")
  console.log(shamashUrl)
}

main()
