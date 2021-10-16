<template>
  <div>
    <!--    <GoodCard></GoodCard>-->
    <Map></Map>
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button id="litchi" icon="el-icon-location-information" type="primary" size="mini" circle></el-button>
    </el-popover>
    <!--    <div id="testdiv" >-->
    <!--      ssssssssssssssssssssssssssssssss-->
    <!--    </div>-->
    <!--    <CollapsePanel></CollapsePanel>-->
  </div>

</template>

<script>
import CollapsePanel from "./CollapsePanel";
import GoodCard from "./GoodCard";
import Infinitelist from "./Infinitelist";
import Map from "./Map";

export default {
  name: "test",
  components: {GoodCard, CollapsePanel, Infinitelist, Map}
}
</script>

<style scoped>
.el-breadcrumb {
  line-height: 30px;
}

</style>
