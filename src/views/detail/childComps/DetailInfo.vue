<template>
  <div v-if="Object.keys(infos).length!==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="desc">{{infos.desc}}</div>
    </div>
    <div class="info-key">{{infos.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item,index) in infos.detailImage[0].list"
        :key="index"
        :src="item"
        alt
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  props: {
    infos: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就可以
      // 图片加载完一次计数器加1
      this.counter += 1;
      if (this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
      // 简写  ++this.counter 这里是先加再进行对比
      //   if (this.counter === this.imagesLength) {
      //     this.$emit("imageLoad");
      //   }
    }
  },
  watch: {
    //   为什么不直接在data里直接写imagesLength:this.infos.detailImage[0].list.length?
    // 这是因为，组件默认传过来的值是空的，获取不到，只能使用监听的方法。
    infos() {
      this.imagesLength = this.infos.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 10px 0;
}
.desc {
  padding: 10px 5px;
  color: #727272;
  font-size: 17px;
}
.info-key {
  padding: 10px 5px;
}
.info-list img {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
