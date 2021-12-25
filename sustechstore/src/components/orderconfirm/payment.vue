<template>
  <div>
    <el-row>
      <span style="font-size: 30px;">Account payable: ¥ {{ cost }}</span>
    </el-row>
    <countdown :deadline="expireTime" :showDays="false"></countdown>
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
import Countdown from "./countdown";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "payment",
  data() {
    return {
      paymode: 0,
      cost: 1000.5,
      expireTime: '2021-12-26 10:00:00',
      activeName: 'vc',
      balance: 0,
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
        let noworderid = this.$route.query.orderid;
        axios.put(store.state.database + "order/payById/" + noworderid).then(response => {
          if (response.status === 200) {
            this.loading = false;
            this.$message({
              message: "Pay successfully",
              type: "success"
            })
            this.$emit("nextStatus");
          } else {
            this.$router.push({name: 'shoppningcart'});
            this.$message({
              message: "Fail to submit order",
              type: "error"
            })
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
    },
    getOrder() {
      axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
        this.cost = response.data.cost;
        let time = response.data.expireTime.split("T")
        this.expireTime = time[0] + " " + time[1];
        alert(this.expireTime);
      })
    },
    format() {
      alert(this.endtime);
    }
  },
  mounted() {
    this.getInfo();
    this.getOrder();
  },
  components: {Countdown}
}
</script>

<style scoped>
flip-countdown.flip-card[data-v-cff81de8] {
  font-size: 1.8rem;
}
</style>
