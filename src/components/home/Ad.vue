<template>
  <div class="ad">
    <ul>
      <li v-for="(item, index) in adList" :key="index" >
        <img :src="item.imgUrl" alt=""/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ad-container',
  props: {
    adList:Array
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.ad ul li{
  width: 100%;
  height: 300px;
}
.ad img {
  width: 100%;
  height: 100%;
}
</style>
