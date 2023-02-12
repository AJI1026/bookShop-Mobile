<template>
  <div class="search">
    <!--搜索头部-->
    <Header></Header>
    <!--内容-->
    <section>

    </section>
    <!--搜索底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";
export default {
  name: 'search-container',
  components: {
    Tabbar,
    Header,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
section {
  flex: 1;
  overflow: hidden;
}
</style>
