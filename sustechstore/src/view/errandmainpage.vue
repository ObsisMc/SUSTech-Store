<template>
  <div>
    <wholenavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></wholenavigator>
    <div style="height: 60px;"></div>

    <el-row>
      <errandsearchheader></errandsearchheader>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3" style="border:0.1px solid transparent;"></el-col>
      <el-col v-for="o1 in 3" :key="o1" :span="6" style="background-color: #99a9bf">
        <span>hi</span>
      </el-col>
      <el-col :span="3" style="border:0.1px solid transparent;"></el-col>
    </el-row>
    <errandproduct></errandproduct>
  </div>

</template>

<script>
import wholenavigator from "../components/wholenavigator";
import Errandproduct from "../components/errandmain/errandproduct";
import Errandsearchheader from "../components/errandmain/errandsearchheader";
import axios from "axios";
import {store} from "../store/store";

export default {
  name: "errandmainpage",
  data(){
    return{

    }

  },
  methods:{

  },
  components: {Errandsearchheader, Errandproduct, wholenavigator}
}
</script>

<style scoped>

</style>
