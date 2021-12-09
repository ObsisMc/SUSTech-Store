<template>
  <div>
    <wholenavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></wholenavigator>
    <div style="height: 60px;"></div>

    <el-row>
      <errandsearchheader></errandsearchheader>
    </el-row>
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <div v-for="o1 in 3" :key="o1">
        <el-col :span="6">
          <errandcategorylist>
            <template v-slot:category>
              {{ category[o1 - 1] }}
            </template>
          </errandcategorylist>
        </el-col>
        <el-col :span="1">
          <el-divider v-if="o1!==3" direction="vertical"></el-divider>
        </el-col>

      </div>


      <el-col :span="2" style="border:1px solid transparent;"></el-col>
    </el-row>

  </div>

</template>

<script>
import wholenavigator from "../components/wholenavigator";
import Errandproduct from "../components/errandmain/errandproduct";
import Errandsearchheader from "../components/errandmain/errandsearchheader";
import axios from "axios";
import {store} from "../store/store";
import Errandcategorylist from "../components/errandmain/errandcategorylist";

export default {
  name: "errandmainpage",
  data() {
    return {
      category: [
        "Help me buy",
        "Help me fetch/send",
        "Help me do"
      ]
    }

  },
  methods: {},
  components: {Errandcategorylist, Errandsearchheader, Errandproduct, wholenavigator}
}
</script>

<style scoped>
/deep/ .el-divider--vertical {
  height: calc(70vh);
  margin: 5px 0;
}
</style>
