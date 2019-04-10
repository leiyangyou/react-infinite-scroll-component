// https://remysharp.com/2010/07/21/throttling-function-calls
export default function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  const throttled = function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      throttled.cancel()
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
  
  throttled.cancel = function () {
    if (deferTimer) {
      clearTimeout(deferTimer)
      deferTimer = null
    }
  }
  
  return throttled
}
