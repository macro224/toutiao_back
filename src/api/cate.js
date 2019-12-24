// 栏目列表---接口
import axios from '@/utils/myaxios.js'

export const getcateList = () => {
  return axios({
    url: '/category'
  })
}
