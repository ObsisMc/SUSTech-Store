<template>
  <div @click="drawer = true">
    <el-card class="box-card" shadow="hover">
      <el-row style="text-align: left;">
        <slot name="description"></slot>
      </el-row>
      <el-row style="text-align: right; margin-top: 10px;">
        <el-avatar :size="20"
                   :src="icon"></el-avatar>
        <span>
          <slot name="nickName" >nickname</slot>
        </span>
      </el-row>

    </el-card>

    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="70%"
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
  props: ["imgurl", "id", "icon"],
  data() {
    return {
      drawer: false,
      direction: 'btt',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('Confirm close？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
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

.roughdetail {
}
</style>
