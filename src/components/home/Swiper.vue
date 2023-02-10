<template>
  <div class="swiper-container">
    <swiper :options="swiperOption">
      <swiper-slide>1</swiper-slide>
      <swiper-slide>2</swiper-slide>
      <swiper-slide>3</swiper-slide>
      <swiper-slide>4</swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// 引入轮播图插件
import 'swiper/swiper-bundle.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'swiper-container',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        speed: 1000,
      }
    }
  },
}
</script>

<style scoped>
.swiper-container {

}
</style>
