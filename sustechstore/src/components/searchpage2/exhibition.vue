<template>
  <div class="main">
    <el-row>
      <div v-if="haveimage">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-image :src="imgurl" class="image" :preview-src-list="[imgurl]"></el-image>
          <div class="bottom clearfix" style="height: 100px;">
            <el-row>
              <el-col :span="16">
                <el-col :span="12">
                  <span class="title"><slot name="title"></slot></span>
                </el-col>
                <el-col :span="12">
               <span style=" font-size: 18px;  float: left;">
                  ¥ <slot name="price"></slot>
              </span>
                </el-col>
              </el-col>
              <el-col :span="8">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :open-delay="200">
                  <i class="el-icon-info detail" slot="reference"></i>
                  <i class="el-icon-user-solid" style="font-size:15px;"></i>
                  <span style="font-weight: bold;font-size: 15px;"><slot name="username">unamed</slot></span>
                  <el-divider style="margin:0;"></el-divider>
                  <slot name="intro">He or she is so lazy and there is nothing.</slot>
                </el-popover>
                <i class="el-icon-goods detail " @click="toGood"></i>
              </el-col>
            </el-row>
            <el-row>
              <span style="margin:10px 1px;font-size:12px;"><slot name="intro">He/She is so lazy and doesn't write anything.</slot></span>
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
                :open-delay="200">
                <i class="el-icon-info detail" slot="reference"></i>
                <i class="el-icon-user-solid" style="font-size:15px;"></i>
                <span style="font-weight: bold;font-size: 15px;"><slot name="username">unamed</slot></span>
                <el-divider style="margin:0;"></el-divider>
                <slot name="intro">He or she is so lazy and there is nothing.</slot>
              </el-popover>
              <i class="el-icon-goods detail " @click="toGood"></i>
            </span>
          </div>
          <div style=" overflow-y: auto;height: 220px;" class="textmsg">
            <div v-for="o in 10" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </div>


        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'exhibition',
  props: ['imgurl', 'msg', 'id']
  ,
  data() {
    return {
      test: ""
    }
  },
  methods: {
    toGood() {
      this.$router.push({name: 'product', query: {id: this.id}});
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
  margin: 5px 5px;
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

/deep/ .el-divider--horizontal {
  margin: 5px 0;
}

/deep/ .el-card__header {
  /*padding:0 18px;*/
}

.textmsg::-webkit-scrollbar {
  width: 0 !important
}


</style>
