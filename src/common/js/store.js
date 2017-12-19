export function saveToLocal (id, key, value) {
  let seller = localStorage._seller_
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller) // 解析成 json对象
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  console.log(JSON.stringify(seller))
  localStorage._seller_ = JSON.stringify(seller)  // seller对象转json结构保存
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
