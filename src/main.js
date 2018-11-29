// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import axios from '@/plugins/plugin.js'
import moment from 'moment'
import myBread from './components/customComponents/bread.vue'
// Vue.config.productionTip = false

// 使用vue插件
Vue.use(ElementUI)
Vue.use(axios)

// 使用自定义组件
Vue.component('my-bread', myBread)
// 使用全局过滤器
Vue.filter('fmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
