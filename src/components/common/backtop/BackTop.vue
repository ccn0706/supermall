<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  methods: {
    //   这里原本可以通过自定义方式，传到首页，然后首页再拿到better-scroll回到顶部的方法，但是可以通过组件点击的方法实现。
    // backclik() {
    //   console.log("回到顶部");
    // }
  },
  components: {}
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}
.back-top img {
  height: 43px;
  width: 43px;
}
</style>
