// 防抖函数
export const debounce = (fn, wait) => {
  wait = wait || 500
  let timer
  return function () {
    const that = this // 注意 this 指向
    const args = arguments // arguments中存着e

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait)
  }
}
