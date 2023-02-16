<template>
  <header>
    <div @click="goBack">
      <i class="iconfont icon-back" style="font-size: 20px"></i>
    </div>
    <div>
      <slot>
        <span style="font-size: 16px">登录</span>
      </slot>
    </div>
    <div>
      <i class="iconfont icon-kefu" style="font-size: 20px"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header-container",
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: sandybrown;
  span {
    color: white;
  }
  i {
    color: white;
    padding: 0 20px;
  }
}
</style>
