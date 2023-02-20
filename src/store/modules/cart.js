import { CART_LIST } from "@/store/modules/mutations-types";

export default {
    state: {
        list: [],
    },
    getters: {

    },
    mutations : {
        [CART_LIST](state, cartArr) {
            state.list = cartArr
        }
    },
    actions : {

    }
}
