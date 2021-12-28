<template>
  <div>
    <el-row>
      <el-radio-group v-model="goodtype" disabled>
        <el-radio :label="0"> Help me fetch</el-radio>
        <el-radio :label="1"> Help me send</el-radio>
        <el-radio :label="2"> Help me do</el-radio>
      </el-radio-group>
    </el-row>
    <el-row style="margin-top: 30px;">

      <el-col :span="4" class="support"></el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="3">
            <div>
              <el-avatar :size="60" :src="task.ownerIcon" style="cursor: pointer;"></el-avatar>
            </div>
          </el-col>
          <el-col :span="18">
            <div style="float: left;">
              <el-row>
                  <span style="font-weight: bold;font-size: 20px; float: left;">
                    {{ task.ownerNickname }}
                  </span>
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
      <el-button type="primary" @click="submit" class="submitbutton">Submit</el-button>
    </el-row>

  </div>
</template>

<script>
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "errandsubmit",
  data() {
    return {
      task: {
        description: "nothing is here",
        ownerIcon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        id: 2,
        image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "ham",
        ownerNickname: "unamed",
        origin: -1,
        price: -1,
        tips: 0,
        destination: -1

      },
      endslocation: [
        {
          end: "Origin",
          position: "南科大二期新生宿舍"
        },
        {
          end: "Destination",
          position: "南科大学生宿舍5栋"
        }
      ],
      goodtype: 0

    }
  },
  methods: {
    submit() {
      axios.put(store.state.database + "errand/take/" + this.task.id).then(response => {
        if (response.status === 200) {
          this.$route.query.orderid = this.task.id;
          this.$route.query.category = 1;
          this.$emit("nextStatus");
        }
      })
    }
  },
  mounted() {
    let goodsurl = store.state.database + 'errand/findErrandVOById/' + this.$route.params.id;
    axios.get(goodsurl).then(response => {
      this.task = response.data;
      this.endslocation[0].position = response.data.origin;
      this.endslocation[1].position = response.data.destination;
    })
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

.submitbutton {
  font-size: 20px;
  padding: 15px 25px;
  margin: 50px 0;
}

</style>
