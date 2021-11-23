<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 50px;"></div>
    <el-container>
      <el-aside width="300px" >
        <searchfilter></searchfilter>
      </el-aside>
      <el-divider direction="vertical"></el-divider>
      <el-main width="100%">
        <searchbody></searchbody>
      </el-main>
    </el-container>

  </div>

</template>

<script>
import searchnavigator from "../components/searchpage2/searchnavigator";
import searchfilter from "../components/searchpage2/searchfilter";
import searchbody from "../components/searchpage2/searchbody";
export default {
  name: "searchpage2",
  components:{searchnavigator,searchfilter,searchbody}
}
</script>

<style scoped>

</style>
