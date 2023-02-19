<template>
  <div id="my" class="container">
    <!--头部-->
    <header>
      <div class="user-info" v-if="loginStatus">
        <img :src="userInfo.imgUrl" alt=""/>
        <span style="font-size: 16px">{{userInfo.nickName}}</span>
      </div>
      <div class="login" @click="goLogin" v-else>登录/注册</div>
    </header>
    <!--内容-->
    <section>
      <ul style="font-size: 14px">
        <li>地址管理</li>
        <li v-if="loginStatus" @click="loginOut">退出登录</li>
      </ul>
    </section>
    <!--底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar'
import {mapMutations, mapState} from 'vuex';

export default {
  name: 'my-container',
  components: {
    Tabbar
  },
  computed: {
    ...mapState({
      loginStatus: state => state.user.loginStatus,
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return  {

    }
  },
  methods: {
    ...mapMutations(['loginOut']),
    goLogin() {
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 320px;
  background-color: sandybrown;
  .login {
    display: flex;
    align-items: center;
    color: #fff;
    height: 40px;
    background-color: #d4c0a7;
    border-radius: 12px;
    padding: 10px 20px;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
    }
    span {
      padding: 30px 0;
      text-align: center;
      color: white;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
  ul li {
    padding: 30px 40px;
  }
}
</style>
