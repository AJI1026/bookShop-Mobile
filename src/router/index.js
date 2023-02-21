import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import List from "@/views/List";
import Cart from "@/views/Cart";
import My from "@/views/My";
import Search from "@/views/Search/Search";
import SearchList from "@/views/Search/Search-list";
import SearchIndex from "@/views/Search/Search-index";
import Detail from "@/views/Detail";
import Login from "@/views/login/Login";
import UserLogin from "@/views/login/userLogin";
import Register from "@/views/login/Register";
import Agreement from "@/views/login/Agreement";
import RecoveryIndex from "@/views/recovery/RecoveryIndex";
import RecoveryBtn from "@/views/recovery/RecoveryBtn";
import Recovery from "@/views/recovery/Recovery";
import Path from "@/views/Path";
import PathIndex from "@/views/path/PathIndex";
import PathEdit from "@/views/path/PathEdit";

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
        meta: {
            keepalive: true,
        }
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
        component: Search,
        children: [
            {
                path : "/",
                name: "SearchIndex",
                component: SearchIndex,
            },
            {
                path : "/searchList",
                name: "SearchList",
                component: SearchList,
            },
        ]
    },
    // 详情页
    {
        path : "/detail",
        name: "Detail",
        component: Detail,
        meta: {
            keepalive: true,
        }
    },
    // 登录页
    {
        path : "/login",
        name: "Login",
        component: Login,
    },
    // 用户登录
    {
        path : "/userLogin",
        name: "UserLogin",
        component: UserLogin,
    },
    // 用户注册
    {
        path : "/register",
        name: "Register",
        component: Register,
    },
    // 协议页面
    {
        path : "/agreement",
        name: "Agreement",
        component: Agreement,
    },
    // 密码恢复
    {
        path : "/recovery",
        children: [
            {
                path : "/",
                name: "RecoveryIndex",
                component: RecoveryIndex,
            },
            {
                path : "/recoveryBtn",
                name: "RecoveryBtn",
                component: RecoveryBtn,
            },
        ],
        component: Recovery,
    },
    // 地址管理
    {
        path : "/path",
        component: Path,
        children: [
            {
                path : "/",
                name: "PathIndex",
                component: PathIndex,
            },
            {
                path : "/pathEdit",
                name: "PathEdit",
                component: PathEdit,
            },
        ]
    },
]

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});
export default router;
