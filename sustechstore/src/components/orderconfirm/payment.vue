<template>
  <div>
    <el-row>
      <span style="font-size: 30px;">Account payable: ¥ {{ cost }}</span>
    </el-row>
    <countdown :deadline="expireTime" :showDays="false" @timeElapsed="timeElapsed"></countdown>
    <div v-if="uid===buyerId&&producttype===0||uid===sellerId&&producttype===1">
      <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading"
               element-loading-text="payment processing...">
        <el-tab-pane label="Virtual coin" name="vc">
          <span>Balance: {{ balance }}</span>
          <el-button type="primary" @click="handlePay" size="mini">confirm</el-button>
        </el-tab-pane>
        <el-tab-pane label="Wechat" name="wc">
          <div id="wechatqr" ref="wechatqrref" style="margin-left:40%;"></div>
        </el-tab-pane>
        <el-tab-pane label="Alipay" name="ap">No support</el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="uid===sellerId&&producttype===0||uid===buyerId&&producttype===1">
      <el-alert
        :title="producttype===0?'等待买家付款':'等待求购者付款'"
        type="info"
        style="height: 50px;"
        center
        show-icon>
      </el-alert>
    </div>
    <div v-if="uid!==sellerId&&uid!==buyerId">
      <el-result icon="error" title="异常订单" subTitle="请返回主界面">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="returnMain">返回</el-button>
        </template>
      </el-result>
    </div>


  </div>
</template>

<script>
import Countdown from "./countdown";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "payment",
  props: ["balance", 'uid'],
  data() {
    return {
      paymode: 0,
      cost: 1000.5,
      expireTime: '2021-12-26 10:00:00',
      activeName: 'vc',
      qrto: 'https://www.baidu.com/',
      loading: false,
      buyerId: 0,
      sellerId: 0,
      productType: "SELL"
    }
  },
  methods: {
    handleClick() {

    },
    handlePay() {
      if (this.balance < this.cost) {
        this.$message({
          message: "No enough balance",
          type: "error"
        });
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
    getOrder() {
      axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
        this.cost = response.data.cost;
        this.buyerId = response.data.buyerId;
        this.sellerId = response.data.sellerId;
        this.productType = response.data.productType;
        let time = response.data.expireTime.split("T")
        this.expireTime = time[0] + " " + time[1];
      })
    },
    timeElapsed() {
      axios.delete(store.state.database + "order/deleteById/" + this.$route.query.orderid).then(response => {
        if (this.uid === this.buyerId) {
          this.$alert('该订单已过期，请重新下单', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({name: "selfpage"})
            }
          });
        } else {
          this.$alert('该订单已过期', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({name: "selfpage"})
            }

          });
        }
      })
    },
    returnMain() {
      this.$router.push({name: "main"})
    }
  },
  mounted() {
    this.getOrder();
  },
  computed: {
    producttype() {
      if (this.productType === "SELL") {
        return 0;
      } else {
        return 1;
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
