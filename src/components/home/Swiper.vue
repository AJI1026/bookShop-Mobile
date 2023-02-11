<template>
  <div class="swiper-container">
    <swiper :options="swiperOption" class="pictures">
      <swiper-slide v-for="(img, index) in swiperList" :key="swiperList[index].id">
        <img :src="img.imgUrl" alt=""/>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
// 引入swiper插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: 'swiper-container',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    swiperList:Array
  },
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
        }, // 显示分页
      },
    }
  },
}
</script>

<style scoped>
.swiper-container {
  height: 300px;
}
.swiper-container .pictures img {
  width: 100%;
  height: 300px;
}
.swiper-pagination {
  height: 80px;
  position: relative;
  top: -40px;
}
>>> .swiper-pagination .swiper-pagination-bullet-active {
  background-color: sandybrown;
}
</style>
