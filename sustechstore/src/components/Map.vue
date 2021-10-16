<template>
  <div id="mapdiv">
<!--    <el-popover-->
<!--      v-for="(key,name,num) in place"-->
<!--      :key="key"-->
<!--      placement="top"-->
<!--      :title="name"-->
<!--      width="200"-->
<!--      trigger="hover"-->
<!--      :content="num">-->
<!--      <el-button :id="key" slot="reference" icon="el-icon-location-information" size="mini" type="primary"-->
<!--                 circle></el-button>-->
<!--    </el-popover>-->
<!--  </div>-->
            <el-popover
              placement="top"
              title="荔园"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="litchi" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>
            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="dorm2" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>


            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="lakedorm" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>
            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="innovdorm" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>
            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="gateone" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>
            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="gateseven" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>
            <el-popover
              placement="top"
              title="二期新生宿舍"
              width="200"
              trigger="hover"
              content="人数：?">
              <el-button id="engineer" slot="reference" icon="el-icon-location-information" size="mini" type="primary"
                         circle></el-button>
            </el-popover>

  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      place: [
        {key: "litchi", name: "荔园", num: 1},
        {key: "dorm2", name: "二期新生宿舍", num: 2},
        {key: "lakedorm", name: "湖畔", num: 3},
        {key: "innovdorm", name: "创园宿舍", num: 4},
        {key: "gateone", name: "一号门", num: 2}
      ]
    }
  }

}
</script>

<style scoped>

#mapdiv {
  width: 780px;
  height: 500px;
  /*width: 850px;*/
  /*height: 620px;*/
  /*background-color: black;*/
  background-image: url("../assets/map.png");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
}

#litchi {
  position: relative;
  left: 350px;
  top: 43px;
  left:-35px;
  top:35px;

}

#dorm2 {
  position: absolute;
  left: 330px;
  top: 92px;
  left: 330px;
  top: 92px;
}

#lakedorm {
  position: absolute;
  left: 300px;
  top: 130px;
}

#innovdorm {
  position: absolute;
  left: 415px;
  top: 18px;
}

#gateone {
  position: absolute;
  left: 175px;
  top: 120px;
}

#gateseven {
  position: absolute;
  left: 80px;
  top: 300px;
}

#engineer {
  position: absolute;
  left: 350px;
  top: 350px;
}
</style>
