<template>
  <div>
    <el-row >
      <el-avatar class="roughdetail"
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <span class="roughdetail" style="margin-left: 10px;">
            <span class="roughdetail" style="margin-top: 10px;">
              <slot name="owner"></slot>
            </span>
      </span>
      <el-badge :value="12" style="float: left; margin-left: 15px;" >
        <i class="el-icon-chat-dot-round " style="font-size: 20px; cursor: pointer;" @click="openchat"></i>
      </el-badge>
    </el-row>
    <el-row style="margin-top:10px;">
        <el-rate
          v-model="rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          :colors="ratingobj.colors"
          style="float: left;">
        </el-rate>
    </el-row>



  </div>
</template>

<script>
export default {
  name: "userinfo",
  props: ["rating"],
  data() {
    return {
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    }
  },
  methods:{
    openchat(){

    }
  }
}
</script>

<style scoped>
.roughdetail {
  float: left;
}
</style>
