import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  carList: []
};
// 1.安装插件
Vue.use(Vuex)
// 2.创建store对象
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters:getters
})
// 挂载到vue实例上
export default store
