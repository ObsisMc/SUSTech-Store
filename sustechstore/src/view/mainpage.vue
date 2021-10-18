<template>
  <div id="mainpagediv">
    <el-container direction="vertical">
      <div>
        <mainhead id="anchormaintop"></mainhead>
      </div>
      <el-container direction="horizontal">
        <el-aside width="100px">
          <navigator id="nvgtr"> sdf</navigator>
        </el-aside>

        <el-main>
          <card></card>
          <el-row id="anchormainclass">
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
          <h1>校园实时图</h1>
          <el-row id="anchormainmap">
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
import card from "../components/mainage/card";
import navigator from "../components/mainage/navigator";
import mainhead from "../components/mainage/mainhead";
import GoodCard from "../components/mainage/GoodCard";
import GoodCard2 from "../components/mainage/GoodCard2";
import Infinitelist from "../components/mainage/Infinitelist";
import Map from "../components/mainage/Map";

export default {
  name: "mainpage",
  components: {
    card, navigator, mainhead,
    GoodCard, GoodCard2, Infinitelist,
    Map
  }
}
</script>

<style scoped>
#mainpagediv {
  /*background: -webkit-repeating-linear-gradient(top, hsla(210, 100%, 63%, 0.5),hsla(0, 0%, 59%, 0),white);*/
  /*background-color: #f4f4f4;*/
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
