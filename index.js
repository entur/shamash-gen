#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .description(pkg.description)
  .arguments('<source>')
  .option('-t, --test', 'Use test environment')
  .parse(process.argv);

function main() {
  const raw = program.args

  if (!raw.length) {
    console.log("No arguments passed")
    return
  }

  const parsed = JSON.parse(raw)

  const query = parsed.query
  const variables = parsed.variables

  console.log("\n\n")

  const env = program.test ? 'api-test' : 'api'

  const v = JSON.stringify(variables)
  const q = query.replace(/\n|\s+/g, ' ').trim()

  const url = `https://${env}.entur.org/doc/shamash-journeyplanner/?variables=${v}&query=${q}`
  console.log(url)
}

main()
