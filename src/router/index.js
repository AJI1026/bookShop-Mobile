import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import List from "@/views/List";
import Cart from "@/views/Cart";
import My from "@/views/My";

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
    {
        path : "/home",
        name: "Home",
        component: Home,
    },
    {
        path : "/list",
        name: "List",
        component: List,
    },
    {
        path : "/cart",
        name: "Cart",
        component: Cart,
    },
    {
        path : "/my",
        name: "My",
        component: My,
    },
]

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});
export default router;
