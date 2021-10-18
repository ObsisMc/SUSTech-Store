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
    <searchhead></searchhead>
    <searchbody></searchbody>
    <CollapsePanel></CollapsePanel>
    <splitpage></splitpage>
    <goodexhibition></goodexhibition>
    <el-row v-for="o1 in Math.ceil(9/4)" :key="o1">
      <el-col span="6" v-for="o2 in 4" :key="o2">
        <li>{{o1*4+o2-5}}</li>
      </el-col>
    </el-row>
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
import Searchbody from "./searchpage/searchbody";
import Splitpage from "./searchpage/splitpage";
import Goodexhibition from "./searchpage/goodexhibition";

export default {
  name: "test",
  components: {
    Goodexhibition,
    Splitpage, Searchbody, Wholenavigator, GoodCard, CollapsePanel, Infinitelist, Map,searchhead
  },
  methods:{
    testbutton(){
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  line-height: 30px;
}
#wna{
  /*height: 10px;*/
}

</style>
