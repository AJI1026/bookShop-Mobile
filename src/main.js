import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
// 引入公共css文件
import '@/assets/css/main.css';
// 引入字体图标
import '@/assets/css/iconfont.css'
// 引入适配文件
import 'lib-flexible';
// 引入导航插件
import LyTab from 'ly-tab';
Vue.use(LyTab);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
