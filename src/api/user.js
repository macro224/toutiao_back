// 用户---接口
import axios from '@/utils/myaxios.js'

export const postUser = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
