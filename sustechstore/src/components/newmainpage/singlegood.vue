<template>
  <div class="main">
    <el-row>
      <el-row>
        <div v-if="haveimage" @click="toGood" style="cursor: pointer;">
          <el-image :src="imgurl" class="image"></el-image>
        </div>
        <div v-if=!haveimage @click="toGood" style="cursor: pointer;">
          <div :style="{backgroundImage: color, backgroundSize:'contain'}"
               class="textshow">
        <span>
          <slot name="description">There is nothing</slot>
        </span>
          </div>
        </div>
      </el-row>
      <el-row>
        <el-col :span="16">
      <span class="info">
        <span style=" font-size: 15px;">
          <slot name="title"></slot>
        </span>

        <span style=" font-size: 15px; margin-left: 20px; ">
            ¥ <slot name="price"></slot>
        </span>

      </span>
        </el-col>
        <el-col :span="8">
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            :open-delay="200">
            <i class="el-icon-info detail" slot="reference"></i>
            <el-row>
              <div @click="toOthers" style="float: left;">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           size="medium" style="cursor: pointer;"></el-avatar>
              </div>
              <span class="roughdetail" style="margin-left: 10px;">
                <span style="font-weight: bold;font-size: 15px; float: left;margin-top:10px;">
              <slot name="username"></slot>
            </span>
              </span>

            </el-row>
            <!--            <el-divider style="margin:0;"></el-divider>-->
            <div class="divider"></div>
            <slot name="intro">He or she is so lazy and there is nothing.</slot>
          </el-popover>
          <i class="el-icon-goods detail " @click="toGood"></i>
        </el-col>

      </el-row>
    </el-row>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "singlegood",
  props: ['imgurl', 'msg', 'id'],
  data() {
    return {
      test: "",
      color: null
    }
  },
  methods: {
    toGood() {
      this.$router.push({
        name: 'product',
        query: {id: this.id}
      });
      // window.open(goodpage.href, '_blank');
      // this.$router.push({name: 'product', query: {id: this.id}});
    },
    toOthers() {
      this.$router.push({name: "otherpage"});
    }
  },
  computed: {
    haveimage() {
      return this.imgurl !== "";
    }
  },
  mounted() {
    if (this.imgurl === '') {
      console.log("into")
      console.log(this.imgurl)
      axios.get("@/../static/color_gradient.json").then(response => {
        let len = Object.keys(response.data).length;
        this.color = response.data[Math.floor(Math.random() * len)].color;
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

.textshow {
  width: 250px;
  height: 180px;
  padding: 15px;
  border-radius: 20px;
  overflow: auto;
  word-wrap: break-word;
  word-break: normal;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.info {
  float: left;
  margin: 10px 0;
}

.detail {
  float: right;
  font-size: 20px;
  cursor: pointer;
  color: grey;
  margin: 10px 5px;
}

.detail:hover {
  color: #99a9bf;
}

.textshow::-webkit-scrollbar {
  display: none;
}

.divider {
  border: 0.5px solid silver;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 5px;
  height: 0.5px;
}


</style>
