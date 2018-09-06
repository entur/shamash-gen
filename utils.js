exports.formatDate = function formatDate(milliseconds) {
  const d = new Date(milliseconds)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, 0)
  const day = `${d.getDate()}`.padStart(2, 0)
  const hour = `${d.getHours()}`.padStart(2, 0)
  const min = `${d.getMinutes()}`.padStart(2, 0)

  return `${year}-${month}-${day}T${hour}:${min}`
}

exports.safeRegexMatch = function safeRegexMatch(str, regex, defaultValue = '') {
  const match = str.match(regex)
  if (!match) return defaultValue
  return match[1]
}

exports.getParam = function getParam(url, param, defaultValue) {
  return decodeURIComponent(exports.safeRegexMatch(url, new RegExp(`${param}=(.+?)&`), defaultValue))
}

exports.webEnvToOtpEnv = function webEnvToOtpEnv(webEnv) {
  switch (webEnv) {
    case 'dev':
    return 'api-test'
    case 'staging':
    return 'api-stage'
    default:
      return 'api'
  }
}
