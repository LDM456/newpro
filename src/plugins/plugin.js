// 自定义一个插件模块
import axios from 'axios'
// 首先要定义一个对象
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // console.log('拦截器被触发')
    // config里的属性中，有url 就= 之前设置的baseURl
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }

    // 在发送请求之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  Vue.prototype.$axios = axios
}

export default MyHttpServer
