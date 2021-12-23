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
  </div>
</template>

<script>
import Countdown from "./countdown";
import axios from "axios";

export default {
  name: "payment",
  data() {
    return {
      paymode: 0,
      price: 1000.5,
      activeName: 'vc',
      balance: 100,
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
        let noworderid = this.$route.params.id;
        setTimeout(() => {
          console.log("wait..");
          this.$router.push({path: '/checkout/' + noworderid + '/' + nextstatus, query: {status: nextstatus}});
          this.loading = false;
        }, 1000)
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
  watch: {
    $route(to){
      alert("in payment")
      if(to.name==="payment"){
        alert("into")
        let getbalanceurl = store.state.database +"user/userInfo";
        // axios.get(getbalanceurl).then(response=>{
        //   this.balance=response.data.balance;
        //   console.log(response.data.balance);
        // })
        alert("out")
        // let getorderurl = store.state.database+"";
        // axios.get(getorderurl).then(response=>{
        //
        // })
        next();
      }
    }
  },
  components: {Countdown}
}
</script>

<style scoped>
flip-countdown.flip-card[data-v-cff81de8] {
  font-size: 1.8rem;
}
</style>
