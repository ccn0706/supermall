<template>
  <div class="recommeds">
      <div v-for="(item,index) in recommends" :key="index" class="recommeds-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {}
};
</script>
    
<style scoped>
.recommeds{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
}
.recommeds-item{
    /* 均等分 */
    flex: 1;
}
.recommeds-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>
