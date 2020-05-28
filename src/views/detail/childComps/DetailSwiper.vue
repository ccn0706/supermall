<template>
  <swiper class="swipers1">
    <swiper-item v-for="(item,index) in swipers" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    swipers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.swipers1 {
  height: 300px;
  overflow: hidden;
}
</style>
