<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      class="tab-controls"
      @tabClick="tabclick"
      ref="tabControl1"
      v-show="isTapFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control :titles="titles" class="tab-control" @tabClick="tabclick" ref="tabControl2" />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop" />
  </div>
</template>
<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";
// 公共部分
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/common/backtop/BackTop";

// 数据获取
// import { getHomeMultidata } from "network/home";
// import { getHomeGoods } from "network/home";
// 从一个地方导入过多可以简写
import { getHomeMultidata, getHomeGoods } from "network/home";
// 防抖封装
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["推荐", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      offsetTop: 0,
      isTapFixed: false,
      // 记录离开时scroll的y值
      saveY:0
    };
  },
  // 组件创建完发送请求
  created() {
    // 请求多个数据
    this.getMultidata();
    this.getgoods("pop");
    this.getgoods("new");
    this.getgoods("sell");
  },
  mounted() {
    // // 组件创建完成后，就得监听item中图片加完成
    // this.$bus.$on("itemImgLoad", () => {
    //   // 这里只要图片一加载完就执行一次，非常的频繁
    //   this.$refs.scroll.refresh();
    // });

    //使用防抖动写法
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
    // 获取tabControl的offsetTop，
    // 注意：组件是拿不到offsetTop的，需要拿到组件内元素的offsetTop。所有的组件都有一个属性$el:用于获取组件中的元素。
    // this.offsetTop=this.$refs.tabControl.$el.offsetTop;
    // 这时打印出来的只有58，明显不正确。原因是在mounted，有的图片并未加载完
    // console.log(this.offsetTop)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 事件监听相关的方法
    tabclick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 这是为了能够让两个tab-contrl能够选中的统一。
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听滚动
    contentScroll(position) {
      //1.判断backTop是否显示。当滚动条大于1000时显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶
      this.isTapFixed = -position.y > this.offsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getgoods(this.currentType);
    },
    backclick() {
      // console.log(this.$refs.scroll.message)
      // 调用scroll组件中的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 轮播滚动加载完成监听
    swiperImgLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.offsetTop);
    },
    // 网络请求相关方法
    getMultidata() {
      // getHomeMultidata()这是一个函数
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getgoods(type) {
      // 获取类型的页数并加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // es6的循环添加
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // finishPullUp()标识一次上拉加载动作结束。
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  // 组件销毁
  destroyed() {
    console.log("destroyed");
  },
  // 在better-scroll版本2没有这个问题，不需要记录。
  // // 组件进来
  // activated() {
  //   // console.log("组件进来");
  //   this.$refs.scroll.scrollTo(0,this.saveY,0);
  //   // 最好在重新刷一次
  //   this.$refs.scroll.refresh();
  // },
  // // 组件离开
  // deactivated() {
  //   // console.log("组件离开");
  //   this.saveY=this.$refs.scroll.getScrollY();
  // }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: white;
  /* 在使用浏览器原生滚动时，为了让导航不跟谁一起滚动使用 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 8; */
}
.tab-control {
  /* 当top高于44px为sticky,低于44px为fixed。IE兼容性 */
  /* position: sticky;
  top: 44px;
  z-index: 9999; */
}
.tab-controls {
  position: relative;
  z-index: 9;
}
.fiexed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
