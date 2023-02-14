// 加载提示框
// axios 二次封装
import { Indicator } from 'mint-ui';
import axios from "axios";
export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
    },
    $axios( options={} ) {
        options.method = options.method || this.common.method;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;

        // 请求显示加载中
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });

        return axios(options).then(v => {
            let data = v.data.data;
            return new Promise((res, rej) => {
                if(!v) return rej();
                // 关闭加载中
                setTimeout(() => {
                    Indicator.close();
                }, 500)
                res(data);
            })
        })
    }
}
