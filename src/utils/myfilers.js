
// 格式化日期的过滤器
export const dataFormat = (data, spe) => {
  data = new Date(data)
  spe = spe || '/'
  return data.getFullYear() + spe + (data.getMonth() + 1) + spe + data.getDate() + ' ' + ' ' + data.getHours() + ':' + data.getSeconds() + ':' + data.getMinutes()
}
