// your JS code here. If required.
function throttle(callback, delay) {
  let lastCallTime = null;   
  let timeoutId = null;      
  let lastArgs = null;       
  let lastThis = null;       

  function throttled(...args) {
    const now = Date.now();

    lastArgs = args;
    lastThis = this;

    if (lastCallTime === null) {
      lastCallTime = now;
      callback.apply(lastThis, lastArgs);
      return;
    }

    const timeSinceLast = now - lastCallTime;

    if (timeoutId !== null) {
      return;
    }

    const remaining = delay - timeSinceLast;

    timeoutId = setTimeout(() => {
      timeoutId = null;
      lastCallTime = Date.now();
      callback.apply(lastThis, lastArgs);
    }, Math.max(0, remaining));
  }

  throttled.cancel = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = null;
    lastCallTime = null;
  };

  return throttled;
}

module.exports = throttle;
