<template>
  <div class="infinite-list-wrapper" >
    <ul class="infinite-list"  v-infinite-scroll="load" infinite-scroll-distance="100">
      <li v-for="o1 in Math.ceil(goods.good.length/goods.col)" :key="o1">
        <el-row :gutter="30">
          <el-col :span="24/goods.col"
                  v-for="o2 in o1*goods.col>goods.good.length?goods.good.length-(o1-1)*goods.col:goods.col"
                  :key="o2">
            <singlegood :imgurl="goods.good[(o1-1)*goods.col + o2 - 1].fileName">
              <template v-slot:title>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].name }}
              </template>
              <template v-slot:intro v-if="goods.good[(o1 - 1) * goods.col + o2 - 1].description!==''">
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].description}}
              </template>
              <template v-slot:username>
                {{goods.user[(o1 - 1) * goods.col + o2 - 1].name}}
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
        good: [
          {
            "categoryleveloneId": 0,
            "categorylevelthreeId": 0,
            "categoryleveltwoId": 0,
            "description": "",
            "fileName": "",
            "id": 0,
            "name": "string",
            "ownerId": 0,
            "price": 0
          }
        ],
        user: [
          {name:'hi'}
        ],
        col: 4
      }
    }
  },
  mounted() {
    let goodsurl = 'http://10.21.64.1:8181/product/list';
    let myurl = "@/../static/goods.json";
    axios.get(goodsurl).then(response => { // 要是是动态路由，需要再加一个../
      console.log(response);
      this.goods.good = response.data;
    })
    let userurl = 'http://10.21.64.1:8181/user/findById/';
    axios.get()
  },
  methods:{
    load(){
      let newgood={
        "categoryleveloneId": 0,
        "categorylevelthreeId": 0,
        "categoryleveltwoId": 0,
        "description": "this is my ham",
        "fileName": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "id": 0,
        "name": "ham",
        "ownerId": 0,
        "price": 0
      };
      this.goods.good.push(newgood);
      this.goods.user.push({'name':'unamed'});
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
/*.infinite-list-wrapper::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/
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
