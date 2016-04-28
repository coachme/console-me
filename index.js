var isPatched = false;
var slice = Array.prototype.slice;

if (isPatched) return console.log('already patched');

function addColor(string, name) {
  var colors = {
    green: ['\x1B[32m', '\x1B[39m'],
    red: ['\x1B[1m\x1B[31m', '\x1B[39m\x1B[22m'],
    yellow: ['\x1B[33m', '\x1B[39m']
  }

  return colors[name][0] + string + colors[name][1];
}

function getColorName(methodName) {
  switch (methodName) {
    case 'error': return 'red';
    case 'warn': return 'yellow';
    default: return 'green';
  }
}

['log', 'info', 'warn', 'error', 'dir', 'assert'].forEach(function(method) {
  var baseConsoleMethod = console[method];
  var color = getColorName(method);
  var messageType = method.toUpperCase();
  var output = method === 'warn' || method === 'error' ? 'stderr' : 'stdout';

  console[method] = function() {
    var date = (new Date()).toISOString();
    var args = slice.call(arguments);

    if (process[output].isTTY)
      messageType = addColor(messageType, color);

    process[output].write('[' + date + '] ' + messageType + ' ');

    return baseConsoleMethod.apply(console, args);
  }
});

isPatched = true;
