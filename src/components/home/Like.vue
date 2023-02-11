<template>
  <div class="like">
    <Card>
      <span>勇者的推荐</span>
    </Card>
    <ul>
      <li v-for="(item, index) in likeList" :key="index">
        <h2>
          <img :src="item.imgUrl" alt="" />
        </h2>
        <h3 style="font-size: 12px">{{item.name}}</h3>
        <div id="price">
          <span>💰</span>
          <b style="font-size: 16px">{{item.price}}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "@/components/home/Card";

export default {
  name: 'like-container',
  components: {
    Card,
  },
  data() {
    return {
      // 推荐数据
      likeList: [
        {
          id: 0,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like0.jpeg'
        },
        {
          id: 1,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like1.jpeg'
        },
        {
          id: 2,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like2.jpeg'
        },
        {
          id: 3,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like3.jpeg'
        },
        {
          id: 4,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like4.jpeg'
        },
        {
          id: 5,
          name: '可编程网络自动化',
          price: '128',
          imgUrl: './images/like5.jpeg'
        },
      ]
    }
  }
}
</script>

<style scoped>
.like ul {
  display: flex;
  flex-wrap: wrap;
}
.like ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  box-sizing: border-box;
  padding: 20px;
}
.like h3 {
  width: 100%;
  color: dimgrey;
  box-sizing: border-box;
  padding: 5px;
}
#price {
  color: sandybrown;
  box-sizing: border-box;
  padding: 5px;
}
.like img {
  width: 100%;
  height: 400px;
}
</style>
