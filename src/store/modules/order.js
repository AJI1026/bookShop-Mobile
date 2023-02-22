import { INIT_ORDER } from "@/store/modules/mutations-types";

export default {
    state : {
        list: [],
    },
    getters: {

    },
    mutations : {
        [INIT_ORDER](state, orderId) {
            state.list = orderId;
        },
    },
    actions : {

    }
}
