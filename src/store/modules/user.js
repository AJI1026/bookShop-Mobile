import { USER_LOGIN, INIT_USER } from "@/store/modules/mutations-types";

export default {
    state: {
        loginStatus: false, // 登录状态
        token: null, // token
        userInfo: {}, // 用户信息
    },
    getters: {

    },
    mutations: {
        // 设置
        [USER_LOGIN](state, user) {
            state.loginStatus = true;
            state.token = user.token;
            state.userInfo = user;
            // 持久化存储
            localStorage.setItem("userInfo", JSON.stringify(user))
        },
        // 读取本地存储数据，存在就重新给数据
        [INIT_USER](state) {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if(userInfo) {
                state.loginStatus = true;
                state.token = userInfo.token;
                state.userInfo = userInfo;
            }
        },
        // 退出登录
        loginOut(state) {
            state.loginStatus = false;
            state.token = null;
            state.userInfo = {};
            localStorage.removeItem("userInfo");
        },
    },
    actions: {

    }
}
