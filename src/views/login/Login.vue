<template>
  <div class="login container">
    <!--头部-->
    <Header></Header>
    <!--内容-->
    <section>
      <div class="login-phone">
        <input type="text" placeholder="请输入手机号" pattern="[0-9]*"/>
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入短信验证码" pattern="[0-9]*"/>
        <button>获取短信验证码</button>
      </div>
      <div class="login-btn">
        登录
      </div>
      <div class="tab">
        <span @click="goUserLogin">
          <i class="iconfont icon-mima"></i>
          密码登录
        </span>
        <span>
          <i class="iconfont icon-register"></i>
          快速注册
        </span>
      </div>
    </section>
    <!--底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar";
import Header from "@/views/login/Header";

export default {
  name: "Login-container",
  components: {
    Tabbar,
    Header,
  },
  data() {
    return {

    }
  },
  methods: {
    // 密码登录
    goUserLogin() {
      this.$router.push('/userLogin')
    },
  }
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f5f5;
  div {
    margin: 20px 0;
    width: 600px;
    height: 60px;
  }
  input {
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 70px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 12px;
  }
  .login-phone {
    input {
      width: 100%;
    }
    margin-top: 70px;
  }
  .login-code {
    display: flex;
    align-items: center;
    input {
      flex: 1;
    }
    button {
      height: 70px;
      background-color: #b0352f;
      border: none;
      border-radius: 12px;
      box-sizing: border-box;
      padding: 0 20px;
      color: white;
      margin-left: 10px;
    }
  }
  .login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 12px;
    height: 70px;
    background-color: #b0352f;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
}
</style>
