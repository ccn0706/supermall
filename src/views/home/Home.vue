<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control :titles="titles" class="tab-control" @tabClick="tabclick" />
      <good-list :goods="showGoods" />
    </scroll>
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

// 数据获取
// import { getHomeMultidata } from "network/home";
// import { getHomeGoods } from "network/home";
// 从一个地方导入过多可以简写
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodList,
    Scroll
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
      currentType: "pop"
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
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 事件监听方法
    tabclick(index) {
      console.log(index);
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
    },
    // 网络请求相关方法
    getMultidata() {
      // getHomeMultidata()这是一个函数
      getHomeMultidata().then(res => {
        console.log(res);
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
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 8;
}
.tab-control {
  /* 当top高于44px为sticky,低于44px为fixed。IE兼容性 */
  position: sticky;
  top: 44px;
  z-index: 9999;
}
.content{
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
