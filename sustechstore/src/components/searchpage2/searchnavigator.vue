<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             active-text-color="orange" style="font-weight: bold;">
      <el-col :span="4" class="menuitemleft" >
        <el-image style="float: left; height:50px;width:50px;line-height: 10px;"
                  :src="require('@/assets/sustechlogo.png')"></el-image>
        <span style="float: left;">Sustech Flea Store</span>
      </el-col>

      <el-menu-item index="1" style="font-size: 15px;">Flea trade</el-menu-item>
      <el-menu-item index="2" style="font-size: 15px;">Errand proxy</el-menu-item>
      <el-menu-item index="3" style="font-size: 15px;" disabled>API excahnge</el-menu-item>
      <el-menu-item index="4" style="font-size: 15px;" disabled>More function</el-menu-item>

      <el-col :span="1" class="menuitemright" >
        <router-link to="/selfpage">
          <el-button icon="el-icon-s-custom"  type="warning" size="small" circle></el-button>
        </router-link>
      </el-col>
      <el-col :span="1" class="menuitemright" >
        <router-link to="/">
          <i class="el-icon-goods menuitem" style="font-size: 25px;"></i>
        </router-link>
      </el-col>
      <el-col :span="1" class="menuitemright" >
        <router-link to="/">
          <i class="el-icon-star-off menuitem" style="font-size: 25px; "></i>
        </router-link>
      </el-col>
      <el-col :span="1" class="menuitemright" >
        <router-link to="/search">
          <i class="el-icon-search" style="font-size: 25px;"></i>
        </router-link>
      </el-col>


    </el-menu>
  </div>

</template>


<script>
export default {
  name: "searchnavigator",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.menuitemleft{
  outline: none;
  line-height: 60px;
  float: left;
}
.menuitemright{
  outline: none;
  line-height: 60px;
  float: right;
}
</style>
