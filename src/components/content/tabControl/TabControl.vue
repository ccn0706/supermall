<template>
  <div class="tab-contral">
    <!-- 当只有文字不一样时，没必要使用插槽 -->
    <div v-for="(item,index) in titles" :key="index"
      class="tab-contral-item"
      :class="{active:index === currentIndex}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemclick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index);
    }
  },
  components: {}
};
</script>

<style scoped>
.tab-contral {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background: white;
}
.tab-contral-item {
  flex: 1;
}
.tab-contral-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>
