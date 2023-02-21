<template>
  <div class="path-index container">
    <Header></Header>
    <section>
      <ul>
        <li style="font-size: 13px" @click="editAddress">
          <div>
            <span>阿集</span>
            <span>13980907918</span>
          </div>
          <div>
            <span class="tag">[默认]</span>
            <span class="address">xx xxx xxx xxxxxxx</span>
          </div>
          <div></div>
        </li>
      </ul>
      <div class="add-address" @click="editAddress">添加地址</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/path/Header";
import Tabbar from "@/components/common/Tabbar";

export default {
  name: "PathIndex",
  components: {
    Header,
    Tabbar
  },
  methods: {
    // 编辑地址
    editAddress() {
      this.$router.push('/pathEdit')
    }
  }
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F7F7F7;
  ul {
    width: 100%;
    li {
      color: #3a3a3a;
      box-sizing: border-box;
      padding: 15px 40px;
      margin: 20px 0;
      background-color: #FFFFFF;
      div {
        box-sizing: border-box;
        padding: 5px 0;
      }
      span {
        margin-right: 20px;
      }
      .tag {
        color: sandybrown;
      }
      .address {
        color: #ccc;
      }
    }
  }
  .add-address {
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 10px;
    background-color: sandybrown;
    color: #fff;
    width: 200px;
    height: 60px;
    border-radius: 12px;
  }
}
</style>
