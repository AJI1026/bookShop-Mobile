<template>
  <div id="home-container">
    <!--头部-->
    <Header></Header>
    <!--用了ly-tab插件-->
    <ly-tabs v-model="value" activeColor="#F4A460FF">
      <ly-tab-item
          v-for="(item, index) in topBar"
          :name="item.name"
          :title="item.title"
          :key="index"
          @click.native="changeTab(index)"
      />
    </ly-tabs>
    <!--主题内容-->
    <section>
      <div style="height: 80px"></div>
      <!--数据循环-->
      <div v-for="(item, index) in otherData" :key="index">
        <Swiper v-if="item.type === 'swiperList'" :swiperList = 'item.data'></Swiper>
        <!--图标-->
        <Icons v-if="item.type === 'iconList'" :iconList = 'item.data'></Icons>
        <!--推荐-->
        <Recommend v-if="item.type === 'recommendList'" :recommendList = 'item.data'></Recommend>
        <!--广告区-->
        <Ad v-if="item.type === 'adList'" :adList = 'item.data'></Ad>
        <!--cookie类型推荐-->
        <Like v-if="item.type === 'likeList'" :likeList = 'item.data'></Like>
      </div>
    </section>
    <!--底部-->
    <div style="height: 45px;margin-top: 40px"></div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 页面组件
import Ad from "@/components/home/Ad";
import Like from "@/components/home/Like";
import Recommend from "@/components/home/Recommend";
import Icons from "@/components/home/Icons";
import Swiper from "@/components/home/Swiper";
import Header from "@/components/home/Header";
import Tabbar from '@/components/common/Tabbar';
// 引入插件
import http from '@/common/api/request'

export default {
  name: 'home-container',
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad,
  },
  data() {
    return  {
      value: '推荐', // 头部默认选中
      topBar: [], // 头部数据
      otherData: [], // 其他数据
    }
  },
  methods: {
    // 这里获取不同tabBar下对应的数据
    async addData(index) {
      let res = await http.$axios({
        url: `/api/index_list/${index}/data/1`,
      });
      if(res.constructor !== Array) {
        this.otherData = res.data
      } else {
        this.otherData = res
      }
    },

    // 点击tabBar切换数据
    changeTab(index) {
      this.addData(index);
    },

    // 获取数据
    async getData() {
      let res = await http.$axios({
        url: '/api/index_list/0/data/1',
      });
      // 性能提升
      this.topBar = Object.freeze(res.topBar);
      this.otherData = Object.freeze(res.data);
    }
  },
  created() {
    this.getData()
  },
  mounted() {}
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
