<template>
  <div>
    <el-dialog
      title="Chat"
      :visible.sync="chatVisible"
      width="50%">
      <chatwindow></chatwindow>

      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
    <el-row>
      <el-col :span="4" class="support"></el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="3">
            <div @click="toUser">
              <el-avatar :size="60" :src="task.ownerIcon" style="cursor: pointer;"></el-avatar>
            </div>
          </el-col>
          <el-col :span="18">
            <div style="float: left;">
              <el-row>
                  <span style="font-weight: bold;font-size: 20px; float: left;">
                    {{ task.ownerNickname }}
                  </span>
                <i class="el-icon-chat-dot-round " style="font-size: 20px; cursor: pointer;" @click="openchat"></i>
              </el-row>
              <el-row style="margin-top:15px;">
                <div>
                  <el-rate
                    v-model="ratingobj.rating"
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
        </el-row>
        <el-row style="margin-top: 30px;">
            <span style="float: left;">
              {{ task.description }}
            </span>
        </el-row>
        <el-row style="margin-top: 40px;">
            <span class="pricespan">
              ¥ {{ task.price }}
            </span>
          <span class="tipsspan">
              + tips: {{ task.tips }}
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
                    <mymap address="props.row.position">
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
  </div>
</template>

<script>
import mymap from "@/components/baiduMap/baiduMapWithAddress";
import chatwindow from "../chatroom/chatwindow";
import {store} from "../../store/store";
import axios from "axios";

export default {
  name: "erranddetail",
  props: ["id"],
  data() {
    return {
      chatVisible: false,
      ratingobj: {
        rating: 4,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      task: {
        description: "nothing is here",
        image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "ham",
        ownerId: 0,
        price: 200,
        tips: 0,
        saved: false,
        ownerIcon: "string",
        ownerNickname: "string",
      },
      endslocation: [
        {
          end: "Origin",
          position: "南方科技大学11栋"
        },
        {
          end: "Destination",
          position: "南方科技大学1号门"
        }
      ]
    }
  },
  methods: {
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
  mounted() {
    axios.get(store.state.database + "errand/findErrandVOById/" + this.id).then(response => {
      if (response.status === 200) {
        this.task = response.data;
        this.endslocation[0].position = response.data.origin;
        this.endslocation[1].position = response.data.destination;
      }
    });
  },
  components: {
    chatwindow,
    mymap: resolve => {
      require(['@/components/baiduMap/baiduMapWithAddress'], resolve)
    }
  }
}
</script>

<style scoped>
.support {
  border: 1px solid transparent;
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
</style>
