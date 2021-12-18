<template>
  <div>
    <el-row>
      <el-input
        placeholder="Please enter"
        prefix-icon="el-icon-search"
        v-model="search.searchinput"
        @keyup.enter.native="getSearchTarget"
        style="width: 500px;"
        clearable>
      </el-input>
      <br/>
      <span style="color:silver;">Search result for</span>
      <span>&nbsp"{{ search.searchtarget }}"</span>
    </el-row>
    <el-row>
      <el-col :span="6">
          <span class="headerstyle" style="float: right; cursor: pointer;" @click="dialog.dialogTableVisible=true">
            Location <i class="el-icon-location"></i>
          </span>
      </el-col>
      <el-col :span="13" class="headerstyle">
        <span v-for="o1 in 3" :key="o1" class="options" @click="selectOption(o1)">
          {{ category.options[o1 - 1] }}
        </span>
      </el-col>
      <el-col :span="5" style="border: 1px solid transparent"></el-col>
    </el-row>

    <el-dialog
      title="Location"
      :visible.sync="dialog.dialogTableVisible"
      width="50%">
      <mymap></mymap>

    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import {store} from "../../store/store";
import Mymap from "../baiduMap/baiduMap";

export default {
  name: "errandsearchheader",
  components: {Mymap},
  data() {
    return {
      category: {
        options: [
          "Help me fetch",
          "Help me send",
          "Help me do",
        ],
        selected: 1
      }
      ,
      search: {
        searchinput: "",
        searchtarget: ""
      },
      dialog:{
        dialogTableVisible:false
      }
    }
  },
  methods: {
    getSearchTarget() {
      this.search.searchtarget = this.search.searchinput;
      if (this.search.searchtarget === '') {
        this.$emit("getAllGoods");
      } else {
        this.$emit("getSearchTarget",[this.search.searchtarget,this.category.selected]);
      }
    },
    selectOption(idx) {
      let option = document.getElementsByClassName("options");
      option[this.category.selected - 1].removeAttribute("id", "selectedoption");
      option[idx - 1].setAttribute("id", "selectedoption");
      this.category.selected = idx;

      this.$emit("getProductsByCate",idx);
      this.search.searchtarget = '';
    }
  },
  mounted() {
    let option = document.getElementsByClassName("options");
    option[0].setAttribute("id", "selectedoption");
  }
}
</script>

<style scoped>
.headerstyle {
  padding: 35px 20px;
  margin: 10px 10px;
  /*background-color: rgba(43, 183, 179,0.4);*/
  border-radius: 5px;
  border: 1px solid silver;
}

.options {
  padding: 20px 40px;
  margin: 10px 20px;
  cursor: pointer;
  font-weight: bold;

}


#selectedoption {
  background-color: rgba(237, 108, 0, 1);
  border-radius: 25px;
  color: white;
}

.sortitem {
  margin: 10px;
  background-color: #151515;
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

/deep/ .el-input__inner {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.support {
  border: 1px solid transparent;
}


</style>
