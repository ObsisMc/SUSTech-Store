<template>
  <div>
    <div v-if="uid===sellerId">
      <el-button type="primary" @click="centerDialogVisible = true">确认发货<i class="el-icon-s-claim"></i></el-button>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>点击确认代表您已经确认了买家的订单</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlePay()">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <div v-if="buyerId===uid">
      <el-alert
        title="等待卖家发货"
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
      sellerId: 0
    };
  },
  methods: {
    handlePay() {
      this.loading = true;
      let noworderid = this.$route.query.orderid;
      console.log("wait..");
      axios.put(store.state.database + "order/confirmById/" + noworderid).then(response => {
        this.loading = false;
        this.$emit("nextStatus");
      })
    },
    getOrder() {
      axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
        // this.cost = response.data.cost;
        this.buyerId = response.data.buyerId;
        this.sellerId = response.data.sellerId;
      })
    },
    returnMain() {
      this.$router.push({name: "main"})
    }, backSelf() {
      this.$router.push({name: "selfpage"});
    },
  },
  mounted() {
    this.getOrder();
  }
}
</script>

<style scoped>

</style>
