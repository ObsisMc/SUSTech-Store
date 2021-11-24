<template>
  <div>
    <el-row>
      <span style="font-size: 30px;">Account payable: ¥ {{ price }}</span>
    </el-row>
    <!--    <FlipDown-->
    <!--      :endDate="1540212399971"-->
    <!--      @timeUp="func"-->
    <!--    />-->
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading"
             element-loading-text="payment processing...">
      <el-tab-pane label="Virtual coin" name="vc">
        <span>Balance: {{ balance }}</span>
        <el-button type="primary" @click="handlePay" size="mini">confirm</el-button>
      </el-tab-pane>
      <el-tab-pane label="Wechat" name="wc">
        <div id="wechatqr" ref="wechatqrref" style="margin-left:40%;"></div>

        <!--                id cannot contain space and other letters-->
      </el-tab-pane>
      <el-tab-pane label="Alipay" name="ap">No support</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import FlipDown from 'vue-flip-down';

import QRCode from "_qrcodejs2@0.0.2@qrcodejs2";

export default {
  name: "payment_testsubroute",
  data() {
    return {
      paymode: 0,
      price: 1000.5,
      activeName: 'vc',
      balance: 100000,
      qrto: 'https://www.baidu.com/',
      loading: false
    }
  },
  methods: {
    handleClick(){

    },
    handlePay() {
      if (this.balance < this.price) {
        alert("No enough balance.");
      } else {
        this.loading = true;
        // setTimeout(() => {
        //   console.log("wait..");
        //   // this.$router.push({path: '/checkout/' + 1, query: {status: 2}});
        //   this.$router.push('/shoppingcart');
        //   this.loading = false;
        // }, 2000)
        this.$router.push('/');
      }
    },
    createQrcode() {
      this.qr = new QRCode('wechatqr', {
        text: this.qrto, // 二维码内容
        width: 200,
        height: 200
        // colorDark: '#000000',
        // colorLight: '#ffffff',
      });
    }
  },
  mounted() {
    this.qrto = 'https://www.baidu.com/'
    this.$nextTick(() => {
      this.createQrcode()
    })
  },
  beforeRouteLeave() {
    this.activeName = 'vc';
    this.$refs.wechatqrref.innerHTML = '';
  },
  components: {}
}
</script>

<style scoped>

</style>
