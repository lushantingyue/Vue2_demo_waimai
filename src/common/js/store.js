// 传入三个参数, seller的id,要存储的key和value
export function saveToLocal (id, key, value) {
  let seller = localStorage._seller_ // 使用__只是一种标记写法,标记是自定义的某种编码规范,这里代表这只是seller的数据
  if (!seller) { // 第一次生成seller的时候初始化
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller) // json字符串解析成 json对象
    if (!seller[id]) { // 对未存储过的id对应的seller, 需要初始化
      seller[id] = {}
    }
  }
  seller[id][key] = value // 保存当前id 的seller对象 key值
  console.log(JSON.stringify(seller))
  // localStorage只能存储字符串,需要把对象转成json字符串
  localStorage._seller_ = JSON.stringify(seller)
}

export function loadFromLocal (id, key, def) {
  let seller = localStorage._seller_
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
