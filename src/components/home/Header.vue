<template>
  <header>
    <h1><img src="@/assets/images/logo.png" alt=""/></h1>
    <div class="search">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜您喜欢的</span>
    </div>
    <div class="kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-container',
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: sandybrown;
}
header h1 {
  display: flex;
  align-items: center;
  height: 80px;
}
header h1 img {
  box-sizing: border-box;
  padding: 5px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
.search {
  display: flex;
  align-items: center;
  width: 500px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 24px;
}
.search i {
  margin-left: 10px;
  padding: 16px;
  color: #ccc;
}
.search span {
  color: #ccc;
}
.kefu i{
  font-size: 50px;
  color: white;
}
</style>
