var Cache = require('./cache')
var isPatched = false
var slice = Array.prototype.slice
var util = require('util')

if (isPatched) return

function addColor(string) {
  var colorName = getColorName(string)
  var colors = {
    green: ['\x1B[32m', '\x1B[39m'],
    red: ['\x1B[1m\x1B[31m', '\x1B[39m\x1B[22m'],
    yellow: ['\x1B[33m', '\x1B[39m']
  }

  return colors[colorName][0] + string + colors[colorName][1]
}

function getColorName(methodName) {
  switch (methodName) {
    case 'ERROR': return 'red'
    case 'WARN': return 'yellow'
    default: return 'green'
  }
}

['log', 'info', 'warn', 'error', 'dir', 'assert'].forEach(function(method) {
  var baseConsoleMethod = console[method]
  var cache = new Cache(baseConsoleMethod)
  var messageType = method.toUpperCase()
  var output = method === 'warn' || method === 'error' ? 'stderr' : 'stdout'

  if (process[output].isTTY) messageType = addColor(messageType)

  console[method] = function() {
    var date = (new Date()).toISOString()
    var args = slice.call(arguments)
    var dateMessage = '[' + date + '] ' + messageType + ' '

    if (args.length > 0)
      args[0] = dateMessage + (typeof args[0] !== 'string' ? util.format(args[0]) : args[0])
    else
      args[0] = dateMessage

    process.env.NODE_ENV === 'production' ? cache.store(args) : baseConsoleMethod.apply(console, args)
  }
})

isPatched = true
