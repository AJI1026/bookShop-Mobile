<template>
  <div id="app">

    <!--要缓存的路由-->
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>

    <!--不缓存的路由-->
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    this.$store.commit('INIT_USER');
  }
}
</script>

<style scoped>

</style>
