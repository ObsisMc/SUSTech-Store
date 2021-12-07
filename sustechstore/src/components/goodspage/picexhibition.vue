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
    <el-row style="margin-top: 40px;">
      <el-row>
        <el-col :span="2" style="border:1px solid transparent;"></el-col>
        <el-col :span="12">
          <span style="float: left; font-weight: bold;">Related Product:</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 25px;" :gutter="45">
        <el-col :span="2" style="border:1px solid transparent;"></el-col>
        <el-col :span="22/goods.good.length"
                v-for="o1 in goods.good.length" :key="o1">
          <relatedgoods :imgurl="goods.good[o1-1].fileName"
                        :id="goods.good[o1-1].id">
            <template v-slot:title>
              {{ goods.good[o1 - 1].name }}
            </template>
            <template v-slot:intro v-if="goods.good[o1 - 1].description!==''">
              {{ goods.good[o1 - 1].description }}
            </template>
            <template v-slot:username>
              {{ goods.good[o1 - 1].username }}
            </template>
            <template v-slot:price>
              {{ goods.good[o1 - 1].price }}
            </template>
          </relatedgoods>
        </el-col>
      </el-row>
    </el-row>

  </div>
</template>

<script>
import Relatedgoods from "./relatedgoods";
import axios from "axios";
var lastchosenidx = 0;
export default {
  name: "picexhibition",
  props: ["imgurllist"],
  data() {
    return {
      mainimg: this.imgurllist[0],
      goods: {
        good: [
          {
            categoryleveloneId: 0,
            categorylevelthreeId: 0,
            categoryleveltwoId: 0,
            description: "",
            fileName: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            id: 0,
            name: "string",
            ownerId: 0,
            username: "username",
            price: 100
          }
        ]
      }
    }
  },
  methods: {
    chooseimg(index) {
      this.mainimg = this.imgurllist[index - 1];
      let pics = document.getElementsByClassName("picitem");
      pics[lastchosenidx].firstChild.removeAttribute("id", "chosenpic");
      pics[index - 1].firstChild.setAttribute("id", "chosenpic");
      lastchosenidx = index - 1;
    },
    getRelatedProducts(){
      var url = "@/../static/goods2.json";
      axios.get(url).then(response => {
        console.log(response.data);
        this.goods.good = response.data.goods;
      })

    }
  },
  mounted() {
    let pics = document.getElementsByClassName("picitem");
    pics[0].firstChild.setAttribute("id", "chosenpic");
    this.getRelatedProducts();
  },
  components: {Relatedgoods}
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
