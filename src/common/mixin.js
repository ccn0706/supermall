// 防抖封装
import {
  debounce
} from "common/utils";
export const itemListenerMixin = {
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImgLoad", this.itemImgListener);
    console.log('我是混入中的代码');
  }
}
import BackTop from "components/common/backtop/BackTop";
export const backtopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backclick() {
      // console.log(this.$refs.scroll.message)
      // 调用scroll组件中的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    showBackTop(position) {
      // 这个方法放在scrollContent(position)方法里面
      //判断backTop是否显示。当滚动条大于1000时显示
      this.isShowBackTop = -position.y > 1000;
    }
  }
}
