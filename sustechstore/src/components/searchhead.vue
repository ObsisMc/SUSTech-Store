<template>
  <div>
    <br/>
    <el-row id="inner">
      <el-col :span="6">
        <i class="el-icon-eleme" id="mainicon"/>南科大跳蚤市场
      </el-col>
      <el-col :span="12">
        <el-autocomplete
          prefix-icon="el-icon-search"
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          size="normal"
          clearable
        ></el-autocomplete>
        <el-button type="primary" size="small">搜索</el-button>
        <el-button icon="el-icon-goods" type="warning" size="normal" circle ></el-button>
      </el-col>
      <el-col :span="6">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item >搜索</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "searchhead",
  data() {
    return {
      restaurants: [],
      state2: ''
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
        {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
        {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
        {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped>
.el-autocomplete {
  width:300px;
}
.el-row {
  line-height: 30px;
}
.el-breadcrumb,#mainicon {
  line-height: 35px;
}
</style>
