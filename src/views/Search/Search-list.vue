<template>
  <div class="search-list">
    <!--搜素详情页头部-->
    <div class="headers">
      <Header></Header>
      <ul>
        <li v-for="(item, index) in searchList.data"
            :key="index"
            @click="changeTab(index)"
        >
          <div :class="searchList.currentIndex === index? 'active' : ''">{{item.name}}</div>
          <div v-if="index !== 0" class="search-filter">
            <i class="iconfont icon-shangjiantou"
                :class="item.status === 1? 'active' : ''"
            ></i>
            <i class="iconfont icon-xiajiantou"
                :class="item.status === 2? 'active' : ''"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <!--搜素详情页中间内容-->
    <section>
      <ul v-if="goodsList.length">
        <li v-for="(goods, index) in goodsList" :key="index">
          <img :src="goods.imgUrl" alt="" />
          <h3 style="width: 150px">{{goods.name}}</h3>
          <div class="price">
            <div>
              <span>💰</span>
              <b style="font-size: 18px">{{goods.price}}</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
      </ul>
      <h1 v-else id="nodata">
        <img src="../../assets/images/nodata.jpeg" alt=""/>
        <span>技能书遗失...</span>
      </h1>
    </section>
    <!--搜素详情页底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";
import http from '@/common/api/request';

export default {
  name:'search-list-container',
  components: {
    Header,
    Tabbar
  },
  data() {
    return {
      goodsList: '', // 搜索的书籍数据
      searchList: {
        currentIndex:0,
        data:[
          {name:'综合', key:'zh'},
          {name:'价格',status: 0, key:'price'}, //status 排序方式 0 默认 1 升序 2 降序
          {name:'销量',status: 0, key:'num'},
        ]
      }
    }
  },
  computed: {
    goodsBy() {
      // 当前的对象
      let obj = this.searchList.data[this.searchList.currentIndex];
      // 当前对象升序还是降序的判断
      let val = obj.status === 1 ? 'asc' : 'desc';
      return {
        [obj.key]:val
      }
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  methods: {
    // 获取搜索数据
    getData() {
      http.$axios({
        url: '/api/goods/shopList',
        params: {
          searchName: this.$route.query.key,
          ...this.goodsBy
        }
      }).then(res => {
        this.goodsList = res;
      })
    },
    // 切换过滤条件
    changeTab(index) {
      this.searchList.currentIndex = index
      let cur = this.searchList.data[index]
      // 先取消其他的状态
      this.searchList.data.forEach((item,i) => {
        if(i !== index ) {
          item.status = 0
        }
      })
      // 当前点击改变的状态
      if(index === this.searchList.currentIndex) {
        cur.status = cur.status === 1 ? 2 : 1;
      }
      // 发送请求排序数据
      this.getData()
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.search-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.search-list .headers {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
}
section {
  box-sizing: border-box;
  margin-top: 182px;
  padding: 20px 20px 200px;
}
.headers ul {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background-color: white;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.headers ul li>div {
  padding: 5px;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
}
.search-filter i {
  color: #cccccc;
}
section ul li img {
  width: 300px;
  height: 300px;
}
section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section ul li h3 {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 5px;
  font-weight: 400;
  color: #3a3a3a;
}
section ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 40px;
}
section ul li .price {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  align-items: center;
  line-height: 27px;
}
.price>div:nth-child(1) {
  display: inline-block;
  color: sandybrown;
  height: 100%;
  position: relative;
  top: 10px;
}
.price>div:nth-child(2) {
  float: right;
  color: #fff;
  background-color: sandybrown;
  padding: 10px 12px;
  border-radius: 8px;
}
.active {
  color: sandybrown !important;
}
#nodata {
  text-align: center;
  color: #cccccc;
}
#nodata span {
  display: block;
}
#nodata img {
  width: 200px;
  height: 200px;
  padding: 20px;
}
</style>
