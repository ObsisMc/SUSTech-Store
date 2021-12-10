<template>
  <div @click="drawer = true">
    <el-card class="box-card" shadow="hover">
      <el-row>
        <i class="el-icon-s-flag" :class="computedId" style="float: right;"></i>
      </el-row>
      <el-row style="text-align: left;">
        <slot name="description"></slot>
      </el-row>
      <el-row style="text-align: right; margin-top: 10px;">
        <el-avatar :size="20"
                   :src="icon"></el-avatar>
        <span>
          <slot name="nickName">nickname</slot>
        </span>
      </el-row>

    </el-card>

    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="70%"
      :show-close="false"
      :before-close="handleClose">
      <el-row>
        <el-col :span="4" class="support"></el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="3">
              <div @click="toUser">
                <el-avatar :size="60" :src="icon" style="cursor: pointer;"></el-avatar>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="float: left;">
                <el-row>
                  <span style="font-weight: bold;font-size: 20px; float: left;">
                    <slot name="nickName">unamed</slot>
                  </span>
                </el-row>
                <el-row style="margin-top:15px;">
                  <div>
                    <el-rate
                      v-model="rating"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                      :colors="ratingobj.colors"
                      style="float: left;">
                    </el-rate>
                  </div>
                </el-row>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button plain @click="takeErrand"><i class="el-icon-s-flag" :class="computedId"></i></el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;">
            <span style="float: left;">
              <slot name="description"></slot>
            </span>
          </el-row>
          <el-row style="margin-top: 40px;">
            <span class="pricespan" style="float: left;">
              ¥ <slot name="price"></slot>
            </span>
          </el-row>

        </el-col>
        <el-col :span="4" class="support"></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "errandproduct",
  props: ["imgurl", "id", "icon", "rating", "saved"],
  data() {
    return {
      drawer: false,
      direction: 'btt',
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('Confirm close？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    toUser() {
      this.$message({
        message: "to user",
        type: "success"
      })
      // this.$router.push();
    },
    takeErrand() {
      let flags = document.getElementsByClassName(this.computedId);
      if (this.saved === false) {
        console.log(flags)
        for (let i = 0; i < flags.length; i++) {
          flags[i].style.color = "red";
        }
        // document.getElementById("flag").style.color="red";
        this.$message({
          message: "Add to errand tasks successfully",
          type: "success"
        })
        let url = "";
        axios.post(url).then(response => {

        })
      } else {
        for (let i = 0; i < flags.length; i++) {
          flags[i].style.color = "black";
        }

        let url = "";
        axios.post(url).then(response => {

        })
      }
      this.$emit("changeFlag", this.id);


    }
  },
  computed:{
    computedId(){
      return "flag" + (this.id).toString();
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;

}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.pricespan {
  color: #FCC200;
  font-weight: 580;
  font-size: 25px;
}

.support {
  border: 1px solid transparent;
}

/*   need 2 deep!!! */
/deep/ /deep/ .el-drawer.btt, .el-drawer.ttb {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
