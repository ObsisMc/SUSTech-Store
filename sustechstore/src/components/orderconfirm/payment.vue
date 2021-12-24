<template>
  <div>
    <el-row>
      <span style="font-size: 30px;">Account payable: ¥ {{ price }}</span>
    </el-row>
    <countdown deadline="2021-12-11 10:00:00" :showDays="false"></countdown>
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


    <el-button @click="getInfo"></el-button>
  </div>
</template>

<script>
import Countdown from "./countdown";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "payment",
  data() {
    return {
      paymode: 0,
      price: 1000.5,
      activeName: 'vc',
      balance: 10000,
      qrto: 'https://www.baidu.com/',
      loading: false
    }
  },
  methods: {
    handleClick() {

    },
    handlePay() {
      if (this.balance < this.price) {
        alert("No enough balance.");
      } else {
        this.loading = true;
        let nextstatus = parseInt(this.$route.query.status) + 1;
        let noworderid = this.$route.query.orderid;
        axios.put(store.state.database + "order/payById/" + noworderid).then(response => {
          if (response.status === 200) {
            this.$router.push({
              path: '/checkout/' + this.$route.params.id + '/' + nextstatus,
              query: {status: nextstatus, orderid: noworderid}
            });
            this.loading = false;
          } else {
            this.$router.push({name: 'shoppningcart'});
            alert("Error happens!");
          }
        })
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
    },
    getInfo() {
      let balanceurl = store.state.database + "user/userInfo";
      axios.get(balanceurl).then(response => {
        this.balance = response.data.balance;
      })
      // let priceurl = store.state.database+"user/userInfo";
      // axios.get(balanceurl).then(response=>{
      //   this.balance = response.data.balance;
      // })
    }
  },
  // watch: {
  //   '$route.path': function (newVal, oldVal) {
  //     alert("in");
  //     console.log(this.$route.query)
  //   }
  // },
  components: {Countdown}
}
</script>

<style scoped>
flip-countdown.flip-card[data-v-cff81de8] {
  font-size: 1.8rem;
}
</style>
