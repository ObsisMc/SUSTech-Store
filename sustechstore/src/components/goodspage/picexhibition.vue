<template>
  <div>
    <el-row style="margin-top: 20px;" align="middle" type="flex">
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="20">
        <el-image :src="mainimg" alt="失败" :preview-src-list="[mainimg]"
                  fit="contain" class="mainpic"></el-image>
      </el-col>
      <el-col :span="2">
        <el-row v-for="o1 in imgurllist.length" :key="o1" class="picitem">
          <el-image :src="imgurllist[o1-1]" alt="失败"
                    fit="contain" @click="chooseimg(o1)"></el-image>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-row>
        <el-col :span="2" style="border:1px solid transparent;"></el-col>
        <el-col :span="12">
          <span style="float: left; font-weight: bold;">Related Product:</span>
        </el-col>
      </el-row>
      <el-row>

      </el-row>
    </el-row>

  </div>
</template>

<script>
var lastchosenidx = 0;
export default {
  name: "picexhibition",
  props: ["imgurllist"],
  data() {
    return {
      mainimg: this.imgurllist[0]
    }
  },
  methods: {
    chooseimg(index) {
      this.mainimg = this.imgurllist[index - 1];
      let pics = document.getElementsByClassName("picitem");
      pics[lastchosenidx].firstChild.removeAttribute("id", "chosenpic");
      pics[index - 1].firstChild.setAttribute("id", "chosenpic");
      lastchosenidx = index-1;
    }
  },
  mounted() {
    let pics = document.getElementsByClassName("picitem");
    pics[0].firstChild.setAttribute("id", "chosenpic");
  }
}
</script>

<style scoped>
.mainpic {
  width: 500px;
  height: 400px;
}

.picitem {
  cursor: pointer;
  margin-bottom: 20px;
}

#chosenpic {
  /*border: orange solid 1px;*/
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2), 0 0 7px rgba(0, 0, 0, .1)
}
</style>
