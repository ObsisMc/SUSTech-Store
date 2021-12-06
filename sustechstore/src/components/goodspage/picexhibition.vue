<template>
<div>
  <el-row style="margin-top: 20px;">
    <el-col :span="2" style="border:1px solid transparent;"></el-col>
    <el-col :span="12" style="">
      <el-image :src="imgurl" alt="失败" :preview-src-list="[imgurl]"
                fit="cover" style=""></el-image>
    </el-col>
    <el-col :span="8">

    </el-col>
  </el-row>
  <el-row style="margin-top: 20px;">
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="12">
        <span style="float: left; font-weight: bold;">Related Product:</span>
      </el-col>
    </el-row>
    <el-row>

    </el-row>
  </el-row>

</div>
</template>

<script>
export default {
  name: "picexhibition",
  props: ["imgurl"],
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.el-image {
  /*border-radius: 30px;*/
  width: 300px;
  height: 300px;
}
</style>
