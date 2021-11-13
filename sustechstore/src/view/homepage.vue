<template>
  <div>
    <searchnavigator></searchnavigator>
    <mainpageshow></mainpageshow>
    <el-container>
      <el-aside width="50px">
      </el-aside>
      <el-main>
        <mainfilter></mainfilter>
        <br/>
        <mainpagegoodlist style="margin: 10px 20px;"></mainpagegoodlist>
      </el-main>
      <el-aside width="50px"></el-aside>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </el-container>
  </div>
</template>

<script>
import Searchnavigator from "../components/searchpage2/searchnavigator";
import Mainfilter from "../components/newmainpage/mainfilter";
import Mainpagegoodlist from "../components/newmainpage/mainpagegoodlist";
import Mainpageshow from "../components/newmainpage/mainpageshow";

export default {
  name: "homepage",
  components: {Mainpageshow, Mainpagegoodlist, Mainfilter, Searchnavigator}
}
</script>

<style scoped>

</style>
