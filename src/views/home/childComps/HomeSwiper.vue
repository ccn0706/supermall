<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="swiperImgLoad" />
        </a>
      </swiper-item>
    </swiper>
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
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    swiperImgLoad() {
      // 只需发送一次
      if (!this.isLoad) {
         this.$emit("swiperImgLoad");
         this.isLoad=true;
      }
    }
  }
};
</script>

<style scoped>
</style>
