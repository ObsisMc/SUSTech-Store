<template>
<div>
  <el-row>
    <el-col :span="4" class="support"></el-col>
    <el-col :span="16">
      <el-row>
        <el-col :span="3">
          <div @click="toUser">
            <el-avatar :size="60" :src="task.icon" style="cursor: pointer;"></el-avatar>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="float: left;">
            <el-row>
                  <span style="font-weight: bold;font-size: 20px; float: left;">
                    {{task.nickName}}
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
      </el-row>
      <el-row style="margin-top: 30px;">
            <span style="float: left;">
              {{task.description}}
            </span>
      </el-row>
      <el-row style="margin-top: 40px;">
            <span class="pricespan">
              ¥ {{task.price}}
            </span>
        <span class="tipsspan">
              + tips: {{task.tips}}
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
</div>
</template>

<script>
import mymap from "@/components/baiduMap/baiduMapWithAddress";
export default {
  name: "erranddetail",
  props: ["rating"],
  data(){
    return {
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      task:{
        description: "nothing is here",
        icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        id: 733,
        image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "ham",
        nickName: "unamed",
        ownerId: 0,
        price: 200,
        productId: 734,
        saved: false,
        tips:20
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
    }
  },
  methods:{
    toUser(){
      this.$router.push({
        path:"/otherpage"
      })
    },
    openchat(){
      console.log("openchat")
    },
    toOrder() {
      this.$router.push({
        path: '/checkout/' + this.id + '/' + "3", query: {status: 0}
      });
    }
  },
  components:{
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
.takebutton{
  margin:30px 0;
  padding: 25px 80px;
}
</style>
