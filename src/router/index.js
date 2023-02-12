import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import List from "@/views/List";
import Cart from "@/views/Cart";
import My from "@/views/My";
import Search from "@/views/Search";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: () => {
            return {
                path : "/home",
                name: "Home",
                component: Home,
            }
        }
    },
    // 主页
    {
        path : "/home",
        name: "Home",
        component: Home,
    },
    // 分类页
    {
        path : "/list",
        name: "List",
        component: List,
    },
    // 购物车
    {
        path : "/cart",
        name: "Cart",
        component: Cart,
    },
    // 我的页面
    {
        path : "/my",
        name: "My",
        component: My,
    },
    // 搜索页面
    {
        path : "/search",
        name: "Search",
        component: Search,
    },
]

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});
export default router;
