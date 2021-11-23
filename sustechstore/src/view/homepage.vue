<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 50px;"></div>
    <mainpageshow></mainpageshow>
    <el-container>
      <el-aside width="50px">
      </el-aside>
      <el-main >
        <mainfilter></mainfilter>
        <br/>
        <mainpagegoodlist style="margin: 10px 20px;" ></mainpagegoodlist>
      </el-main>
      <el-aside width="50px"></el-aside>
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
  components: {Mainpageshow, Mainpagegoodlist, Mainfilter, Searchnavigator},
  data(){
    return {
      goodlistloading: true
    }
  },
  methods:{

  }
}
</script>
<style scoped>

</style>
