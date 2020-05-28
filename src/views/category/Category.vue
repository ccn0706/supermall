<template>
  <div>
    <h1>分类</h1>
    <div class="wrapper">
      <ul class="content">
        <li><button @click="btnclick">按钮</button></li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
        <li>11</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from '@better-scroll/pull-up';
BScroll.use(Pullup)
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  // 组件挂载完之后
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });
    this.scroll.on("scroll", position => {
      // console.log(position);
    });
    // 上拉加载更多（翻页）
    this.scroll.on("pullingUp", async () => {
     console.log('上拉加载更多')
    });
  },
  methods:{
    btnclick(){
      alert(1)
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100px;
  width: 100%;
  background: red;
  overflow: hidden;
}
</style>
