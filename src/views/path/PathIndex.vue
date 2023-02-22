<template>
  <div class="path-index container">
    <Header></Header>
    <section ref="address" >
      <div class="Address">
        <ul v-if="list.length !== 0">
          <li style="font-size: 13px"
              @click="editAddress(item)"
              v-for="(item, index) in list"
              :key="index"
          >
            <div>
              <span>{{ item.name }}</span>
              <span style="margin-left: 10px">{{ item.tel }}</span>
            </div>
            <div class="address-detail">
              <span v-show="Number(item.isDefault)" class="tag">{{ Number(item.isDefault) ? "[默认]" : "" }}</span>
              <span class="address">{{ item.province }} {{ item.city }} {{ item.county }} {{ item.addressDetail }}</span>
            </div>
            <div></div>
          </li>
        </ul>
        <div class="empty" v-else>
          <div>请添加地址哦～</div>
        </div>
        <div class="add-address" @click="editAddress('add')">添加地址</div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/path/Header";
import Tabbar from "@/components/common/Tabbar";
import http from "@/common/api/request";
import { mapState, mapMutations } from "vuex";
import BetterScroll from "better-scroll";

export default {
  name: "PathIndex",
  components: {
    Header,
    Tabbar
  },
  computed: {
    ...mapState({
      list: state => state.path.list
    })
  },
  methods: {
    ...mapMutations(['INIT_DATA']),
    // 获取数据
    getData() {
      http.$axios({
        url: '/api/getAddress',
        method: 'POST',
        headers: {
          token:true
        }
      }).then(res => {
        this.INIT_DATA(res.data)
      })
    },
    // 编辑地址
    editAddress(option) {
      this.$router.push({
        name: 'PathEdit',
        params: {
          key: JSON.stringify(option),
        }
      });

    }
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      new BetterScroll(this.$refs.address, {
        probeType: 3,
        bounce: false, // 取消回弹效果
        click: true
      })
    })
  }
}
</script>

<style scoped lang="scss">
section {
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F7F7F7;
  .Address {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      width: 100%;
      li {
        color: #3a3a3a;
        box-sizing: border-box;
        padding: 15px 40px;
        margin: 10px 0;
        background-color: #FFFFFF;
        div {
          box-sizing: border-box;
          padding: 5px 0;
        }
        .tag {
          width: 87px;
          color: sandybrown;
        }
      }
    }
    .address-detail {
      display: flex;
      text-overflow: ellipsis;
      .address {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: #ccc;
      }
    }
    .add-address {
      margin-top: 60px;
      margin-bottom: 200px;
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
}
</style>
