<template>
<div class="outerdiv">
  <el-row v-for="i in 6" :key="i">
    <cartitem></cartitem>
  </el-row>
</div>
</template>

<script>
import Cartitem from "./cartitem";
export default {
  name: "cartlist",
  components: {Cartitem}
}
</script>

<style scoped>
.outerdiv {
  height:580px;
  overflow-y: auto;
  overflow-x:hidden;
}
</style>
