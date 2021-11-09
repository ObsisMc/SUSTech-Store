<template>
  <div class="infinite-list-wrapper">
    <el-row v-for="o1 in Math.ceil(goods.good.length/goods.col)" :key="o1" :gutter="20">
      <el-col :span="24/goods.col"
              v-for="o2 in o1*goods.col>goods.good.length?goods.good.length-(o1-1)*goods.col:goods.col"
              :key="o2" >
        <singlegood :imgurl="goods.good[(o1-1)*goods.col + o2 - 1].url" >
          <template v-slot:title>
            {{ goods.good[(o1 - 1) * goods.col + o2 - 1].title }}
          </template>
          <template v-slot:intro>
            {{ goods.good[(o1 - 1) * goods.col + o2 - 1].intro }}
          </template>
        </singlegood>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Singlegood from "./singlegood";

export default {
  name: "mainpagegoodlist",
  components: {Singlegood},
  data(){
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
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom:20px;
}
.infinite-list-wrapper{
  /*overflow:auto;*/
}

</style>
