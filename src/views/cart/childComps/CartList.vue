<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    //这里因为做了缓存，如果没有购物车的话，better-scroll滚动高度scrollHeight是0，后面我们又加了购物车，有了新数据，但是better-scroll的scrollHeight高度没有更新。所以每当进入一次购物车就得刷新一次
    // console.log('进入');
    // 滚动高度刷新
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  /* 这里不是在父组件中，他的高度不是100% */
  height: calc(100% - 44px - 49px - 40px);
}
.aa {
  height: 800px;
  background: red;
}
.content {
  /* 这个是基于有父元素做的 */
  height: 100%;
  /* 没有这个的话会出现顶部的内容跟着滚动 */
  overflow: hidden;
}
</style>
