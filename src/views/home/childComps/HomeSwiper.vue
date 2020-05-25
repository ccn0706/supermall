<template>
  <div>
    <swiper>
      <swiper-item v-for='(item,index) in banners' :key='index'>
        <a :href="item.link">
          <img :src="item.image" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";

// 这是因为swiper的index.js
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwipers",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>
