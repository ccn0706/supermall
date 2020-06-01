<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      num: 0
    };
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }

    // mapGetters两种语法
    // 1
    // ...mapGetters(['cartLength','cartList']),
    // 2.自定义名字
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
  position: relative;
}
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: 550;
}
</style>
