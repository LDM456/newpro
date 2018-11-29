import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '../components/users/users.vue'
import userRole from '../components/role/userRole.vue'
import roleList from '../components/role/roleList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'login'}},
    {name: 'login', path: '/login', component: Login},
    {name: 'home',
      path: '/home',
      component: Home,
      children: [
        {name: 'users', path: '/users', component: Users},
        {name: 'userRole', path: '/userRole', component: userRole},
        {name: 'roleList', path: '/roleList', component: roleList}
      ]}

  ]
})
