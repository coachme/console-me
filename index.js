if (console._isPatched) return;

['log', 'info', 'warn', 'error', 'dir', 'assert'].forEach(function(method) {
  var baseConsoleMethod = console[method];
  var slice = Array.prototype.slice;

  console[method] = function() {
    var date = (new Date()).toISOString();
    var args = slice.call(arguments);
    var output = method === 'warn' || method === 'error' ? 'stderr' : 'stdout';

    process[output].write('[' + date + '] ' + method.toUpperCase() + ' ');

    return baseConsoleMethod.apply(console, args);
  }
});

console._isPatched = true;