<template>
  <div>
    <el-row>
      <div @click="toOthers" style="cursor: pointer;">
        <el-avatar class="roughdetail"
                   :src="icon"></el-avatar>
      </div>
      <span class="roughdetail" style="margin-left: 10px;">
            <span class="roughdetail" style="margin-top: 10px;">
              <slot name="owner"></slot>
            </span>
      </span>
      <el-badge :value="12" style="float: left; margin-left: 15px;">
        <i class="el-icon-chat-dot-round " style="font-size: 20px; cursor: pointer;" @click="openchat"></i>
      </el-badge>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-rate
        v-model="rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}"
        :colors="ratingobj.colors"
        style="float: left;">
      </el-rate>
    </el-row>

    <el-dialog
      title="Chat"
      :visible.sync="chatVisible"
      width="60%">
      <chatwindow></chatwindow>

      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Chatwindow from "../chatroom/chatwindow";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "userinfo",
  components: {Chatwindow},
  props: ["rating","ownerid",'icon'],
  data() {
    return {
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      chatVisible: false
    }
  },
  methods: {
    openchat() {
      this.chatVisible = true;
    },
    toOthers() {
      axios.get(store.state.database + 'user/userInfo').then(response => {
        if (response.status === 200) {
          if(response.data.uid === this.ownerid){
            this.$router.push({name: "selfpage"})
          }else{
            this.$router.push({name: "otherpage", params: {id: this.ownerid}})
          }
        }
      });

    }
  }
}
</script>

<style scoped>
.roughdetail {
  float: left;
}
</style>
