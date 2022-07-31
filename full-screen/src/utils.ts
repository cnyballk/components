/**
 * @param  {Function}   需要转成防抖动函数的函数
 * @param  {number}     延迟时间（毫秒数）
 * @param  {boolean}    是否执行第一次
 * @return {undefined}  无返回值
 */
export function debounce(fn: any, delay: number = 600, isFirst = true) {
  let timer: NodeJS.Timeout;
  return function (...rest: any[]) {
    clearTimeout(timer);
    if (isFirst) {
      fn.apply(fn, rest);
      isFirst = false;
      return;
    }
    timer = setTimeout(fn.bind(fn, ...rest), delay);
  };
}
