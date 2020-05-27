<template>
<!-- ref:明确拿到子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null,
      message:'通过ref拿值'
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 滚到x=0,y=0的地方
    this.scroll.scrollTo(0,0)
    // 监听滚动值
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit('scroll',position);
    });
    // 上拉加载更多（翻页）
    this.scroll.on("pullingUp", async () => {
      this.$emit('pullingUp')
    });
    // console.log(this.scroll);
  },
  methods:{
    // (x,y,500)在500毫秒内回到顶部。time=500,为如果没输入time，就使用默认值500
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      // finishPullUp()标识一次上拉加载动作结束。
      this.scroll.finishPullUp();
    },
    refresh(){
      console.log('refresh')
       this.scroll && this.scroll.refresh();
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
