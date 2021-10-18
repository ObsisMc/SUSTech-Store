<template>
  <div class="main">
    <el-divider content-position="left">{{ title }} <el-button type="success" round  size="mini" >更多</el-button> <el-button icon="el-icon-refresh" size="mini" circle type="info"></el-button></el-divider>
    <el-row>
      <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GoodCard',
  props:{
    width:{
      type:String,
      default:"20%"
    }
  },
  data () {
    return {
      currentDate: new Date(),
      title: "学习"
    }
  },
}
</script>

<style scoped>
.main{
  width:100%;
}
.el-card {
  width:180px;
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
