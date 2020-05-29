<template>
  <!-- Object.keys(goods).length是判断对象里面是否有对象 -->
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    },
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px 20px 8px;
  color: #999;
  border-bottom: 10px solid #f2f5f8;
}
.info-title {
  color: black;
  font-size: 18px;
}
.info-price {
  margin: 10px 0;
}
.n-price {
  color: var(--color-tint);
  font-size: 20px;
}
.o-price {
  text-decoration: line-through;
  margin: 0 10px;
}
.discount {
  position: absolute;
  background: var(--color-tint);
  color: white;
  padding: 4px;
  font-size: 12px;
  border-radius: 10px;
  margin-top: -4px;
}
.info-other {
  margin: 20px 0 10px 0;
  display: flex;
  justify-content: space-between;
}
.info-service {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.info-service-item img {
  height: 17px;
  vertical-align: middle;
}
</style>
