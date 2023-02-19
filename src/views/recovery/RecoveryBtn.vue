<template>
  <div class="btn container">
    <!--头部-->
    <Header>
      <span>找回密码</span>
    </Header>
    <!--内容-->
    <section>
      <div class="login-phone">
        <input type="text" v-model="newPwd" placeholder="请输入新的密码" pattern="[0-9]*"/>
      </div>
      <div class="login-btn" @click="subPwd">
        确认修改
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
import {Toast} from "mint-ui";
import http from '@/common/api/request';

export default {
  name: "btn-container",
  components: {
    Tabbar,
    Header,
  },
  data() {
    return {
      newPwd: '', // 用户输入新的密码
      rules: {
        newPwd: {
          rule: /^\w{6,12}$/,
          message: '密码不能为空，并且是6-12位'
        }
      }
    }
  },
  methods: {
    // 验证密码格式
    validate(key) {
      let bool = true;
      if(!this.rules[key].rule.test(this[key])) {
        Toast(this.rules[key].message);
        bool = false;
        return false;
      }
      return bool;
    },
    // 确认修改按钮
    subPwd() {
      if(!this.validate('newPwd')) return;
      // 发送请求，确认修改
      http.$axios({
        url: '/api/reset',
        method: 'POST',
        data: {
          phone: this.$route.query.phone,
          pwd: this.newPwd,
        }
      }).then(res => {
        Toast('修改成功，请重新登录');
        if(res.success) {
          this.$router.push({
            path: '/login'
          })
        }
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
