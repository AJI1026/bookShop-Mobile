<template>
  <div class="search-index">
    <router-view></router-view>
    <!--搜索头部-->
    <Header></Header>
    <!--内容-->
    <section>
      <div class="search-history" v-if="searchArr!==null">
        <h2>
          <i class="iconfont icon-shijian" style="font-size: 16px"></i>
          <span>历史搜索</span>
          <span>清空搜索记录</span>
        </h2>
        <ul>
          <li
              v-for="(item, index) in searchArr"
              :key="index"
              @click="goSearchList(item)"
          >{{item}}</li>
        </ul>
      </div>
      <div v-else class="no-data" style="font-size: 14px">
        <span>暂无搜索记录...</span>
        <img src="../../assets/images/emptyInfo.png" alt=""/>
      </div>
    </section>
    <!--搜索底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";
export default {
  name: 'search-index-container',
  components: {
    Tabbar,
    Header,
  },
  data() {
    return {
      searchArr: []
    }
  },
  methods: {
    // 点击历史搜索，进入结果页面
    goSearchList(item) {
      this.$router.push({
        name: 'SearchList',
        query: {
          key: item
        }
      })
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchList'))
  }
}
</script>

<style scoped>
.search-index {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
section {
  flex: 1;
  background-color: #f5f5f5;
  overflow: hidden;
}
.search-history {
  box-sizing: border-box;
  padding: 40px;
}
.search-history h2 {
  font-size: 30px;
}
.search-history h2 i {
  padding-right: 10px;
  color: sandybrown;
}
.search-history h2 span:last-child {
  float: right;
}
.search-history ul {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
.search-history ul li {
  margin: 10px 40px 25px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 5px;
  color: #cccccc;
}
.no-data {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  padding: 20px;
}
.no-data span {
  text-align: center;
  width: 100%;
  padding: 20px;
  color: #cccccc;
}
.no-data img {
  width: 300px;
  height: 300px;
}
</style>
