<template>
  <div id="mainpagediv">
    <el-container direction="vertical">
      <mainhead id="anchormaintop"></mainhead>
      <el-container direction="horizontal">
        <el-aside width="100px">
          <navigator id="nvgtr"> sdf</navigator>
        </el-aside>

        <el-main>
          <card></card>
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="24">
                  <GoodCard></GoodCard>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <GoodCard2></GoodCard2>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <infinitelist></infinitelist>
            </el-col>
          </el-row>
          <el-row>
            <br/>

          </el-row>
          <p1>校园实时图</p1>
          <el-row>
            <Map></Map>
          </el-row>


        </el-main>

        <el-aside width="100px">

        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import card from "../components/card";
import navigator from "../components/navigator";
import mainhead from "../components/mainhead";
import GoodCard from "../components/GoodCard";
import GoodCard2 from "../components/GoodCard2";
import AreaTitle from "../components/AreaTitle";
import Infinitelist from "../components/Infinitelist";
import Map from "../components/Map";

export default {
  name: "mainpage",
  components: {
    card, navigator, mainhead,
    GoodCard, GoodCard2, AreaTitle, Infinitelist,
    Map
  }
}
</script>

<style scoped>
#mainpagediv {
  /*background: -webkit-repeating-linear-gradient(top, hsla(210, 100%, 63%, 0.5),hsla(0, 0%, 59%, 0),white);*/
}

.mainhead {
  line-height: 100px;
}

#nvgtr {
  position: fixed;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: center;
  line-height: 200px;
}

/*.el-main {*/
/*  background-color: #E9EEF3;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 160px;*/
/*}*/

body > .el-container {
  margin-bottom: 40px;
}


.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
