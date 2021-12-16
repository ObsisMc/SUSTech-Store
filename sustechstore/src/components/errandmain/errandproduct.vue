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
      size="75%"
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
                  <i class="el-icon-chat-dot-round " style="font-size: 20px; cursor: pointer;" @click="openchat"></i>
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
            <span class="pricespan">
              ¥ <slot name="price"></slot>
            </span>
            <span class="tipsspan">
              + tips: <slot name="tips">0</slot>
            </span>
          </el-row>

        </el-col>
        <el-col :span="4" class="support"></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="support"></el-col>
        <el-col :span="16">
          <el-table
            :data="endslocation"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="Map">
                    <div class="baidumap">
                      <mymap address="南方科技大学一丹图书馆">
                      </mymap>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              prop="end">
            </el-table-column>
            <el-table-column
              label="Position"
              prop="position">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4" class="support"></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button plain type="success" @click="toOrder" class="takebutton">Take it</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import mymap from "@/components/baiduMap/baiduMapWithAddress";

export default {
  name: "errandproduct",
  props: ["imgurl", "id", "icon", "rating", "saved"],
  data() {
    return {
      drawer: false,
      direction: 'btt',
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      endslocation: [
        {
          end: "Origin",
          position: this.id
        },
        {
          end: "Destination",
          position: this.id
        }
      ]
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
    },
    openchat() {

    },
    toOrder(){
      this.$router.push({
        path: '/checkout/' + this.id + '/' + "3", query: {status: 0}
      });
    },
    toUser() {
      this.$router.push({
        path:"/otherpage"
      })
    }
  },
  computed: {
    computedId() {
      return "flag" + (this.id).toString();
    }
  },
  components: {
    mymap: resolve => {
      require(['@/components/baiduMap/baiduMapWithAddress'], resolve)
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
  float: left;
}

.tipsspan {
  margin-left: 10px;
  color: #FCC200;
  font-weight: 300;
  font-size: 15px;
  float: left;
}

.support {
  border: 1px solid transparent;
}

.baidumap {
  height: 100%;
  width: calc(100vh);
  border: 1px solid silver;
  margin: 20px 10px;
}
.takebutton{
  margin:30px 0;
  padding: 25px 80px;
}

/*   need 2 deep!!! */
/deep/ /deep/ .el-drawer.btt, .el-drawer.ttb {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
