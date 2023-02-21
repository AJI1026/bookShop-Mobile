import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, CHECK_EACH } from "@/store/modules/mutations-types";
import {Dialog, Toast} from "vant";
import http from "@/common/api/request";

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
            state.selectList = [];
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
            if(i > -1) {
                return state.selectList.splice(i,1);
            }
            // 如果没有，就添加
            state.selectList.push(id);
        },
        // 删除
        delGoods(state) {
            state.list = state.list.filter(v => {
                return state.selectList.indexOf(v.id) === -1
            })
        },
    },
    actions : {
        // 切换全选状态
        checkAllFn({commit, getters}) {
            getters.isCheckedAll ? commit('UN_CHECK_ALL') : commit('CHECK_ALL');
        },
        delGoodsFn({commit, state}, id) {
            // 如果没有选中，则提示信息
            if(state.selectList.length === 0) {
                Toast('请选择商品')
            } else {
                let arrCart = [];
                Dialog.confirm({
                    message: '确定要删除该技能书吗？',
                }).then(() => {
                    if(typeof id === 'number') {
                        // 单个删除
                        arrCart = [id];
                        let index = state.list.findIndex(v => {
                            return v.id === id
                        })
                        state.list.splice(index,1);
                        // 全不选
                        commit('UN_CHECK_ALL');
                    } else {
                        // 多选删除
                        arrCart = state.selectList;
                        commit('delGoods');
                        // 全不选
                        commit('UN_CHECK_ALL');
                    }
                    http.$axios({
                        url: '/api/deleteCart',
                        method: 'POST',
                        data: {
                            arrId: arrCart,
                        }
                    }).then(res => {
                        if(res.success) {
                            Toast(res.message);
                        }
                    })
                })
            }

        },
    }
}
