<template>
  <div class="main">
    <el-row>
      <div v-if="haveimage">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-image :src="imgurl" class="image" :preview-src-list="[imgurl]"></el-image>
          <div class="bottom clearfix" style="height: 100px;">
            <el-row>
              <span class="title"><slot name="title"></slot></span>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                :open-delay="200"
                content="He/She is so lazy that he/she doesn't write anything.">
                <i class="el-icon-info detail" slot="reference"></i>
              </el-popover>
              <i class="el-icon-goods detail " @click="toCart"></i>
            </el-row>
            <el-row>
              <span style="margin:10px 1px;float: left;font-size:12px;"><slot name="intro"></slot></span>
            </el-row>
          </div>
        </el-card>
      </div>
      <div v-if="!haveimage">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height: 15px;">
            <span class="title" style="margin-left:0;">
              <slot name="title"></slot>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                :open-delay="200"
                content="He/She is so lazy that he/she doesn't write anything.">
                <i class="el-icon-info detail" slot="reference"></i>
              </el-popover>
              <i class="el-icon-goods detail " @click="toCart" ></i>
            </span>
          </div>
          <div v-for="o in 10" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>

        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'exhibition',
  props: ['imgurl', 'msg']
  ,
  data() {
    return {
      test: ""
    }
  },
  methods:{
    toCart(){
      this.$router.push('/shoppingcart')
    }
  },
  computed: {
    haveimage() {
      return this.imgurl !== '';
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
}


.el-card {
  width: 230px;
  max-height: 300px;
}

.image {
  width: 100%;
  height: 200px;
}

.title {
  font-weight: bold;
  float: left;
  margin-left: 5px;

}

.bottom {
  margin-top: 13px;
}


.image {
  width: 100%;
  display: block;
}

.detail {
  float: right;
  font-size: 20px;
  cursor: pointer;
  color: grey;
  margin: 5px 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
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
