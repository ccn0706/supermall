export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.carList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct
      if (oldProduct) {  //数量加1
        // oldProduct.count += 1;
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量加1');
      } else {  //添加新商品
        payload.count = 1;
        // context.state.carList.push(payload);
        context.commit('addToCArt', payload);
        resolve('添加新商品')
      }
    })
  }
}
