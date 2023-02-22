<template>
  <div class="edit container">
    <Header style="font-size: 16px">
      <span v-if="pathStatus">添加地址</span>
      <span v-else>编辑地址</span>
    </Header>
    <section>
      <!--添加地址-->
      <van-address-edit
          v-if="pathStatus"
          :area-list="areaList"
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onAdd"
      />
      <!--编辑地址-->
      <van-address-edit
          v-else
          :address-info="AddressInfo"
          :area-list="areaList"
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @delete="onDelete"
          @save="onUpdate"
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
      searchResult: [],
      pathStatus: false,
      AddressInfo: {}, // 初始传入的地址信息
    }
  },
  methods: {
    // 保存新增地址
    onAdd(content) {
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
    // 删除修改地址
    onDelete(content) {
      console.log(content);
      http.$axios({
        url: '/api/deleteAddress',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: content.id
        }
      }).then(res => {
        if(!res.success) return;
        Toast(res.message);
        this.$router.push('/path');
      })
    },
    // 保存修改地址
    onUpdate(content) {
      http.$axios({
        url: '/api/updateAddress',
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
    }
  },
  mounted() {
    if(this.$route.params.key !== null) {
      let key = JSON.parse(this.$route.params.key);
      // 是通过添加进来的
      if(key === 'add') {
        this.pathStatus = true
      } else {
        // 编辑进来的
        this.AddressInfo = key;
        this.AddressInfo.isDefault = !!Number(this.AddressInfo.isDefault);
      }
    }
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
    flex-wrap: wrap;
  }
  ::v-deep .van-button--danger {
    width: 600px;
    height: 80px;
    background-color: sandybrown;
    border: 1px solid sandybrown;
  }
  ::v-deep .van-button--default {
    width: 600px;
    height: 80px;
  }
}
.van-address-edit {
  padding: 0;
}
</style>
