import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // JS组件
import 'element-ui/lib/theme-chalk/index.css'; // CSS样式
//base.css
import './assets/css/base.css'
/* //引入request.js
import request from './untils/request'
//挂载原型上
Vue.prototype.request=request; */
// 引入 local 文件
import local from '@/utils/local'
// 引入request.js
import request from './utils/request'
//引入echart 且 挂载在原型上
import echarts from 'echarts'
Vue.prototype.echarts = echarts;
// 挂载原型上
Vue.prototype.request = request;
Vue.use(ElementUI);//注册

// 阻止生产提示
Vue.config.productionTip = false
// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只要调用 才能进入下一步
  // 获取浏览器中的token
  const token = local.get('rrrrr--r666');
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    // 如果要去登录 放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
