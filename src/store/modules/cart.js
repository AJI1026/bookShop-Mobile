import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, CHECK_EACH } from "@/store/modules/mutations-types";

export default {
    state: {
        list: [], // 购物车数据
        selectList: [] // 选中的数据
    },
    getters: {
        isCheckedAll(state) {
            return state.list.length === state.selectList.length
        },
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v=> {
                if(v.checked) {
                    total.num += v.goods_num;
                    total.price += v.goods_price * v.goods_num;
                }
            })
            return total;
        }
    },
    mutations : {
        [CART_LIST](state, cartArr) {
            state.list = cartArr;
            cartArr.forEach(v=> {
                state.selectList.push(v.id)
            })
        },
        // 全选
        [CHECK_ALL](state) {
            state.selectList = state.list.map(v => {
                v.checked = true;
                return v.id;
            })
        },
        // 全不选
        [UN_CHECK_ALL](state) {
            state.list.forEach(v => {
                v.checked = false;

            })
            state.selectList = [];
        },
        // 单选
        [CHECK_EACH](state, index) {
            let id = state.list[index].id
            let i = state.selectList.indexOf(id);
            // 能找到对应的id，就删除
            if(i > 1) {
                return state.selectList.splice(i,1);
            }
            // 如果没有，就添加
            state.selectList.push(id);
        },
    },
    actions : {
        checkAllFn({commit, getters}) {
            getters.isCheckedAll ? commit('UN_CHECK_ALL') : commit('CHECK_ALL');
        }
    }
}
