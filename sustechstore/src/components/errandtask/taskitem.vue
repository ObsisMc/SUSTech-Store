<template>
  <div class="goodcontainer">
    <el-row :gutter="20">
      <div >
        <el-col :span="3">
          <el-avatar class="roughdetail"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="large"></el-avatar>
          <span class="roughdetail" style="margin-left: 10px;">
              <slot name="owner"></slot>
          </span>
        </el-col>
        <el-col :span="11" style="padding:10px;">
            <span style="margin:15px 10px;">
              <slot name="description"></slot>
            </span>
        </el-col>
        <el-col :span="3">
          <span style="color: #FCC200; font-size: 20px;  line-height: 100px; "> RMB <slot name="price"></slot></span>
        </el-col>

        <el-col :span="3">
          <el-row>
            <el-tag :type="getOrderTagStatus(orderstatus)" style="margin-top: 30px;">
              {{ getStrOrderStatus(orderstatus) }}
            </el-tag>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-button @click="toDetail" class="todetailbutton">Detail</el-button>
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
      <erranddetail></erranddetail>
    </el-drawer>
  </div>
</template>

<script>
import Erranddetail from "../errandmain/erranddetail";

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
  border: 1px solid #eeeaea;;
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
  margin-top: 15px;
}

.todetailbutton {
  margin-top: 25px;

}
</style>
