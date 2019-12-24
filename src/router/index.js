import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Welcome from '@/views/Welcome.vue'
import XinwenList from '@/views/XinwenList.vue'
import XinwenFabu from '@/views/XinwenFabu.vue'

import { Message } from 'element-ui'
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: Index,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'xinwenList',
          path: 'xinwenList',
          component: XinwenList
        },
        {
          name: 'xinwenFabu',
          path: 'xinwenFabu',
          component: XinwenFabu
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.path === '/') {
    next({ name: 'index' })
  } else {
    if (localStorage.getItem('toutiao_back')) {
      next()
    } else {
      Message.warning('请先登录！')
      next({ name: 'login' })
    }
  }
})
export default router
