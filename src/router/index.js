import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '../components/users/users.vue'
import roles from '../components/role/userRole.vue'
import rights from '../components/role/roleList.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: {name: 'login'}},
    {name: 'login', path: '/login', component: Login},
    {name: 'home',
      path: '/home',
      component: Home,
      children: [
        {name: 'users', path: '/users', component: Users},
        {name: 'roles', path: '/roles', component: roles},
        {name: 'rights', path: '/rights', component: rights}
      ]}

  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.error('请先登录')
      router.push({name: 'login'})

      return
    }
    next()
  }
})
export default router

// 在路由配置生效之前 判断token
// 路由守卫 / 导航
