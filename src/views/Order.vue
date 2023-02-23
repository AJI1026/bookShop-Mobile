<template>
  <div class="order container">
    <!--头部-->
    <Header>
      <span style="font-size: 14px">提交订单</span>
    </Header>
    <!--内容-->
    <section>
      <!--地址信息-->
      <div class="path">
        <h3 class="path-title">收货信息：</h3>
        <div class="path-content" @click="goPath">
          <div>
            <span>{{path.name}}</span>
            <span>{{ path.tel }}</span>
          </div>
          <div>
            <span>{{ path.province }}</span>
            <span>{{ path.city }}</span>
            <span>{{ path.county }}</span>
            <span>{{ path.addressDetail }}</span>
          </div>
        </div>
      </div>
      <!--支付-->
      <div class="payment">
        <div class="payment-method">
          <span>支付方式：</span>
          <span>选择在线支付，随机减0-100元</span>
        </div>
        <van-radio-group v-model="radioPayment">
          <van-radio name="wechat">微信支付</van-radio>
          <van-radio name="alipay">支付宝</van-radio>
          <van-radio name="visa">VISA</van-radio>
          <van-radio name="credit">银联银行卡</van-radio>
        </van-radio-group>
      </div>
      <!--商品信息-->
      <div class="goods">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <div>
              <img :src="item.goods_imgUrl" alt="">
            </div>
            <div class="goods-info">
              <h4 style="font-size: 12px" class="goods-title">{{item.goods_name}}</h4>
              <div class="goods-type">规格：无</div>
              <div class="goods-price">
                <span>¥{{ item.goods_price }}</span>
                <span>x{{item.goods_num}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!--底部-->
    <footer>
      <div class="order-total">
        <span>共</span>
        <b>{{total.num}}</b>
        <span>件，</span>
        <span>总金额：</span>
        <em>¥{{total.price | priceFilter}}</em>
      </div>
      <div class="toPay" @click="subPay">
        提交订单
      </div>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/path/Header";
import {mapGetters, mapMutations, mapState} from "vuex";
import http from '@/common/api/request';
import {Toast} from "vant";
import bus from '@/common/bus';
import qs from 'qs';

export default {
  name: "Order-container",
  filters: {
    priceFilter(val) {
      return parseFloat(val).toFixed(2);
    }
  },
  components: {
    Header
  },
  data() {
    return {
      radioPayment: 'wechat',
      path: {},
      item: [],
      total: {
        num: 0,
        price: 0,
      }
    }
  },
  activated() {
    bus.$on('selectPath', function (data) {
      this.path = JSON.parse(data);
    }.bind(this));
    // 选中的商品id号
    this.item = JSON.parse(this.$route.query.detail);
    this.goodsList = JSON.parse(this.$route.query.goodsList);
    this.selectOrder();
  },
  created() {
    this.goodsList = JSON.parse(this.$route.query.goodsList);
    this.getAddress();
  },
  computed: {
    ...mapState({
      order_id: state => state.order.order_id,
      selectList: state => state.cart.selectList
    }),
    ...mapGetters(['defaultPath']),
  },
  methods: {
    ...mapMutations(['INIT_DATA','INIT_ORDER']),
    // 查询地址
    getAddress() {
      // 查询到地址
      http.$axios({
        url: '/api/getAddress',
        method: 'POST',
        headers: {
          token: true
        }
      }).then(res => {
        this.INIT_DATA(res.data);
        // 有默认收货地址
        if(this.defaultPath.length) {
          this.path = this.defaultPath[0];
        } else {
          this.path = res.data[0];
        }
      })
    },
    // 查询订单
    selectOrder() {
      // 查询订单
      http.$axios({
        url: '/api/getOrder',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          order_id: this.order_id
        }
      }).then(res => {
        this.INIT_ORDER(res.data);
        this.total = {
          price: res.data[0].goods_price,
          num: res.data[0].goods_num,
        }
      })
    },
    // 提交订单
    subPay() {
      // 判断是否有地址
      if(!this.path) return Toast("请填写收货地址");
      // 发送请求 1.修改订单状态 2.删除购物车的数据
      if(this.radioPayment === 'alipay') {
        http.$axios({
          url: '/api/submitOrder',
          method: 'POST',
          headers: {
            token: true,
          },
          data: {
            order_id: this.order_id,
            shopArr: this.selectList
          }
        }).then(res => {

          let newArr = [];
          this.goodsList.forEach(v => {
            newArr.push(v);
          })

          // 支付传递的参数
          let dataOrder = {
            order_id: this.order_id,
            name: newArr.join(''),
            price: this.total.price,
          }
          if(res.success) {
            // 去支付
            http.$axios({
              url: '/api/payment',
              method: 'POST',
              headers: {
                token: true,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              // qs增加安全性的序列化插件
              data: qs.stringify(dataOrder)
            }).then(res => {
              if(res.success) {
                // 返回打开支付宝的页面url
                Toast("正在跳转到支付宝页面");
                window.location.href = res.paymentUrl;
              }
            })
          }
        })
      } else {
        Toast('当前只支持支付宝支付');
      }
    },
    // 选择收货地址
    goPath() {
      this.$router.push({
        path: '/path',
        query: {
          type: 'select'
        }
      });
    }
  },
}
</script>

<style scoped lang="scss">
section {
  background-color: #F7F7F7;
  color: #3a3a3a;
  .path-title {
    padding: 20px 0 6px 20px;
  }
  .path-content {
    box-sizing: border-box;
    padding: 20px;
    font-size: 1em;
    background-color: #fff;
    span {
      padding-right: 15px;
    }
    div:nth-child(2) {
      color: #ccc;
    }
    div {
      padding: 6px 0;
    }
  }
  .payment {
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    .van-radio-group {
      margin-top: 20px;
      display: flex;
      .van-radio {
        margin-right: 20px;
      }
    }
  }
  .payment-method {
    span:nth-child(2) {
      color: sandybrown;
    }
  }
  .goods {
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    font-size: 1.1em;
    background-color: #fff;
    ul {
      li {
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        padding-bottom: 40px;
        img {
          width: 200px;
          height: 200px;
        }
        .goods-info {
          flex: 1;
          box-sizing: border-box;
          padding: 0 20px;
          .goods-title {
            font-size: 1.2em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .goods-type {
            color: #999999;
            margin-top: 90px;
          }
          .goods-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span:nth-child(1) {
              color: sandybrown;
            }
            span:nth-child(2) {
              color: #999999;
            }
          }
        }
      }
    }
  }
}
footer {
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  justify-content: space-between;
  .order-total {
    padding-left: 30px;
    font-size: 1.1em;
    span {
      padding: 0 6px;
    }
    b, em {
      color: sandybrown;
    }
    em {
      font-size: 1.2em;
    }
  }
  .toPay {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: sandybrown;
    color: white;
    height: 100%;
    width: 200px;
    font-size: 1.2em;
  }
}
</style>
