export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    console.log('1.......... ' + fmt)
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      console.log('$date: ' + str)
      console.log('2.......... ' + fmt)
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      console.log('3.......... ' + fmt)
    }
  }
  return fmt

  // 先加两个0,然后再根据长度截取(因为最长也就2个0的长度)
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
}
