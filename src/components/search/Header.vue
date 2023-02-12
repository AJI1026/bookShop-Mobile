<template>
  <header>
    <div class="search-return">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="search-input">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false">
        <input type="search" placeholder="搜索属于你自己的技能书吧！"/>
      </form>
    </div>
    <div class="search-btn">
      <span style="font-size: 14px">搜索</span>
    </div>
  </header>
</template>

<script>
export default {
  name:'search-header-container',
  data() {
    return {

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
  padding-left: 5px;
  color: #cccccc;
}
.search-input input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 50px;
  height: 60px;
  width: 600px;
  border-radius: 32px;
  background-color: white;
}
</style>
