<template>
  <div>
    <div
      v-if="productType==null&&uid===sellerId||productType!=null&&(uid===sellerId&&producttype===0||uid===buyerId&&producttype===1) ">
      <el-button type="primary" @click="centerDialogVisible = true">
        <span v-if="productType!=null">
          确认发货
        </span >
        <span v-if="productType==null">
          确认跑腿完成
        </span>

        <i class="el-icon-s-claim"></i></el-button>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span v-if="producttype===0">点击确认代表您已经确认了买家的订单</span>
        <span v-if="producttype===1">点击确认代表您已经确认了求购者的订单</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlePay()">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <div v-if="productType==null&&uid===buyerId||productType!=null&&(uid===buyerId&&producttype===0||uid===sellerId&&producttype===1)">
      <el-alert
        :title="tips"
        type="info"
        style="height: 50px;"
        center
        show-icon>
      </el-alert>
      <br/>
      <el-button type="primary" @click="backSelf">
        返回个人主页
      </el-button>
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
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "merchant_confirm",
  props: ["uid"],
  data() {
    return {
      centerDialogVisible: false,
      buyerId: 0,
      sellerId: 0,
      productType: null
    };
  },
  methods: {
    handlePay() {
      this.loading = true;
      let cate = this.$route.params.category;
      let noworderid = cate === 0 ? this.$route.query.orderid : this.$route.params.id;

      console.log("wait..");
      if (cate === 0) {
        axios.put(store.state.database + "order/confirmById/" + noworderid).then(response => {
          this.loading = false;
          this.$emit("nextStatus");
        })
      } else if (cate === 1) {
        axios.put(store.state.database + "errand/confirm/" + noworderid).then(response => {
          this.loading = false;
          this.$emit("nextStatus");
        })
      }

    },
    getOrder() {
      if (this.$route.params.category === 0) {
        axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
          // this.cost = response.data.cost;
          this.buyerId = response.data.buyerId;
          this.sellerId = response.data.sellerId;
          this.productType = response.data.productType;
        })
      } else if (this.$route.params.category === 1) {
        axios.get(store.state.database + 'errand/findErrandVOById/' + this.$route.params.id).then(response => {
          // this.cost = response.data.cost;
          this.sellerId = response.data.ownerId;
          if (this.sellerId !== this.uid) {
            this.buyerId = this.uid;
          }
        })
      }

    },
    returnMain() {
      this.$router.push({name: "main"})
    }, backSelf() {
      this.$router.push({name: "selfpage"});
    },
  },
  mounted() {
    this.getOrder();

  },
  computed: {
    tips: function () {
      if (this.$route.params.category === 0) {
        return "等待卖家发货";
      } else {
        return "等待顾客确认";
      }
    },
    producttype() {
      if (this.productType === "SELL") {
        return 0;
      } else {
        return 1;
      }
    }
  }
}
</script>

<style scoped>

</style>
