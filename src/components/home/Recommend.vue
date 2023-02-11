<template>
  <div class="recommend">
    <card></card>
    <ul>
      <li v-for="(item, index) in recommendList" :key="index">
        <h2>
          <img :src="item.imgUrl" alt="" />
        </h2>
        <div id="text">
          <h3 style="font-size: 8px; font-weight: 400">{{item.name}}</h3>
          <p style="font-size: 14px">{{item.content}}</p>
          <div id="price">
            <span>💰</span>
            <b style="font-size: 18px">{{item.price}}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "@/components/home/Card";

export default {
  name: 'recommend-container',
  components: {
    Card,
  },
  props: {
    recommendList:Array
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

.recommend ul li {
  width: 100%;
  position: relative;
}
.recommend ul li h2 {
  box-sizing: border-box;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 12px;
  margin: 0 10px 20px 10px;
  height: 260px;
}
.recommend ul li img {
  margin-left: 60px;
  width: 220px;
  height: 220px;
}
.recommend ul li > div{
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 40px;
  top: 30%;
  justify-content: space-between;
}
#text h3 {
  color: dimgrey;
  text-align: center;
}
#text p {
  text-align: right;
}
#price {
  box-sizing: border-box;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
#price span {
  display: flex;
  align-items: center;
}
#price b {
  color: sandybrown;
}
</style>
