<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data() {
    return {};
  },
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #ccc;
}
.checked {
  /* 选中的时候把外圈变红 */
  background: red;
  border: 2px solid red;
}
</style>
