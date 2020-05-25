<template>
<!-- ref:明确拿到子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
    //   probeType: 3,
    //   pullUpLoad: true
    });
    // this.scroll.on("scroll", position => {
    //   // console.log(position);
    // });
    // // 上拉加载更多（翻页）
    // this.scroll.on("pullingUp", async () => {
    //   console.log("上拉加载更多");
    // });
  },
  components: {}
};
</script>

<style scoped>
</style>
