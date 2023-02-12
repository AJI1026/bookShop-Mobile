<template>
  <header>
    <div class="search-return" @click="goBack">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="search-input">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input type="search" placeholder="搜索属于你自己的技能书吧！" v-model="searchValue"/>
      </form>
    </div>
    <div class="search-btn" @click="goSearchList">
      <span style="font-size: 14px">搜索</span>
    </div>
  </header>
</template>

<script>
export default {
  name:'search-header-container',
  data() {
    return {
      searchValue: this.$route.query.key, // 搜索的数据
      searchArr: [], // 本地存储的搜索数据数组
    }
  },
  methods: {
    // 返回页面
    goBack() {
      this.$router.back()
    },
    // 去到详情页
    goSearchList() {
      // 如果搜索的关键字为空，直接return
      if(!this.searchValue) return;
      // 判断之前有没有搜索的本地存储
      if(!localStorage.getItem('searchList')) {
        // 没有
        localStorage.setItem('searchList', '[]');
      } else {
        // 之前有
        this.searchArr = JSON.parse(localStorage.getItem('searchList'))
      }
      // 增加数据
      this.searchArr.unshift(this.searchValue);
      // 去重
      this.searchArr = [...new Set(this.searchArr)];
      // 给本地存储赋值
      localStorage.setItem('searchList', JSON.stringify(this.searchArr))

      // 路径如果没有变化，不跳转页面
      if(this.searchValue === this.$route.query.key) return;
      this.$router.push({
        name: 'SearchList',
        query: {
          key: this.searchValue
        }
      })
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: sandybrown;
}
.search-return i {
  font-size: 40px;
  font-weight: 600;
  color: white;
}
.search-input {
  display: flex;
  align-items: center;
  position: relative;
}
.search-input i{
  position: absolute;
  left: 10px;
  font-size: 30px;
  padding-left: 10px;
  color: #cccccc;
}
.search-input input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 60px;
  padding-right: 20px;
  height: 60px;
  width: 600px;
  border-radius: 32px;
  background-color: white;
}
.search-btn {
  color: white;
}
</style>
