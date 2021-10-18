<template>
<div>
  <el-container>
    <el-header>
      <searchhead></searchhead>
    </el-header>
    <el-container>
      <el-aside style="width:150px;"></el-aside>
      <el-main>
        <searchbody></searchbody>
        <splitpage></splitpage>
      </el-main>
      <el-aside style="width:150px;"> </el-aside>

    </el-container>
  </el-container>
</div>
</template>

<script>
import Searchhead from "../components/searchpage/searchhead";
import Searchbody from "../components/searchpage/searchbody";
import Splitpage from "../components/searchpage/splitpage";
export default {
  name: "searchpage",
  components: {Splitpage, Searchbody, Searchhead}
}
</script>

<style scoped>
.el-aside{
  width: 100px;
}
</style>
