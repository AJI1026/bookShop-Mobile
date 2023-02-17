<template>
  <div class="userLogin container">
    <!--头部-->
    <Header></Header>
    <!--内容-->
    <section>
      <div class="login-phone">
        <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*"/>
      </div>
      <div class="login-code">
        <input type="text" v-model="userPwd" placeholder="请输入密码" pattern="[0-9]*"/>
      </div>
      <div class="login-btn" @click="login">
        登录
      </div>
      <div class="tab">
        <span @click="goLogin">
          <i class="iconfont icon-duanxinyingxiao-qunfaduanxin"></i>
          短信登录
        </span>
        <span>
          <i class="iconfont icon-zhaohuimima"></i>
          找回密码
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
import http from '@/common/api/request';
// mint-ui组件
import { Toast } from 'mint-ui';

export default {
  name: "userLogin",
  data() {
    return {
      rules: {
        // 手机号验证
        userTel: {
          rule: /^1[3456789]\d{9}$/,
          message: '手机号不能为空，并且是11位数字'
        },
        // 密码验证
        userPwd: {
          rule: /^\w{6,12}$/,
          message: '密码不能为空，并且是6-12位'
        }
      }, // 验证规则
      userTel: '', // 用户输入的手机号
      userPwd: '', // 用户输入的密码
    }
  },
  components: {
    Tabbar,
    Header,
  },
  methods: {
    // 短信登录
    goLogin() {
      this.$router.push('/login')
    },
    // 点击登录按钮
    login() {
      // 前端验证
      if(!this.validate('userTel')) return;
      if(!this.validate('userPwd')) return;
      // 发送请求，后端验证
      http.$axios({
        url: '/api/login',
        method: 'POST',
        data: {
          userTel: this.userTel,
          userPwd: this.userPwd
        }
      }).then(res => {
        // 提示信息
        Toast(res.message);
        // 登录失败
        if(!res.success) return;
        // 登录成功，存储登录信息
      })
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
      return bool;
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
