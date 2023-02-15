<template>
  <div id="list-container">
    <!--头部-->
    <header>
      <div class="returns">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="search">
        <i class="iconfont icon-fangdajing"></i>
        <span>搜你喜欢的</span>
      </div>
      <div class="home">
        <i class="iconfont icon-shouye"></i>
      </div>
    </header>
    <!--主体-->
    <section>
      <div class="list-left" ref="left">
        <ul class="left-item" style="font-size: 14px">
          <li v-for="(item, index) in leftListData"
              :key="index"
              :class="{active: index===currentIndex}"
              @click="goScroll(index)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="list-right" ref="right">
        <ul>
            <li class="shop-list" v-for="(item, index) in rightListData" :key="index">
              <h2>{{item[0].name}}</h2>
              <ul class="right-content">
                <li v-for="(img, index) in item[0].list" :key="index">
                  <img :src="img.imgUrl" alt="">
                  <span>{{img.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
      </div>
    </section>
    <!--底部-->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 组件
import Tabbar from '@/components/common/Tabbar'
import http from '@/common/api/request'
// 插件
import BetterScroll from 'better-scroll'

export default {
  name: 'list-container',
  components: {
    Tabbar
  },
  computed: {
    currentIndex() {
      return this.allHeight.findIndex((item, index) => {
        return this.rightScrollY >= item && this.rightScrollY < this.allHeight[index+1]
      })
    }
  },
  data() {
    return  {
      leftListData: [], // 左侧数据
      rightListData: [], // 右侧数据
      rightScroll: '', // 右侧滑动
      allHeight: [], // 存放右侧每块数据高度
      rightScrollY: '', // 右侧滚动距离
    }
  },
  methods: {
    goScroll(index) {
      this.rightScroll.scrollTo(0, -this.allHeight[index], 500)
    }
  },
  async created() {
    http.$axios({
      url: '/api/goods/list'
    }).then(res => {
      let leftArr = [];
      let rightArr = [];
      res.forEach(item => {
        leftArr.push({
          id: item.id,
          name: item.name
        })
        rightArr.push(item.data)
      })
      this.leftListData = leftArr
      this.rightListData = rightArr

      this.$nextTick(() => {
        // 左侧滑动
        new BetterScroll(this.$refs.left, {
          click: true,
        })
        // 右侧滑动
        this.rightScroll = new BetterScroll(this.$refs.right, {
          probeType: 3,
        })
        // 统计右侧部分每块高度
        let height = 0;
        this.allHeight.push(height);
        // 右侧每块高度
        let ulHeight = this.$refs.right.getElementsByClassName('shop-list');
        // 把dom对象转换成真正的数组
        Array.from(ulHeight).forEach(h => {
          height += h.clientHeight
          this.allHeight.push(height)
        })
        // 得到右侧滚动的值，probeType默认为0
        this.rightScroll.on('scroll',(pos) => {
          this.rightScrollY = -pos.y
        })
      })
    })
  }
}
</script>

<style scoped lang="scss">
#list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background-color: sandybrown;
    padding: 10px;
    z-index: 999;
    .returns {
      padding: 0 20px;
      i {
        font-size: 40px;
        color: white;
      }
    }
    .search {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 12px;
      flex: 1;
      height: 60px;
      box-sizing: border-box;
      padding: 10px 20px;
      i {
        padding-right: 10px;
        color: #ccc;
        font-size: 30px;
      }
      span {
        color: #ccc;
      }
    }
    .home {
      padding: 0 20px;
      i {
        font-size: 40px;
        color: white;
      }
    }
  }
  section {
    display: flex;
    flex-wrap: nowrap;
    flex: 1;
    width: 100%;
    .list-left {
      width: 150px;
      background-color: white;
      color: #cccccc;
      overflow: hidden;
      height: 100vh;
      border-right: 1px solid #cccccc;
      padding-top: 20px;
      .left-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        li {
          font-size: 12px;
          box-sizing: border-box;
          padding: 5px;
          width: 100%;
          line-height: 60px;
          text-align: center;
          margin-bottom: 20px;
        }
      }
    }
    .list-right {
      flex: 1;
      box-sizing: border-box;
      padding: 20px;
      height: calc(100vh - 200px);
      .shop-list {
        text-align: center;
        h2 {
          padding: 20px;
          font-size: 12px;
        }
        .right-content {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            width: 33.3%;
            img {
              width: 160px;
              height: 200px;
            }
            span {
              width: 180px;
              font-size: 12px;
              box-sizing: border-box;
              padding: 10px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
.active {
  color: sandybrown;
  border-left: 12px solid sandybrown;
}

</style>
