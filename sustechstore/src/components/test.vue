<template>
  <div>
    <!--    <Map></Map>-->
    <!--    <el-popover-->
    <!--      placement="top-start"-->
    <!--      title="标题"-->
    <!--      width="200"-->
    <!--      trigger="hover"-->
    <!--      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
    <!--      <el-button id="litchi" icon="el-icon-location-information" type="primary" size="mini" circle></el-button>-->
    <!--    </el-popover>-->
    <!--    <wholenavigator id="wna"></wholenavigator>-->
    <!--    <searchhead></searchhead>-->
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
import CollapsePanel from "./searchpage/CollapsePanel";
import GoodCard from "./mainage/GoodCard";
import Infinitelist from "./mainage/Infinitelist";
import searchhead from "./searchpage/searchhead";
import Map from "./mainage/Map";
import wholenavigator from "./wholenavigator";
import Wholenavigator from "./wholenavigator";
import searchbody from "./searchpage/searchbody";
import Searchbody from "./searchpage2/searchbody";
import Splitpage from "./searchpage/splitpage";
import Goodexhibition from "./searchpage/goodexhibition";
import Searchnavigator from "./searchpage2/searchnavigator";
import Searchfilter from "./searchpage2/searchfilter";
import Mainfilter from "./newmainpage/mainfilter";
import Singlegood from "./newmainpage/singlegood";
import Mainpagegoodlist from "./newmainpage/mainpagegoodlist";
import navigator from "./mainage/navigator";
import mainpageshow from "./newmainpage/mainpageshow";
import Mainpageshow from "./newmainpage/mainpageshow";
import Testlist from "./newmainpage/testlist";


export default {
  name: "test",
  components: {
    Testlist,
    Mainpageshow,
    Mainpagegoodlist,
    Singlegood,
    Mainfilter,
    Searchfilter,
    Searchnavigator,
    Goodexhibition,
    Splitpage, Searchbody, Wholenavigator, GoodCard, CollapsePanel, Infinitelist, Map, searchhead, navigator
  },
  methods: {
    testbutton() {
    }
  }
}
</script>

<style scoped>
#nvgtr {
  position: fixed;
}

.el-breadcrumb {
  line-height: 30px;
}

#wna {
  /*height: 10px;*/
}

/deep/ .el-divider--vertical {
  height: 720px;
}

.clearfix:before,.clearfix:after{content:"";display:table;}
.clearfix:after{clear:both;}
.clearfix{zoom:1}

</style>
