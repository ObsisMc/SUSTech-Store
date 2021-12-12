<template>
  <div class="goodcontainer">
    <el-row :gutter="20">
      <div @click="toDetail">
        <el-col :span="15">
        <span style="text-align: left; float: left; margin:10px 30px;">
          hi
        </span>
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
      </div>

      <el-col :span="1">
        <i class="el-icon-close" style="cursor: pointer; float: right;" @click="removeGoods"></i>
      </el-col>
    </el-row>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="75%"
      :show-close="false"
      :before-close="handleClose">
      hi
      <erranddetail></erranddetail>
    </el-drawer>
  </div>
</template>

<script>
import Erranddetail from "./erranddetail";

export default {
  name: "taskitem",
  data() {
    return {
      drawer: false,
      direction: 'btt'
    }
  },
  components: {Erranddetail},
  props: ['imgurl', 'index', 'id', 'orderstatus'],
  methods: {
    removeGoods() {
      this.$emit('removeGoods', this.index);
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
    toDetail() {
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm('Confirm close？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
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
