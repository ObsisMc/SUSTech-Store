<template>
  <div>
    <el-row :gutter="20" class="outrow">
      <el-col :span="6">
        <el-image
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
      <el-col :span="5">
        <el-row>
          <el-badge :value="12" class="tip roughdetail">
            <i class="el-icon-chat-dot-round " style="font-size: 30px;"></i>
          </el-badge>
        </el-row>
      </el-col>
      <el-col :span="5">
        <span class="">RMB 200</span>
      </el-col>
      <el-col :span="2">
        <i class="el-icon-close" style="cursor: pointer;"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "cartitem"
}
</script>

<style scoped>
.el-image {
  border-radius: 30px;
  width: 150px;
  height: 150px;
}

.outrow {
  margin-bottom: 30px;
}

.goodtitle {
  float: left;
}

.roughdetail {
  float: left;
  margin-top: 15px;
}
.tip{

}
</style>
