<template>
  <div class="detail">
    <!--头部-->
    <header>
      <div class="header-returns" v-show="isShow">
        <i class="iconfont icon-back" style="font-size: 18px" @click="goBack"></i>
        <i class="iconfont icon-kefu" style="font-size: 18px"></i>
      </div>
      <div
          class="header-bar"
          v-show="!isShow"
          :style="styleOption"
      >
        <i class="iconfont icon-back" style="font-size: 18px" @click="goBack"></i>
        <span>商品详情</span>
        <span>商品评价</span>
        <i class="iconfont icon-kefu" style="font-size: 18px"></i>
      </div>
    </header>
    <!--内容-->
    <section ref="wrapper" class="detail">
        <div>
          <swiper :options="swiperOption" class="pictures">
            <swiper-slide v-for="(img, index) in swiperList" :key="swiperList[index].id">
              <img :src="img.imgUrl" alt=""/>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="goods-name">
            <h3>{{ goods.name }}</h3>
            <div>应掌握的技能</div>
          </div>
          <div class="goods-price">
            <div class="price-off">
              <i class="iconfont icon-x_jiage"></i>
              <b style="font-size: 20px">{{goods.priceOff}}</b>
            </div>
            <div class="price">
              <i class="iconfont icon-x_jiage"></i>
              <b>{{goods.price}}</b>
            </div>
          </div>
          <div class="goods-introduction">
            <img :src="goods.imgUrl" alt="">
          </div>
        </div>
      </section>
    <!--尾部-->
    <footer>
      <div @click="addCart">加入购物车</div>
      <div style="background-color: red">立即购买</div>
    </footer>
  </div>
</template>

<script>
// 引入swiper插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
// 轮播样式
import "swiper/dist/css/swiper.css";
// 引入BetterScroll插件
import BetterScroll from "better-scroll";
// 解决BetterScroll划不动的bug
import {ObserveDom} from "better-scroll";
BetterScroll.use(ObserveDom)
import http from '@/common/api/request';
import {Toast} from "mint-ui";

export default {
  name: "Detail-container",
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }, // 播放控制
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
          type: 'fraction',
        }, // 显示分页
      }, // 轮播参数
      swiperList: [
        {
          imgUrl: './images/ex0.jpg',
        },
        {
          imgUrl: './images/ex1.jpg',
        },
      ], // 轮播数据
      isShow: true, // 控制头部显示
      BetterScroll: '',
      styleOption: {},
      goods: {}, // 商品对象
      id: '',
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  // keep-alive提升性能，内置组件
  activated() {
    if(this.$route.query.id !== this.id) {
      this.getData();
      this.id = this.$route.query.id
    }
  },
  methods: {
    // 返回页面
    goBack() {
      this.$router.back()
    },
    // 获取数据
    async getData() {
      let id = this.$route.query.id
      let res = await http.$axios({
        url: '/api/goods/id',
        params: {
          id: id
        }
      })
      this.goods = res
    },
    // 加入购物车
    addCart() {
      http.$axios({
        url: '/api/addCart',
        method: 'POST',
        data: {
          goodsId: this.$route.query.id
        },
        headers: {
          token: true,
        }
      }).then(res => {
        if(res.success) {
          Toast("添加购物车成功");
        }
      })
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getData()
  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      bounce: false,
      click: true,
      observeDOM: true,
    })
    // 控制头部渐进显示效果
    this.BetterScroll.on('scroll', (pos) => {
      let posY = Math.abs(pos.y)
      let opacity = posY / 160
      opacity = opacity > 1 ? 1 : opacity
      this.styleOption = {
        opacity: opacity
      }
      if(posY >= 50 ) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    })
  }
}
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  .header-returns {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      margin-top: 10px;
      padding: 10px;
      color: #fff;
      background-color: rgba(0,0,0,0.3);
      border-radius: 50%;
    }
  }
  .header-bar {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    background-color: #fff;
    i {
      padding: 0 20px;
    }
    span {
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 5px solid sandybrown;
    }
  }
}
.swiper-container {
  height: 650px;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-pagination {
  height: 40px;
  position: relative;
  text-align: right;
  top: -40px;
  width: 95%;
  color: white !important;
}
.goods-name {
  border-bottom: 1px solid #cccccc;
  padding: 0 20px;
  div {
    padding-top: 10px;
    padding-bottom: 30px;
    color: #999999;
  }
}
.goods-price {
  padding: 20px;
  i {
    margin-right: 10px;
  }
  .price-off {
    color: red;
  }
  .price {
    color: #999999;
    text-decoration: line-through;
  }
}
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.goods-introduction {
  width: 100%;
  margin-bottom: 200px;
  img {
    width: 100%;
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #cccccc;
  div {
    width: 50%;
    height: 100%;
    line-height: 80px;
    color: white;
    text-align: center;
    background-color: sandybrown;
  }
}
</style>
