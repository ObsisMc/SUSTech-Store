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
      sellerId: 0
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
        })
      } else if (this.$route.params.category === 1) {
        axios.get(store.state.database + 'errand/findErrandVOById/' + this.$route.params.id).then(response => {
          // this.cost = response.data.cost;
          console.log(response.data)
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
    alert(this.uid);
  },
  computed: {
    tips: function () {
      if (this.$route.params.category === 0) {
        return "等待卖家发货";
      } else {
        return "等待顾客确认";
      }
    }
  }
}
</script>

<style scoped>

</style>
