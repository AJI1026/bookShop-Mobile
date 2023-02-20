<template>
  <div id="cart-container container">
    <header>
      <i class="iconfont icon-back" style="font-size: 20px" @click="goBack"></i>
      <span style="font-size: 14px">购物车</span>
      <span style="font-size: 14px" @click="edit" v-text="isEditStatus? '完成': '编辑'"></span>
    </header>
    <section v-if="list.length !== 0">
      <div class="cart-title">
        <van-checkbox @click="checkAllFn" :value="isCheckedAll"></van-checkbox>
        <span style="font-size: 14px">商品</span>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="cart-check">
            <van-checkbox @click="CHECK_EACH(index)" v-model="item.checked"></van-checkbox>
          </div>
          <h2><img :src="item.goods_imgUrl" alt=""></h2>

          <div class="goods">
            <div class="goods-title">
              <span>{{item.goods_name}}</span>
              <i class="iconfont icon-shanchu" style="font-size: 18px" @click="delGoodsFn(item.id)"></i>
            </div>
            <div class="goods-price">¥{{item.goods_price | priceFilter}}</div>
            <van-stepper v-model="quantity" integer></van-stepper>
          </div>
        </li>
      </ul>
    </section>
    <section v-else>
      <div class="empty">
        <img src="../assets/images/emptyInfo.png" alt="">
        <div>暂无数据，请前往首页选购您的技能书哦～</div>
        <button>
          <router-link to='/home'>去首页逛逛吧</router-link>
        </button>
      </div>
    </section>
    <footer>
      <div class="radio">
        <van-checkbox @click="checkAllFn" :value="isCheckedAll"></van-checkbox>
      </div>
      <div class="total" v-show="!isEditStatus">
        <div>
          共有
          <span class="total-goods">{{total.num}}</span>
          件商品
        </div>
        <div>
          <span>总计：</span>
          <span>
            <i class="iconfont icon-x_jiage"></i>
            <span class="total-price">{{total.price | priceFilter}} + 0大树币</span>
          </span>
        </div>
      </div>
      <div class="check" style="font-size: 16px" v-if="isEditStatus" @click="delGoodsFn">删除</div>
      <div class="check" style="font-size: 16px" v-else>去结算</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request';
import {mapMutations, mapState, mapActions, mapGetters} from "vuex";

export default {
  name: 'cart-container',
  data() {
    return  {
      isEditStatus: false, // 编辑状态
      choose: true, // 全选数据
      quantity: 1, // 商品数量
    }
  },
  filters: {
    priceFilter(value) {
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  },
  computed: {
    ...mapState({
      list: state => state.cart.list
    }),
    ...mapGetters(['isCheckedAll','total'])
  },
  methods: {
    ...mapMutations(['CART_LIST', 'CHECK_EACH']),
    ...mapActions(['checkAllFn', 'delGoodsFn']),
    // 返回
    goBack() {
      this.$router.back();
    },
    // 获取数据
    async getData() {
      let res = await http.$axios({
        url: '/api/cartList',
        method: 'POST',
        // 知道是哪个用户在传数据
        headers: {
          token: true
        }
      })
      res.data.result.forEach(v => {
        v['checked'] = true;
      })
      this.CART_LIST(res.data.result);
    },
    // 点击编辑
    edit() {
      this.isEditStatus = !this.isEditStatus;
    },
  },
  created() {
    this.getData();
  },
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: sandybrown;
  height: 80px;
  color: white;
  padding: 0 40px;
}
section {
  background-color: #f5f5f5;
  .cart-title {
    display: flex;
    align-items: center;
    padding: 20px;
    span {
      padding: 0 15px;
      font-weight: 500;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 20px;
      background-color: #fff;
      .cart-check {
        padding: 0 20px;
      }
      img {
        width: 160px;
        height: 180px;
        box-sizing: border-box;
        padding: 20px;
      }
      .goods {
        display: flex;
        width: 100%;
        padding-left: 20px;
        justify-content: space-between;
        flex-direction: column;
        .goods-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          i {
            color: sandybrown;
          }
        }
        .goods-price {
          padding: 3px;
          color: sandybrown;
        }
        .van-stepper {
          text-align: right;
        }
      }
    }
  }
  .empty {
    height: calc(100vh - 80px);
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    img {
      width: 400px;
      height: 400px;
    }
    div {
      padding-bottom: 20px;
    }
    button {
      background-color: sandybrown;
      border: none;
      height: 60px;
      padding: 0 15px;
      border-radius: 12px;
      a {
        color: white;
      }
    }
  }
}
footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  .radio {
    padding: 0 20px;
  }
  .total {
    flex: 1;
    font-size: 12px;
    .total-goods, .total-price {
      color: sandybrown;
    }
  }
  .check {
    width: 150px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
    background-color: sandybrown;
  }
}
</style>
