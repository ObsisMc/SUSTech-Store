<template>
  <div>
    <el-row id="inner">
      <el-col :span="6"><i class="el-icon-eleme" id="mainicon"/>南科大跳蚤市场</el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          style="width:300px"
          size="small"
          clearable>
        </el-input>
        <router-link to="/search">
          <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </router-link>
        <el-button icon="el-icon-goods" type="warning" size="normal" circle></el-button>
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
#inner {
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}

.el-row {
  line-height: 30px;
}

.el-breadcrumb, #mainicon {
  line-height: 30px;
}

</style>
