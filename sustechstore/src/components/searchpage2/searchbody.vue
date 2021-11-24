<template>
  <div>
    <el-input
      placeholder="Please enter"
      prefix-icon="el-icon-search"
      v-model="search.searchinput"
      @keyup.enter.native="getSearchTarget"
      style="width: 500px;float: left;"
      clearable>
    </el-input>
    <br/><br/><br/>
    <span style="color:silver;float:left;">Search result for</span><span
    style="float: left;">&nbsp"{{ search.searchtarget }}"</span>
    <br/><br/>
    <el-row>
      <span style="float: left;color:dimgrey; margin-right: 30px;line-height: 60px;">Sort</span>
      <el-button class="sortitem" type="warning">Relevance</el-button>
      <el-button class="sortitem" type="warning">Most new</el-button>
      <el-button class="sortitem" type="warning">Price <i class="el-icon-arrow-down"></i></el-button>
    </el-row>
    <br/>
    <div class="outerdiv">
      <el-row v-for="o1 in Math.ceil(goodexhibition.good.length/goodexhibition.col)" :key="o1" :gutter="20"
              class="goodrow">
        <el-col :span="24/goodexhibition.col"
                v-for="o2 in o1*goodexhibition.col>goodexhibition.good.length?goodexhibition.good.length-(o1-1)*goodexhibition.col:goodexhibition.col"
                :key="o2">
          <exhibition :imgurl="goodexhibition.good[(o1-1)*goodexhibition.col + o2 - 1].fileName"
          :id="goodexhibition.good[(o1-1)*goodexhibition.col + o2 - 1].id">
            <template v-slot:title>
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].name }}
            </template>
            <template v-slot:intro v-if="goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].description !== ''">
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].description }}
            </template>
          </exhibition>
        </el-col>
      </el-row>
    </div>


  </div>

</template>

<script>
import axios from "axios";
import Exhibition from "./exhibition";
import {store} from "../../store/store";

export default {
  name: "searchbody",
  components: {Exhibition},
  data() {
    return {
      search: {
        searchinput: "",
        searchtarget: ""
      },
      sort: "relevance",
      goodexhibition: {
        good: [{
          "categoryleveloneId": 0,
          "categorylevelthreeId": 0,
          "categoryleveltwoId": 0,
          "description": "",
          "fileName": "",
          "id": 0,
          "name": "string",
          "ownerId": 0,
          "price": 0
        }],
        col: 4
      }

    }
  },
  methods: {
    getSearchTarget() {
      this.search.searchtarget = this.search.searchinput;
      if(this.search.searchtarget===''){
          this.getAllGoods();
      }else{
        axios.get(store.state.database+'product/search/'+this.search.searchtarget).then(response=>{
          this.goodexhibition.good = response.data;
        })
      }
    },
    getFilterGoods(filter){
      var level=filter.level;
      var c = filter.cate;
      console.log(level,c)
      if(c.length===0){
      }else{
        this.goodexhibition.good=[];
        for(let i=0;i<c.length;i++){
          axios.get(store.state.database + 'product/list/'+level+'/'+c[i]).then(response=>{

            for(let j=0;j<response.data.length;j++){
              this.goodexhibition.good.push(response.data[j]);
            }
          })
        }
      }

    },
    getAllGoods(){
      let goodsurl = store.state.database+'product/list';
      let myurl = "@/../static/goods.json";
      axios.get(goodsurl).then(response => {
        // this.goodexhibition.good = response.data.goods;
        console.log(response);
        this.goodexhibition.good = response.data;
      })
    }
  },
  mounted() {
    this.getAllGoods();
  }
}
</script>

<style scoped>
/deep/ .el-input__inner {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.sortitem {
  float: left;
  margin: 10px;
}

.goodrow {
  margin-bottom: 20px;
}

/deep/ .el-button--warning {
  color: #606266;
  background-color: white;
  border-color: #eeeaea;
  border-radius: 15px;
}

/deep/ .el-button--warning:focus, .el-button--warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff
}

/*::-webkit-scrollbar {*/
/*  width: 8px;*/

/*}*/

/*::-webkit-scrollbar-thumb {*/
/*  background-color: #eaecf1;*/
/*  border-radius: 3px;*/
/*}*/

/*.outerdiv::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/

.outerdiv {
  overflow-y: auto;
  overflow-x: hidden;
  height: 530px;
  /*height: calc(100vh);*/

}

.outerdiv::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

.outerdiv:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}

.outerdiv:hover::-webkit-scrollbar-thumb:hover {
  background-color: #c0cecc;
}

.outerdiv:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(193, 193, 193, 0.79);
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}

</style>
