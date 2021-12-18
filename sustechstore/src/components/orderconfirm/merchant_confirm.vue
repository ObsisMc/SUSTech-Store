<template>
  <div>
<!--  <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>-->
    <el-button type="primary" @click="centerDialogVisible = true">确认发货<i class="el-icon-s-claim"></i></el-button>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span>点击确认代表您已经确认了买家的订单</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: "merchant_confirm",
  data() {
    return {
      centerDialogVisible: false
    };
  }
}
</script>

<style scoped>

</style>
