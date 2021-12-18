<template>
  <div class="goodcontainer">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-image
          :src="imgurl"
          fit="cover">
        </el-image>
      </el-col>
      <el-col :span="6">
        <el-row>
          <span class="goodtitle">
            <slot name="title"></slot>
          </span>
        </el-row>
        <el-row>
          <el-avatar class="roughdetail"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span class="roughdetail" style="margin-left: 10px;">
            <span class="roughdetail">
              <slot name="owner"></slot>
            </span>
          </span>
        </el-row>
        <el-row>
          <el-avatar class="roughdetail" :size="40"> Cate</el-avatar>
          <span class="roughdetail" style="margin-left: 10px;">
            <span class="roughdetail">
              <slot name="goodCate"></slot>
            </span>
          </span>
        </el-row>
      </el-col>
      <el-col :span="5">
        <span style="color: #FCC200; font-size: 20px;  line-height: 100px; "> RMB <slot name="price"></slot></span>
      </el-col>
      <el-col :span="3">
        <el-row style="margin-bottom: 30px;">
          <el-badge :value="12" class="tip" style="margin-top: 20px;">
            <i class="el-icon-chat-dot-round " style="font-size: 30px; cursor: pointer;" @click="toChat"></i>
          </el-badge>
        </el-row>
        <el-row>
          <el-tag :type="getOrderTagStatus(orderstatus)">
            {{ getStrOrderStatus(orderstatus) }}
          </el-tag>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-button @click="toGood" style="margin-top:50px;">buy</el-button>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-close" style="cursor: pointer;" @click="removeGoods"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {store} from "../../store/store";

export default {
  name: "cartitem",
  props: ['imgurl', 'index', 'id', 'orderstatus'],
  methods: {
    removeGoods() {
      this.$emit('removeGoods', this.index);
    },
    toGood() {
      console.log(store.state.token)
      this.$router.push({
        name: 'product',
        query: {id: this.id}
      });
    },
    getOrderTagStatus(s) {
      if (s === 0) {
        return "success";
      } else if (s === 1) {
        return "warning";
      } else {
        return "danger";
      }
    },
    getStrOrderStatus(s) {
      if (s === 0) {
        return "Collected";
      } else if (s === 1) {
        return "Obligation";
      } else {
        return "Stockout";
      }
    },
    toChat() {
      alert("chat");
    },
    testClick() {
      alert("hi");
    }
  }
}

</script>
<style scoped>
.goodcontainer {
  padding: 5px;
  margin: 10px;
  /*background-color: #2c3e50;*/
}

.goodcontainer:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.el-image {
  border-radius: 30px;
  width: 150px;
  height: 150px;
}

.goodtitle {
  float: left;
  font-size: 20px;
  font-weight: bold;
}

.roughdetail {
  float: left;
  margin-top: 15px;
}

.tip {

}
</style>
