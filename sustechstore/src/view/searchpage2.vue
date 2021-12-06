<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 50px;"></div>
    <el-container>
      <el-aside width="300px">
        <searchfilter @getFilterGoods="getFilterGoods"></searchfilter>
      </el-aside>
      <el-divider direction="vertical"></el-divider>
      <el-main width="100%">
        <searchbody ref="mybody"></searchbody>
      </el-main>
    </el-container>

  </div>

</template>

<script>
import searchnavigator from "../components/wholenavigator";
import searchfilter from "../components/searchpage2/searchfilter";
import searchbody from "../components/searchpage2/searchbody";
import axios from "axios";
import {store} from "../store/store";

export default {
  name: "searchpage2",
  methods: {
    getFilterGoods(cate) {
      console.log(cate);
      this.$refs.mybody.getFilterGoods(cate);
    }
  },
  mounted(){
    axios.defaults.headers.common['satoken'] = store.state.token;
  },
  components: {searchnavigator, searchfilter, searchbody}
}
</script>

<style scoped>

</style>
