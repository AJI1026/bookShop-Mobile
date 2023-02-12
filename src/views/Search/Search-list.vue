<template>
  <div class="search-list">
    <!--搜素详情页头部-->
    <div class="headers">
      <Header></Header>
      <ul>
        <li>
          <div>综合</div>
        </li>
        <li>
          <div>价格</div>
          <div class="search-filter">
            <i class="iconfont icon-shangjiantou"></i>
            <i class="iconfont icon-xiajiantou"></i>
          </div>
        </li>
        <li>
          <div>销量</div>
          <div class="search-filter">
            <i class="iconfont icon-shangjiantou"></i>
            <i class="iconfont icon-xiajiantou"></i>
          </div>
        </li>
      </ul>
    </div>
    <!--搜素详情页中间内容-->
    <section>
      <ul>
        <li>
          <img src="../../assets/images/detail.png" alt="" />
          <h3>微积分溯源</h3>
          <div class="price">
            <div>
              <span>💰</span>
              <b style="font-size: 18px">33</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
        <li>
          <img src="../../assets/images/detail.png" alt="" />
          <h3>微积分溯源</h3>
          <div class="price">
            <div>
              <span>💰</span>
              <b style="font-size: 18px">33</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
        <li>
          <img src="../../assets/images/detail.png" alt="" />
          <h3>微积分溯源</h3>
          <div class="price">
            <div>
              <span>💰</span>
              <b style="font-size: 18px">33</b>
            </div>
            <div>立即购买</div>
          </div>
        </li>
      </ul>
    </section>
    <!--搜素详情页底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";

export default {
  name:'search-list-container',
  components: {
    Header,
    Tabbar
  },
  data() {
    return {

    }
  },
  created() {

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
section {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}
.headers ul {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
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
  width: 100%;
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
</style>
