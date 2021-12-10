<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             active-text-color="orange" style="font-weight: bold;">
      <el-col :span="4" class="menuitemleft">
        <div style="cursor: pointer;" @click="toMain">
          <el-image style="float: left; height:50px;width:50px;line-height: 10px;"
                    :src="require('@/assets/sustechlogo.png')"></el-image>
          <span style="float: left;">Sustech Flea Store</span>
        </div>

      </el-col>

      <el-menu-item index="1" style="font-size: 15px;">Flea trade</el-menu-item>
      <el-menu-item index="2" style="font-size: 15px;">Errand proxy</el-menu-item>
      <el-menu-item index="3" style="font-size: 15px;" disabled>API excahnge</el-menu-item>
      <el-menu-item index="4" style="font-size: 15px;" disabled>More function</el-menu-item>

      <el-col :span="1" class="menuitemright">
        <el-button icon="el-icon-s-custom" type="warning" size="small" style="cursor: pointer;" circle
                   @click="toSelfPage"></el-button>
      </el-col>
      <el-col :span="1" class="menuitemright">
        <i class="el-icon-star-off menuitem" style="font-size: 25px; cursor: pointer; " @click="toCart"></i>
      </el-col>
      <el-col :span="1" class="menuitemright" v-if="activeIndex==='1'">
        <i class="el-icon-search" style="font-size: 25px; cursor: pointer;" @click="toSearch"></i>
      </el-col>
    </el-menu>
  </div>
</template>


<script>
import {store} from "../store/store";

export default {
  name: "searchnavigator",
  data() {
    return {
      activeIndex: store.state.storetype
    };
  },
  methods: {
    handleSelect(key) {
      if (key === "1") {
        this.$router.push({name: "main"});
        store.state.storetype="1";
      } else if (key === "2") {
        this.$router.push({name: "errandmain"});
        store.state.storetype="2";
      }

    },
    toMain() {
      this.$router.push({name: 'main'});
      store.state.storetype="1";
    },
    toSearch() {
      this.$router.push({name: 'search2'});
    },
    toCart() {
      if(store.state.storetype==="1"){
        this.$router.push({name: 'shoppingcart'});
      }else if(store.state.storetype==="2"){
        this.$router.push({name: 'errandtask'});
      }

    },
    toSelfPage() {
      this.$router.push({name: 'selfpage'});
    }
  }
}
</script>

<style scoped>
.menuitemleft {
  outline: none;
  line-height: 60px;
  float: left;
}

.menuitemright {
  outline: none;
  line-height: 60px;
  float: right;
}
</style>
