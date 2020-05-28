<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :swipers="topImg"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import { getDetail,Goods } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImg: [],
      goods:null
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 获取顶部轮播
      console.log(res);
      const data=res.result;
      this.topImg = data.itemInfo.topImages;
      // 获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  }
};
</script>

<style scoped>
</style>
