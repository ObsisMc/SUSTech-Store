<template>
  <div>
    <el-row>
      <span style="font-size: 30px;">Reward: ¥ {{ price }}</span>
    </el-row>
    <el-row style="margin-top: 20px;">
      <countdown deadline="2021-12-11 10:00:00" :showDays="false"></countdown>
    </el-row>

    <el-row style="margin-top: 30px;">
      <el-alert
        title="Waiting confirmation"
        type="warning"
        center
        show-icon
        :closable="false">
      </el-alert>
    </el-row>
  </div>
</template>

<script>
import countdown from "./countdown";

export default {
  name: "errandpayment",
  data() {
    return {
      price: 100
    }
  },
  components: {countdown}
}
</script>

<style scoped>
span.el-alert__title{
  font-size: 25px;
}
</style>
