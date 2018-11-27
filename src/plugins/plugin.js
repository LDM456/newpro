// 自定义一个插件模块
import axios from 'axios'
// 首先要定义一个对象
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$axios = axios
}

export default MyHttpServer
