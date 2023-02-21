<template>
  <div class="tabBar-container">
    <ul>
      <li v-for="(item, index) in routerList" :key="index" @click="switchTab(item.path)">
        <img :src="$route.path.includes(item.path) ? item.selected : item.active" alt="" />
        <span :class="$route.path.includes(item.path) ? 'active' : ''">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'tabBar-container',
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home',
          active: './images/home.png',
          selected: './images/homeS.png',
        },
        {
          title: '分类',
          path: '/list',
          active: './images/sort.png',
          selected: './images/sortS.png',
        },
        {
          title: '购物车',
          path: '/cart',
          active: './images/cart.png',
          selected: './images/cartS.png',
        },
        {
          title: '我的',
          path: '/my',
          active: './images/my.png',
          selected: './images/myS.png',
        }
      ]
    }
  },
  methods: {
    switchTab(path) {
      // 判断是否点击的是同一个路由
      if(this.$route.path === path) return;
      // 对应的跳转路径
      this.$router.push(path);
    }
  }
}

</script>

<style scoped>
  .tabBar-container {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 90px;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }
  .tabBar-container ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .tabBar-container ul li {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .tabBar-container ul li img {
    height: 50px;
    width: 50px;
  }
  .tabBar-container ul li span {
    text-align: center;
    font-size: 14px;
  }
  .active {
    color: sandybrown;
  }
</style>
