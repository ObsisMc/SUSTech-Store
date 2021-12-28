<template>
  <div>
    <div v-if="uid===buyerId&&producttype===0||uid===sellerId&&producttype===1">
      <el-button type="primary" @click="centerDialogVisible = true">确认收货<i class="el-icon-s-claim"></i></el-button>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>点击确认代表您已经收到商品</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlePay()">
        确定
    </el-button>
  </span>
      </el-dialog>
    </div>
    <div v-if="uid===sellerId&&producttype===0||uid===buyerId&&producttype===1">
      <el-alert
        :title="productType===0?'等待买家确认收货':'等待求购者确认收货'"
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
  name: "buyer_confirm",
  props: ["uid"],
  data() {
    return {
      centerDialogVisible: false,
      buyerId: 0,
      sellerId: 0,
      productType: "SELL"
    };
  },
  methods: {
    handlePay() {
      this.loading = true;
      let noworderid = this.$route.query.orderid;
      let cate = this.$route.params.category;
      if (cate === 0) {
        axios.put(store.state.database + "order/close/" + noworderid).then(response => {
          this.loading = false;
          this.$message({
            message: "Confirm receipt successfully",
            type: "success"
          });
          this.$emit("nextStatus");
        })
      } else if (cate === 1) {
        axios.put(store.state.database + "errand/confirm/" + noworderid).then(response => {
          this.loading = false;
          this.$message({
            message: "Confirm receipt successfully",
            type: "success"
          });
          this.$emit("nextStatus");
        })
      }

    },
    returnMain() {
      this.$router.push({name: "main"})
    },
    backSelf() {
      this.$router.push({name: "selfpage"});
    },
    getOrder() {
      axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
        // this.cost = response.data.cost;
        this.buyerId = response.data.buyerId;
        this.sellerId = response.data.sellerId;
        this.productType = response.data.productType;
      })
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
  }
}
</script>

<style scoped>

</style>
