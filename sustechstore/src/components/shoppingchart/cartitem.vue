<template>
  <div class="goodcontainer">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-image
          :src="imgurl"
          fit="cover">
        </el-image>
      </el-col>
      <el-col :span="6">
        <el-row>
          <span class="goodtitle">
            <slot name="title"></slot>
          </span>
        </el-row>
        <el-row>
          <i class="el-icon-user roughdetail"> My name</i>
        </el-row>
        <el-row>
          <i class="el-icon-menu roughdetail"> study</i>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row>
          <el-badge :value="12" class="tip roughdetail">
            <i class="el-icon-chat-dot-round " style="font-size: 30px;"></i>
          </el-badge>
        </el-row>
      </el-col>
      <el-col :span="5">
        <span class="">RMB <slot name="price"></slot></span>
      </el-col>
      <el-col :span="3">
        <el-button @click="toGood">buy</el-button>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-close" style="cursor: pointer;" @click="removeGoods"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "cartitem",
  props: ['imgurl','index','id'],
  methods: {
    removeGoods() {
      this.$emit('removeGoods', this.index);
    },
    toGood() {
      this.$router.push({name:'product',query:{id:this.id}});
    }
  }
}

</script>
<style scoped>
.goodcontainer {
  padding: 5px;
  margin: 10px;
  /*background-color: #2c3e50;*/
}

.goodcontainer:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.el-image {
  border-radius: 30px;
  width: 150px;
  height: 150px;
}

.goodtitle {
  float: left;
}

.roughdetail {
  float: left;
  margin-top: 15px;
}

.tip {

}
</style>
