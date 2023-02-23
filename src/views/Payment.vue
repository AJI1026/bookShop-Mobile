<template>
  <div class="payment">
    支付了
  </div>
</template>

<script>
import http from '@/common/api/request';
import qs from 'qs';

export default {
  name: "Payment-container",
  methods: {
    getData() {
      let data = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no,
      }

      http.$axios({
        url: '/api/successPayment',
        method: 'POST',
        headers: {
          token: true,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
      }).then(res => {
        console.log(res);
      })
    },
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped lang="scss">

</style>
