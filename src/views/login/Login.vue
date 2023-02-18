<template>
  <div class="login container">
    <!--头部-->
    <Header></Header>
    <!--内容-->
    <section>
      <div class="login-phone">
        <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*"/>
      </div>
      <div class="login-code">
        <input type="text" v-model="userCode" placeholder="请输入短信验证码" pattern="[0-9]*"/>
        <button
            @click="sendCode"
            :disabled="disabled"
        >{{codeMsg}}</button>
      </div>
      <div class="login-btn" @click="login">
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
// 组件
import Tabbar from "@/components/common/Tabbar";
import Header from "@/views/login/Header";
// mint-ui组件
import {Toast} from "mint-ui";
import http from '@/common/api/request';

export default {
  name: "Login-container",
  components: {
    Tabbar,
    Header,
  },
  data() {
    return {
      userTel: '', // 用户手机号
      rules: {
        // 手机验证
        userTel: {
          rule: /^1[3456789]\d{9}$/,
          message: '手机号不能为空，并且是11位数字'
        }
      },
      disabled: false,
      codeNum: 60,
      codeMsg: '获取短信验证码',
      code: '', // 短信验证码
      userCode: '', // 用户输入的验证码
    }
  },
  methods: {
    // 密码登录
    goUserLogin() {
      this.$router.push('/userLogin')
    },
    // 点击验证码按钮
    sendCode() {
      // 验证
      if(!this.validate('userTel')) return;
      // 请求短信验证码接口
      http.$axios({
        url: '/api/code',
        method: 'POST',
        data: {
          phone: this.userTel
        }
      }).then(res => {
        if(res.success) {
          this.code = res.data
        }
      })
      // 禁用按钮
      this.disabled = true;
      // 倒计时
      let timer = setInterval(() => {
        --this.codeNum;
        this.codeMsg = `重新发送${this.codeNum}`;
      },1000)
      // 判断什么时候停止
      setTimeout(() => {
        clearInterval(timer);
        this.codeNum = 60;
        this.disabled = false;
        this.codeMsg = '获取短信验证码';
      },60000)
    },
    // 验证信息提示
    validate(key) {
      let bool = true;
      if(!this.rules[key].rule.test(this[key])) {
        // 提示信息
        Toast(this.rules[key].message);
        bool = false;
        return false;
      }
      return bool
    },
    // 点击登录
    login() {
      if(this.code === this.userCode) {
        // 证明用户输入的短信验证码是正确的
        // 发送请求
        http.$axios({
          url: '/api/addUser',
          method: 'POST',
          data: {
            phone: this.userTel
          }
        }).then(res => {
          if(!res.success) return;
          console.log(res)
        })
      }
    }
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
