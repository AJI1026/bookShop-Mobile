<template>
  <div class="register container">
    <!--头部-->
    <Header>
      <span>注册</span>
    </Header>
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
      <div class="login-pwd">
        <input type="text" v-model="userPwd" placeholder="请设置密码" pattern="[0-9]*"/>
      </div>
      <div class="login-btn" @click="register">
        注册
      </div>
      <div class="agreement">
        <span>
          注册即视为同意<a href="#/agreement">《勇者探险公会注册协议》</a>
        </span>
      </div>
    </section>
    <!--底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/views/login/Header";
import Tabbar from "@/components/common/Tabbar";
import http from "@/common/api/request";
import {Toast} from "mint-ui";

export default {
  name: "register-container",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      userTel: '', // 用户手机号
      userPwd: '', // 用户输入的密码
      rules: {
        // 手机验证
        userTel: {
          rule: /^1[3456789]\d{9}$/,
          message: '手机号不能为空，并且是11位数字'
        },
        // 密码验证
        userPwd: {
          rule: /^\w{6,12}$/,
          message: '密码不能为空，并且是6-12位'
        },
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
      // 验证手机号
      if(!this.validate('userTel')) return;

      // 请求短信验证码接口
      http.$axios({
        url: '/api/code',
        method: 'POST',
        data: {
          phone: this.userTel
        }
      }).then(res => {
        console.log(res)
        if(res.success) {
          this.code = res.data;
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
    // 点击注册
    register() {
      // 密码验证正确
      if(!this.validate('userPwd')) return;

      // 判断验证码是否正确
      if(this.code !== Number(this.userCode)) {
        Toast('验证码不正确');
        return;
      }
      // 证明用户输入的短信验证码是正确的
      // 发送请求
      http.$axios({
        url: '/api/register',
        method: 'POST',
        data: {
          phone: this.userTel,
          pwd: this.userPwd
        }
      }).then(res => {
        console.log(res);
      })
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
  .login-pwd {
    input {
      width: 100%;
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
  .agreement {
    span {
      a {
        color: sandybrown;
      }
    }
  }
}
</style>
