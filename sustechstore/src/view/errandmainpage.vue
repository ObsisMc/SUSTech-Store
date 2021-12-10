<template>
  <div>
    <wholenavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></wholenavigator>
    <div style="height: 60px;"></div>

    <el-row>
      <errandsearchheader @getAllGoods="getAllGoods" @getSearchTarget="getSearchTarget"
                          @getProductsByCate="getProductsByCate"></errandsearchheader>
    </el-row>
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="18">
        <errandcategorylist ref="tasksList"></errandcategorylist>
      </el-col>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
    </el-row>

  </div>

</template>

<script>
import wholenavigator from "../components/wholenavigator";
import Errandproduct from "../components/errandmain/errandproduct";
import Errandsearchheader from "../components/errandmain/errandsearchheader";
import axios from "axios";
import {store} from "../store/store";
import Errandcategorylist from "../components/errandmain/errandcategorylist";

export default {
  name: "errandmainpage",
  data() {
    return {}

  },
  methods: {
    getAllGoods() {
      this.$refs.tasksList.getAllGoods();
    },
    getSearchTarget([target,cate]) {
      this.$refs.tasksList.getSearchTarget([target,cate]);
    },
    getProductsByCate(idx){
      this.$refs.tasksList.getProductsByCate(idx);
    }
  },
  components: {Errandcategorylist, Errandsearchheader, Errandproduct, wholenavigator}
}
</script>

<style scoped>
/deep/ .el-divider--vertical {
  height: calc(70vh);
  margin: 5px 0;
}
</style>
