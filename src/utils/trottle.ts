export function throttle(fn: any, ms: number): ()=>void {
  let isThrottle: boolean = false;
  let saveThis: any;
  let saveArgs: any;
  let _this: any;
  
  return function wrapper() {
    if (isThrottle) {
      saveArgs = arguments;
      //@ts-ignore
      saveThis = this;
      return;
    }

    fn.apply(arguments);
    isThrottle = true;

    setTimeout(function () {
      isThrottle = false;
      if (saveThis) {
        wrapper.apply(saveThis, saveArgs);
        saveThis = null;
      }
    }, ms);
  };
}
