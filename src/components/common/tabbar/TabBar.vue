<template>
    <div id="tabbar">
      <!-- 插槽,用来放小的TabBarIitem -->
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tabbar {
  display: flex;
  background: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.2);
  z-index: 99;
}

</style>
