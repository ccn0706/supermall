<template>
  <div v-if="Object.keys(shop).length!==0" class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter: function(value) {
      if (value < 10000) {
        return value;
      } else {
        return (value / 10000).toFixed(1) + "万";
      }
      // 简写
      // if(value<10000)  return value;
      // return (value/10000).toFixed(1)+'万';
    }
  }
};
</script>

<style scoped>
.shop-info {
  padding: 10px;
  /* color: #999; */
  border-bottom: 10px solid #f2f5f8;
}
.shop-top {
  margin: 20px 0;
}
.shop-top img {
  height: 50px;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 10px;
}
.title {
  font-size: 18px;
}
.shop-middle {
  display: flex;
  justify-content: space-between;
}
.shop-middle-left {
  text-align: center;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  border-right: 1px solid #e5e5e5;
}
table td{
  padding: 2px 0;
}
.score {
  width: 80px;
  text-align: center;
  color: #5ea732;
}
.score-better {
  color: #f13e3a;
}
.better span{
  color: white;
  background: #5ea732;
}
.better-more span{
  color: white;
  background: #f13e3a;
}
.enter-shop{
  padding: 10px 20px;
    background: #e5e5e5;
    width: 50%;
    border-radius: 10px;
    text-align: center;
    color: white;
    margin: 20px auto;
}
.info-sells{
  margin-top: 14px;
}
.sells-count{
  margin-bottom: 10px;
}
.info-goods{
  margin-top: 14px;
}
.goods-count{
  margin-bottom: 10px;
}
</style>
