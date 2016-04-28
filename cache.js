var util = require('util')
var Cache = module.exports = function Cache(consoleMethod) {
  this.cache = {
    bufferedMessages: [],
    size: 0
  }
  this.consoleMethod = consoleMethod

  process.on('exit', this.flush.bind(this))
}

Cache.prototype.store = function(messageArguments) {
  var formattedMessage = util.format.apply(console, messageArguments)

  this.cache.size += Buffer.byteLength(formattedMessage)
  this.cache.bufferedMessages.push(formattedMessage)

  if (this.cache.size > 8192) this.flush()
}

Cache.prototype.flush = function(code) {
  if (this.cache.size === 0) return

  this.consoleMethod(this.cache.bufferedMessages.join('\n'))
  this.cache.bufferedMessages.length = 0
  this.cache.size = 0
}
