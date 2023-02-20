import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
// 引入公共css文件
import '@/assets/css/main.css';
// 引入字体图标
import '@/assets/css/iconfont.css'
// 引入适配文件
import 'lib-flexible';
// 引入导航插件
import LyTab from 'ly-tab';
Vue.use(LyTab);
// 引入加载
import { Lazyload, Indicator } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Lazyload);
Vue.use(Indicator);
// 全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
