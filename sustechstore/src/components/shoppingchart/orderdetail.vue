<template>
  <div>
    <div v-if="true">
      <el-image :src="require('@/assets/sustechlogo.png')"></el-image>
      <!--    <span style="color:rgb(0,63,67);">Please</span>-->
      <el-button @click="confirmOrder">confirm the order</el-button>
    </div>
    <div v-if="false">

    </div>

  </div>
</template>

<script>
export default {
  name: "orderdetail",
  data() {
    return {
      confirm: false
    }
  },
  methods: {
    confirmOrder() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
