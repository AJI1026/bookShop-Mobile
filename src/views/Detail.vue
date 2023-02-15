<template>
  <div class="detail">
    <swiper :options="swiperOption" class="pictures">
        <swiper-slide v-for="(img, index) in swiperList" :key="swiperList[index].id">
          <img :src="img.imgUrl" alt=""/>
        </swiper-slide>
      </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="goods-name">
      <h3>可编程网络自动化</h3>
      <div>Python自动化运维技术详解，下一代网络工程师应掌握的技能</div>
    </div>
    <div class="goods-price">
      <div class="price-off">
        <i class="iconfont icon-x_jiage"></i>
        <b style="font-size: 20px">44</b>
      </div>
      <div class="price">
        <i class="iconfont icon-x_jiage"></i>
        <b>64</b>
      </div>
    </div>
    <footer>
      <div>加入购物车</div>
      <div style="background-color: red">立即购买</div>
    </footer>
  </div>
</template>

<script>
// 引入swiper插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

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
      },
      swiperList: [
        {
          imgUrl: './images/ex0.jpg',
        },
        {
          imgUrl: './images/ex1.jpg',
        },
      ]
    }
  },
  components: {
    swiper,
    swiperSlide
  },
}
</script>

<style scoped lang="scss">
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

</style>
