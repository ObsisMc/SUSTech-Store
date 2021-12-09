<template>
  <div>
    <el-row>

    </el-row>
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
      <span >&nbsp"{{ search.searchtarget }}"</span>

  </div>
</template>

<script>
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "errandsearchheader",
  data() {
    return {
      search: {
        searchinput: "",
        searchtarget: ""
      }
    }
  },
  methods: {
    getSearchTarget() {
      this.search.searchtarget = this.search.searchinput;
      if (this.search.searchtarget === '') {
        this.getAllGoods();
      } else {
        axios.get(store.state.database + 'product/search/' + this.search.searchtarget).then(response => {
          this.goodexhibition.good = response.data;
        })
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-input__inner {
  background-color: #f5f5f5;
  border-radius: 15px;
}
</style>
