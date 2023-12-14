type DebounceFunction = (...args: any[]) => void;

const debounce = <T extends DebounceFunction>(func: T, wait: number): T => {
  let timeout: any;

  return function (this: any, ...args: any[]) {
    const context = this;

    const later = function () {
      timeout = undefined!;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
};

export default debounce;