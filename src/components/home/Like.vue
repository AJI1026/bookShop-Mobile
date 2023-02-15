<template>
  <div class="like">
    <Card>
      <span>勇者的推荐</span>
    </Card>
    <ul>
      <li v-for="(item, index) in likeList"
          :key="index"
          @click="goDetail"
      >
        <h2>
          <!--图片懒加载-->
          <img v-lazy="item.imgUrl" alt=""/>
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
  props: {
    likeList:Array
  },
  data() {
    return {
    }
  },
  methods: {
    goDetail() {
      this.$router.push('/detail')
    },
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
.like img[lazy=loading] {
  background-image: url("../../assets/images/loading.gif");
  background-position: center;
  background-size: cover;
}
</style>
