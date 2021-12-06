<template>
  <div>
    <el-col :span="11">
      <el-row :gutter="20">
        <el-col :span="18">
        <span class="bold" style="float: left;">
          <slot name="name"></slot>
        </span>
        </el-col>
        <el-col :span="6">
          <i class="el-icon-star-off"></i>
        </el-col>
      </el-row>

      <el-row margin="100px" id="para_margin">
        <p class="small_para">
          <slot name="discription"></slot>
        </p>
      </el-row>

      <el-row id="money_margin">
        <a class="bold">
          <slot name="price"></slot>
        </a>
      </el-row>

      <el-row>
        <el-col :span="7">
          <div class="main_rate" id="rate_margin">
            <el-rate
              :v-model="rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="7">
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" plain @click="toOrder">Buy Now</el-button>
        </el-col>
        <el-col :span="6" :offset="8">
          <el-button type="success" plain @click="addToCart">Add to basket</el-button>
        </el-col>
      </el-row>

      <el-row id="home_deliver_margin">
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "discription",
  props: ["rating"],
  data() {
    return {}
  },
  methods: {
    toOrder() {
      this.$emit("toOrder");
    },
    addToCart() {
      this.$emit("addToCart");
    }
  }
}
</script>

<style scoped>
.bold {
  text-align: left;
  font-weight: bolder;
  font-size: x-large;
}
</style>
