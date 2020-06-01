<template>
  <div id="detail">
    <detail-nav-bar id="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="scrollContent" :probe-type="3">
      <detail-swiper :swipers="topImg" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info :infos="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backclick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodList";
import {mapActions} from "vuex";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backtopMixin } from "common/mixin";
// 回到顶部的代码使用混入backtopMixin
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backtopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // （1）获取顶部轮播
      // console.log(res);
      const data = res.result;
      this.topImg = data.itemInfo.topImages;
      // （2）获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // （3）获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // （4）获取商品的详细信息
      this.detailInfo = data.detailInfo;
      // （5）获取商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // （6）获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    // 根据最新的数据，对应的Dom是已经被渲染出来，但是图片依然是没有加载完，也就是说拿到的offsetTop是没有包含图片。总结offsetTop值不对时主要是图片问题
    // this.$nextTick(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // });

    // 给getThemeTopY赋值并进行防抖操作
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // 在最后添加一个最大的值
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    //使用防抖动写法
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("detailItemImgLoad", () => {
      refresh();
    });
  },
  updated() {
    // 更新一次就执行一次
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    scrollContent(position) {
      const positionY = -position.y;
      // 方法1 分两种情况
      //[0, 3113, 3575, 3741]
      // positionY在0和3113之间，index=0；
      // positionY在=3113和3575之间，index=1；
      // positionY在=3575和3741之间，index=2；

      // positionY在>=3575时，index=3；
      // let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   // this.currentIndex !== i&& 这个的作用是避免一直赋值
      //   // 对于[i + 1]这边会涉及到越界，导致最后一个值不能取到。所以这边要分两种情况。之间分一种，最后一个分一种，最后在或运算
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     console.log(i);
      //     this.$refs.nav.currentIndex = i;
      //   }
      // }

      // 方法2分一种情况，在数组最后加一个最大值
      //[0, 3113, 3575, 3741]
      // positionY在0和3113之间，index=0；
      // positionY在=3113和3575之间，index=1；
      // positionY在=3575和3741之间，index=2；
      // positionY在=3741和最大值之间，index=3；
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(i);
          this.$refs.nav.currentIndex = i;
        }
      }
      //判断backTop是否显示。当滚动条大于1000时显示，这里的方法在混入里
      this.showBackTop(position);
    },
    addToCart() {
      // console.log(111);
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品加入购物车
      // 3.添加到购物车成功，那我们怎么知道已经加入成功了呢？
      // 方法1.使用dispatch会返回一个promise，方法2：使用mapActions
      // this.$store.commit('addCart',product)

      // this.$store.dispatch('addCart', product).then(res=>{
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background: white;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
/* 因为.content加了overflow: hidden;所以不用detail-nav-bar z-index: 12;样式 */
/* #detail-nav-bar {
  position: relative;
  z-index: 12;
  background: white;
} */
</style>
