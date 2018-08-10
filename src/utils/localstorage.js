export function setItem (name, value) {
  if (value) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}
// localStorage取值
export function getItem (name) {
  return JSON.parse(localStorage.getItem(name))
}
// localStorage删除指定键对应的值
export function delItem (name) {
  localStorage.removeItem(name)
}
// 批量删除localStorage
export function ClearItems () {
  localStorage.clear()
}
