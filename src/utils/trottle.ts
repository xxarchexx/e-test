export function throttle(fn: any, ms: number): ()=>void {
  let isThrottle: boolean = false;
  let context: any;
  let args: any;
  let _this: any;
  
  return function wrapper() {
    if (isThrottle) {
      args = arguments;
      //@ts-ignore
      context = this;
      return;
    }

    fn.apply(arguments);
    isThrottle = true;

    setTimeout(function () {
      isThrottle = false;
      if (args) {
        wrapper.apply(context, args);
      }
    }, ms);
  };
}
