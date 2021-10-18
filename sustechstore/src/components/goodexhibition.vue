<template>
  <div class="main">
    <el-row>
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <div slot="header" class="clearfix">
          <span><slot name="title">no title</slot></span>
          <el-button type="text" class="button" style="float: right;">操作按钮</el-button>
        </div>
        <img :src="imgurl"  class="image">
        <div class="bottom clearfix" style="height: 100px;">
          <span><slot name="intro"></slot></span>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'goodexhibition',
  props: ['imgurl']
  ,
  data() {
    return {
      test: ""
    }
  },
}
</script>

<style scoped>
.main {
  width: 100%;
}

.el-card {
  width: 200px;
  /*height:300px;*/
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
