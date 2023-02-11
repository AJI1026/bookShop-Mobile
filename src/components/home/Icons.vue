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
  data() {
    return {
      // 图标数据
      iconList: [
        {
          id: 0,
          title: '剑术提升',
          imgUrl: './images/skill.png'
        },
        {
          id: 1,
          title: '吟唱魔法',
          imgUrl: './images/lapp.png'
        },
        {
          id: 2,
          title: '装备配置',
          imgUrl: './images/box.png'
        },
        {
          id: 3,
          title: '公会馈赠',
          imgUrl: './images/gift.png'
        },
        {
          id: 4,
          title: '公会授权',
          imgUrl: './images/auth.png'
        },
      ]
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
