<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelctAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计{{totalPrice}}</div>
    <div class="calculate" @click="toCount()">去计算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelctAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },
     // 去结算
    toCount(){
      if(!this.isSelctAll){
        this.$toast.show('请选择购买的商品')
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.carList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.carList.filter(item => {
        return item.checked;
      }).length;
    },
    // 判断是否全部选中
    isSelctAll() {
      // 这里使用了mapGetters辅助函数，所以不用使用this.cartList，直接使用this.carList即可
      // 方法1：对数组没有选中的进行过滤，要是有没选中的就进行对长度取反，对数字取反就为false
      //   if (this.cartList.length) {
      //     return !this.cartList.filter(item => !item.checked).length;
      //   } else {
      //     return false;
      //   }

      // 方法2：使用find函数,要是有找到没选中的情况下就进行取反为false
      //   if (this.cartList.length) {
      //     return !this.cartList.find(item => !item.checked);
      //   } else {
      //     return false;
      //   }

      // 方法3.使用普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        } else {
          return true;
        }
      }
    },
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  width: 100%;
  background: #eee;
  line-height: 40px;
}
.check-content {
  width: 100px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}
.price {
  margin-left: 20px;
  text-align: center;
  flex: 1;
}
.calculate {
  width: 100px;
  background: red;
  text-align: center;
  color: #fff;
}
</style>
