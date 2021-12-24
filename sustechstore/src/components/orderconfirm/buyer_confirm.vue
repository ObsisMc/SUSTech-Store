<template>
  <div>
    <!--    <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>-->

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
<!--      <el-row @click="handlePay()">-->
        确定
      <!--      </el-row>-->
    </el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {store} from "../../store/store";
export default {
  name: "buyer_confirm",
  data() {
    return {
      centerDialogVisible: false
    };
  },
  methods: {
    handlePay() {
      this.loading = true;
      let nextstatus = parseInt(this.$route.query.status) + 1;
      let noworderid = this.$route.query.orderid;
      axios.put(store.state.database + "order/close/" + noworderid).then(response => {
        this.$router.push({
          path: '/checkout/' + this.$route.params.id + '/' + nextstatus,
          query: {status: nextstatus}
        });
        this.loading = false;
        this.$message({
          message: "Confirm receipt successfully",
          type: "success"
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
