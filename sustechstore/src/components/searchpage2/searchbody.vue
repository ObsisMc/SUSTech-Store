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
    <span style="color:silver;float:left;">Search result for</span>
    <span style="float: left;">
      &nbsp"{{ search.searchtarget }}"
    </span>
    <br/><br/>
    <el-row>
      <span style="float: left;color:dimgrey; margin-right: 30px;line-height: 60px;">Sort</span>
      <el-button class="sortitem" type="warning">Relevance</el-button>
      <el-button class="sortitem" type="warning">Most new</el-button>
      <el-button class="sortitem" type="warning">Price <i class="el-icon-arrow-down"></i></el-button>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalnum">
        </el-pagination>
      </div>
    </el-row>
    <br/>
    <div class="outerdiv">
      <el-row v-for="o1 in Math.ceil(goodexhibition.good.length/goodexhibition.col)" :key="o1" :gutter="20"
              class="goodrow">
        <el-col :span="24/goodexhibition.col"
                v-for="o2 in o1*goodexhibition.col>goodexhibition.good.length?goodexhibition.good.length-(o1-1)*goodexhibition.col:goodexhibition.col"
                :key="o2">
          <exhibition :imgurl="goodexhibition.good[(o1-1)*goodexhibition.col + o2 - 1].image"
                      :id="goodexhibition.good[(o1-1)*goodexhibition.col + o2 - 1].id"
                      :icon="goodexhibition.good[(o1-1)*goodexhibition.col + o2 - 1].icon">
            <template v-slot:title>
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].name }}
            </template>
            <template v-slot:intro
                      v-if="goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].description !== ''">
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].description }}
            </template>
            <template v-slot:price>
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].price }}
            </template>
            <template v-slot:nickname>
              {{ goodexhibition.good[(o1 - 1) * goodexhibition.col + o2 - 1].nickName }}
            </template>
          </exhibition>
        </el-col>
      </el-row>

    </div>
    <el-row style="margin-top: 50px;">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalnum">
        </el-pagination>
      </div>
    </el-row>


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
        good: [
          {
            description: "",
            image: "",
            id: 0,
            name: "string",
            price: 100,
            icon: '',
            nickName: "unamed"
          }
        ],
        col: 4
      },
      currentPage: 1,
      filterpage: 1,
      pageSize: 8,
      totalnum: 100,
      filter: {
        cate: 0,
        creditLevel: 0,
        maxPrice: 0,
        minPrice: 0,
        searchkey: ''
      }
    }
  },
  methods: {
    getSearchTarget() {
      this.search.searchtarget = this.search.searchinput;
      this.filter.searchkey = this.search.searchtarget;
      this.getAllGoods(this.filter);
    },
    getAllGoods(filter = null) {
      if (filter !== null) {
        this.filter = filter;
        this.filter.searchkey = this.search.searchtarget;
      }
      this.currentPage = 1;
      console.log("get good", this.filter)
      let goodsurl = store.state.database + 'product/search/' + this.currentPage + '/' + this.pageSize;
      let myurl = "@/../static/goods.json";
      axios.post(goodsurl, {
        categoryId: this.filter.cate,
        creditLevel: this.filter.creditLevel,
        maxPrice: this.filter.maxPrice,
        minPrice: this.filter.minPrice,
        key: this.filter.searchkey
      }).then(response => {
        console.log(response.data);
        this.goodexhibition.good = response.data;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let goodsurl = store.state.database + 'product/search/' + this.currentPage + '/' + this.pageSize;
      let myurl = "@/../static/goods.json";
      console.log("换页", this.filter, val);
      axios.post(goodsurl, {
        categoryId: this.filter.cate,
        creditLevel: this.filter.creditLevel,
        maxPrice: this.filter.maxPrice,
        minPrice: this.filter.minPrice,
        key: this.filter.searchkey
      }).then(response => {
        this.goodexhibition.good = response.data;
        console.log(response.data)
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


.outerdiv {
  overflow-y: auto;
  overflow-x: hidden;
  height: 630px;

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
