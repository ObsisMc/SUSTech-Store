<template>
  <div @click="drawer = true">
    <el-card class="box-card" shadow="hover">
      <el-row>
        <i class="el-icon-s-flag" :class="computedId" style="float: right;"></i>
      </el-row>
      <el-row style="text-align: left;">
        <slot name="name"></slot>
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
      <erranddetail :id="id"></erranddetail>
    </el-drawer>

  </div>

</template>

<script>
import axios from "axios";
import mymap from "@/components/baiduMap/baiduMapWithAddress";
import Chatwindow from "../chatroom/chatwindow";
import Erranddetail from "./erranddetail";

export default {
  name: "errandproduct",
  props: ["id", "icon"],
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
          position: this.origin
        },
        {
          end: "Destination",
          position: this.destination
        }
      ],
      chatVisible: false
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
      this.chatVisible = true;
    },
    toOrder() {
      this.$router.push({
        path: '/checkout/' + this.id + '/' + "5", query: {status: 0}
      });
    },
    toUser() {
      this.$router.push({
        path: "/otherpage"
      })
    }
  },
  computed: {
    computedId() {
      return "flag" + (this.id).toString();
    }
  },
  components: {
    Erranddetail,
    Chatwindow,
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

.takebutton {
  margin: 30px 0;
  padding: 25px 80px;
}

/*   need 2 deep!!! */
/deep/ /deep/ .el-drawer.btt, .el-drawer.ttb {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
