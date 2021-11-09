<template>
  <div class="main">
    <!--    <el-card :body-style="{ padding: '0px' }" shadow="hover">-->
    <!--      <img :src="imgurl" class="image">-->
    <!--      <div class="bottom clearfix" style="height: 100px;">-->
    <!--        <span><slot name="intro"></slot></span>-->
    <!--      </div>-->
    <!--    </el-card>-->
    <div v-if="haveimage">
      <el-image :src="imgurl" :preview-src-list="[imgurl]" class="image"></el-image>
    </div>
    <div v-if=!haveimage>
      <div :style="{backgroundImage: color, backgroundSize:'contain'}"
           class="textshow">
        <span>
          22222222222222222222222222222222222222222222222222222222222222222222222222222
          22222222222222222222222222222222222222222222222222222222222222222222222222222
          22222222222222222222222222222222222222222222222222222222222222222222222222222
          22222222222222222222222222222222222222222222222222222222222222222222222222222
        </span>
      </div>
    </div>

    <span class="info">
        <i class="el-icon-user-solid" style="font-size:25px;"></i>
        <span class="name">student 1</span>
      </span>
    <el-popover
      placement="top-start"
      width="200"
      trigger="hover"
      open-delay="200"
      content="He/She is so lazy that he/she doesn't write anything.">
      <i class="el-icon-info detail" slot="reference"></i>
    </el-popover>
    <router-link to="/search2">
      <i class="el-icon-goods detail "></i>
    </router-link>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "singlegood",
  props: ['imgurl'],
  data() {
    return {
      test: "",
      color:null
    }
  },
  methods:{
  },
  computed: {
    haveimage() {
      return this.imgurl !== "";
    }
  },
  mounted(){
    console.log(this.imgurl)

    if(this.imgurl===''){
      console.log("into")
      console.log(this.imgurl)
      axios.get("@/../static/color_gradient.json").then(response =>{
        let len = Object.keys(response.data).length;
        this.color = response.data[Math.floor(Math.random()*len)].color;

      })
    }
  }
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

.image {
  width: 280px;
  height: 210px;
  border-radius: 20px;
  object-fit: fill;
}
.textshow{
  width: 250px;
  height: 180px;
  padding:15px;
  border-radius: 20px;
  overflow: auto;
  word-wrap:break-word;

  word-break:normal;
}

.info {
  float: left;
  margin: 10px 10px;
}

.detail {
  float: right;
  font-size: 20px;
  cursor: pointer;
  color: grey;
  margin: 5px 10px;
}

.textshow::-webkit-scrollbar {
  display: none;
}

</style>
