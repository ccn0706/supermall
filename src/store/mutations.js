// import {
//   ADD_COUNTER,
//   ADD_TO_CART
// } from './mutations_types'
export default {
  //  mutations唯一的目的是修改state的状态
  addCounter(state, payload) {
    payload.count += 1;
  },
  addToCArt(state, payload) {
    // 新加的默认选中
    payload.checked =true;
    state.carList.push(payload);
  }
}
