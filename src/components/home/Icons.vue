<template>
  <ul class="icons">
    <li v-for="(icon, index) in iconList" :key="index">
      <img :src="icon.imgUrl" alt=""/>
      <span>{{icon.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'icons-container',
  props: {
    iconList:Array
  },
  data() {
    return {
    }
  }
}

</script>

<style scoped>
.icons {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}
.icons li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icons img {
  width: 50px;
}
.icons span {
  font-size: 12px;
  padding: 5px;
}
</style>
