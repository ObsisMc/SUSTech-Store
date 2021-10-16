<template>
  <div>
    <el-row>
      <el-col :span="6"><i class="el-icon-eleme" id="mainicon"/>南科大跳蚤市场</el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          style="width:300px"
          size="small"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button icon="el-icon-goods" type="warning" size="normal" circle ></el-button>
      </el-col>
      <el-col :span="6">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/'}">个人界面</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "mainhead",
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.el-row {
  line-height: 30px;
}
.el-breadcrumb,#mainicon {
  line-height: 30px;
}

</style>
