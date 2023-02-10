<template>
  <div id="home-container">
    <Header></Header>
    <!--用了ly-tab插件-->
    <ly-tabs v-model="value" activeColor="#F4A460FF">
      <ly-tab-item v-for="(item, index) in items" :name="item.name" :title="item.title" :key="index"/>
    </ly-tabs>
    <!--主题内容-->
    <section>
      <Swiper></Swiper>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Swiper from "@/components/home/Swiper";
import Header from "@/components/home/Header";
import Tabbar from '@/components/common/Tabbar'

export default {
  name: 'home-container',
  components: {
    Tabbar,
    Header,
    Swiper
  },
  data() {
    return  {
      value: '推荐',
      items: [
        {name: '推荐', title: '推荐'},
        {name: '大红袍', title: '大红袍'},
        {name: '绿茶', title: '绿茶'},
        {name: '普洱', title: '普洱'},
        {name: '茶具', title: '茶具'},
        {name: '花茶', title: '花茶'},
      ]
    }
  }
}
</script>

<style scoped>
  .ly-tabs {
    margin-top: 80px;
    left: 0;
  }
</style>
