<template>
  <div class="edit container">
    <Header>
      <span>添加地址</span>
    </Header>
    <section>
      <van-address-edit
          :area-list="areaList"
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSave"
      />
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/path/Header";
import Tabbar from "@/components/common/Tabbar";
import http from '@/common/api/request';
// vant组件
import {Toast} from "vant";
// 地区数据
import { areaList } from '@vant/area-data';

export default {
  name: "PathEdit",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      areaList, // 地区数据
      searchResult: []
    }
  },
  methods: {
    // 保存地址
    onSave(content) {
      content.isDefault = content.isDefault ? 1 : 0;
      http.$axios({
        url: '/api/newAddress',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          ...content
        }
      }).then(res => {
        if(!res.success) return;
        Toast(res.message);
        this.$router.push('/path');
      })
    },
  }
}
</script>

<style scoped lang="scss">
section {
  background-color: #F7F7F7;
  ::v-deep .van-switch--on {
    background-color: sandybrown;
  }
  ::v-deep .van-address-edit__buttons {
    display: flex;
    justify-content: center;
  }
  ::v-deep .van-button--danger {
    width: 600px;
    height: 80px;
    background-color: sandybrown;
    border: 1px solid sandybrown;
  }
}
.van-address-edit {
  padding: 0;
}
</style>
