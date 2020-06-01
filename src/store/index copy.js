import Vue from 'vue'
import Vuex from 'vuex'
// 1.安装插件
Vue.use(Vuex)
// 2.创建store对象
const store = new Vuex.Store({
  state: {
    carList: []
  },
  mutations: {
    //  mutations唯一的目的是修改state的状态
    //  mutations的设计原则是:里面的每个方法尽可能完成的事比较单一一点，一个方法做了两件事，不方便监听这次是做哪件事。也就是说一个方法里面就做一件事。像这里就做了两件事。因此这里需要借助actions
    addCart(state, payload) {
      // 1.查找之前数组中是否有该商品
      let oldProduct = null;
      for (let item of state.carList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // 2.判断oldProduct
      if (oldProduct) {
        // 事情1
        oldProduct.count += 1;
      } else {
        // 事情2
        payload.count = 1;
        state.carList.push(payload)
      }
    }
  }
})
// 挂载到vue实例上
export default store
