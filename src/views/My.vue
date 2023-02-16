<template>
  <div id="my" class="container">
    <!--头部-->
    <header>
      <div class="login" @click="goLogin">登录/注册</div>
    </header>
    <!--内容-->
    <section>
      <ul>
        <li>地址管理 </li>
      </ul>
    </section>
    <!--底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar'

export default {
  name: 'my-container',
  components: {
    Tabbar
  },
  data() {
    return  {

    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login');
    }
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
}
section {
  flex: 1;
  overflow: hidden;
  ul li {
    padding: 20px;

  }
}
</style>
