// 文章---接口
import axios from '@/utils/myaxios.js'

export const getXinwen = (params) => {
  return axios({
    url: '/post',
    params
  })
}
