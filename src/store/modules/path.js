import { INIT_DATA } from "@/store/modules/mutations-types";

export default {
    state : {
        list: []
    },
    getters: {

    },
    mutations : {
        [INIT_DATA](state, arr) {
            state.list = arr;
        }
    },
    actions : {

    }
}
