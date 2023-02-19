<template>
  <div class="recovery container">
    <!--头部-->
    <Header>
      <span>找回密码</span>
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
      <div class="login-btn" @click="nextStep">
        下一步
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
  name: "recovery-container",
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
    // 点击下一步
    nextStep() {
      // 如果验证码不正确
      if(this.code !== Number(this.userCode)) {
        Toast('验证码不正确');
        return;
      }
      // 告诉后端，用户输入的手机号是否存在
      http.$axios({
        url: '/api/searchUser',
        method: 'POST',
        data: {
          phone: this.userTel
        }
      }).then(res => {
        if(!res.success) {
          Toast(res.message);
          return;
        }
        this.$router.push({
          name: 'RecoveryBtn',
          query: {
            phone: this.userTel,
          }
        })
      })
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
}
</style>
