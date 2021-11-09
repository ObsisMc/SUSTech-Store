<template>
  <div class="infinite-list-wrapper">
    <ul class="infinite-list"  v-infinite-scroll="load" infinite-scroll-distance="100">
      <li v-for="o1 in Math.ceil(goods.good.length/goods.col)" :key="o1">
        <el-row :gutter="30">
          <el-col :span="24/goods.col"
                  v-for="o2 in o1*goods.col>goods.good.length?goods.good.length-(o1-1)*goods.col:goods.col"
                  :key="o2">
            <singlegood :imgurl="goods.good[(o1-1)*goods.col + o2 - 1].url">
              <template v-slot:title>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].title }}
              </template>
              <template v-slot:intro>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].intro }}
              </template>
            </singlegood>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Singlegood from "./singlegood";

export default {
  name: "mainpagegoodlist",
  components: {Singlegood},
  data() {
    return {
      goods: {
        good: null,
        col: 4
      }
    }
  },
  mounted() {
    axios.get("@/../static/goods.json").then(response => {
      this.goods.good = response.data.goods
    })
  },
  methods:{
    load(){
      let newgood={
        title: "好吃的汉堡",
        url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        intro: "I bought  too many hamburgers and I want to sell them"
      };
      this.goods.good.push(newgood);
    }
  }
}
</script>

<style scoped>
.infinite-list-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;

}
.infinite-list-wrapper::-webkit-scrollbar {
  display: none;
}
.infinite-list-wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

.infinite-list-wrapper:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}
.infinite-list-wrapper:hover::-webkit-scrollbar-thumb:hover {
  background-color: #c0cecc;
}
.infinite-list-wrapper:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(193, 193, 193, 0.79);
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}

ul {
  padding: 0 0;
}
.el-row{
  margin: 0 0;
}
</style>
