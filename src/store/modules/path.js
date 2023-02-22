import { INIT_DATA } from "@/store/modules/mutations-types";

export default {
    state : {
        list: []
    },
    getters: {
        defaultPath(state) {
            return state.list.filter(v => {
                return Number(v.isDefault) === 1;
            })
        }
    },
    mutations : {
        [INIT_DATA](state, arr) {
            state.list = arr;
        }
    },
    actions : {

    }
}
