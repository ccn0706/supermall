// 防抖函数
export function debounce(func, delay) {
  //这里的timer是闭包，但是有被使用，不会被销毁
  let timer = null;
  // ...args是指括号内可以传多个值
  return function (...args) {
    // 判断的作用当过于频繁时，把timer定时器清0，这样就不会一直调用
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
