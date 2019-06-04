exports.formatDate = function formatDate(milliseconds) {
  const d = new Date(milliseconds)
  const year = d.getFullYear()
  const month = exports.leftPad(`${d.getMonth() + 1}`, 2, 0)
  const day = exports.leftPad(`${d.getDate()}`, 2, 0)
  const hour = exports.leftPad(`${d.getHours()}`, 2, 0)
  const min = exports.leftPad(`${d.getMinutes()}`, 2, 0)

  return `${year}-${month}-${day}T${hour}:${min}`
}

exports.safeRegexMatch = function safeRegexMatch(str, regex, defaultValue = '') {
  const match = str.match(regex)
  if (!match) return defaultValue
  return match[1]
}

exports.getParam = function getParam(url, param, defaultValue) {
  return decodeURIComponent(exports.safeRegexMatch(url, new RegExp(`${param}\\\\?=(.+?)\\\\?(&|$)`), defaultValue))
}

exports.leftPad = function leftPad(string, length, padChar) {
  let str = '' + string
  while (str.length < length) {
    str = padChar + str
  }
  return str
}
