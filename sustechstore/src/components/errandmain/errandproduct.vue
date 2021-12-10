<template>
<div @click="drawer = true">
  <el-card class="box-card" shadow="hover" >
    <slot name="description"></slot>
  </el-card>

  <el-drawer
    :visible.sync="drawer"
    :direction="direction"
    size="60%"
    :show-close="false"
    :before-close="handleClose">
    <template v-slot:title>
      title
    </template>
    <slot name="description"></slot>
  </el-drawer>
</div>
</template>

<script>
export default {
  name: "errandproduct",
  props:["imgurl","id"],
  data() {
    return {
      drawer: false,
      direction: 'btt',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;

}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {

}
</style>
