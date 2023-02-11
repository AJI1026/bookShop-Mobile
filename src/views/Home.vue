<template>
  <div id="home-container">
    <!--头部-->
    <Header></Header>
    <!--用了ly-tab插件-->
    <ly-tabs v-model="value" activeColor="#F4A460FF">
      <ly-tab-item v-for="(item, index) in items" :name="item.name" :title="item.title" :key="index"/>
    </ly-tabs>
    <!--主题内容-->
    <section>
      <div style="height: 80px"></div>
      <Swiper></Swiper>
    </section>
    <!--图标-->
    <Icons></Icons>
    <!--推荐-->
    <Recommend></Recommend>
    <!--cookie类型推荐-->
    <Like></Like>
    <!--底部-->
    <div style="height: 45px;margin-top: 40px"></div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 页面组件
import Like from "@/components/home/Like";
import Recommend from "@/components/home/Recommend"
import Icons from "@/components/home/Icons";
import Swiper from "@/components/home/Swiper";
import Header from "@/components/home/Header";
import Tabbar from '@/components/common/Tabbar'

export default {
  name: 'home-container',
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
  },
  data() {
    return  {
      value: '推荐',
      items: [
        {name: '推荐', title: '推荐'},
        {name: 'webGL', title: 'webGL'},
        {name: 'chatGPT', title: 'chatGPT'},
        {name: '大数据', title: '大数据'},
        {name: '元宇宙', title: '元宇宙'},
        {name: '编译原理', title: '编译原理'},
      ]
    }
  }
}
</script>

<style scoped>

.ly-tabs {
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
}
</style>
