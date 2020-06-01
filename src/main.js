import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast/index'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
Vue.config.productionTip = false
// 添加$bus事件总线
Vue.prototype.$bus=new Vue();
// 安装toast插件
Vue.use(toast)
// 解决移动端的300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件lazyload
Vue.use(VueLazyload,{
  // 这个是未显示出来显示的占位图
  loading:require('assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
