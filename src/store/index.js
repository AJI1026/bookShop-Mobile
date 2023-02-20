import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from './modules/user.js';
import cart from './modules/cart';

export default new Vuex.Store({
    modules: {
        user,
        cart
    }
});
