<template>
  <header>
    <i class="iconfont icon-back" style="font-size: 20px" @click="goBack"></i>
    <slot>
      <span style="font-size: 16px">我的地址</span>
    </slot>
    <i class="iconfont icon-shouye" style="font-size: 20px" @click="goHome"></i>
  </header>
</template>

<script>
export default {
  name: "Header-container",
  methods: {
    goBack() {
      if(this.$route.path === '/path') {
        this.$router.push('/my');
      } else {
        this.$router.back();
      }
    },
    goHome() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: sandybrown;
  color: white;
  i {
    padding: 0 40px;
  }
}
</style>
