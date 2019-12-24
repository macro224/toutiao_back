// 文章---接口
import axios from '@/utils/myaxios.js'

// 获取文章列表
export const getXinwen = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const postFabu = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
