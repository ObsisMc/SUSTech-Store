<template>
  <div>
    <!--    style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"-->
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 50px;"></div>
    <el-row>
      <el-col :span="12">
        <el-image style="float: left; height:90px;width:90px;"
                  :src="require('@/assets/sustechlogo.png')"></el-image>
        <span style="float: left;line-height: 100px; font-size: 40px;">Checkout</span>
      </el-col>
      <el-col :span="12">
        <el-steps :active="step.active" finish-status="success" direction="horizontal" align-center>
          <el-step title="confirm order"></el-step>
          <el-step title="payment"></el-step>
          <el-step title="merchant affirm"></el-step>
          <el-step title="customer affirm"></el-step>
          <el-step title="trade result"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="20">
        <keep-alive  v-if="!$route.meta.noKeepAlive">
        <router-view></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.noKeepAlive"></router-view>
      </el-col>
      <el-col :span="2" style="border:1px solid transparent;">
        <el-badge :value="12">
          <i class="el-icon-chat-dot-round " style="font-size: 30px; cursor: pointer;" @click="openchat"></i>
        </el-badge>
      </el-col>
    </el-row>

    <el-dialog
      title="Chat"
      :visible.sync="chatVisible"
      width="50%">
      <chatwindow></chatwindow>

      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>



</template>

<script>
import Searchnavigator from "../components/wholenavigator";
import Submitorder from "../components/orderconfirm/submitorder";
import Payment from "../components/orderconfirm/payment";
import Payresult from "../components/orderconfirm/payresult";
import axios from "axios";
import {store} from "../store/store";
import Chatwindow from "../components/chatroom/chatwindow";

export default {
  name: "checkoutpage",
  data() {
    return {
      rootpath: '',
      step: {
        active: 0
      },
      chatVisible: false

    }
  },
  methods: {
    next() {
      if (this.step.active < 2) {
        this.step.active++;
        if (this.step.active > 2) {
          this.step.active = 0;
        }
      }
    },
    openchat() {
      this.chatVisible=true;
    }
  },
  mounted() {
    this.step.active = parseInt(this.$route.query.status);
    // axios.defaults.headers.common['satoken'] = store.state.token;
  },
  beforeRouteUpdate(to, from, next) {
    this.step.active = parseInt(to.query.status);
    next();
  },
  watch:{
    '$route.query': function (){
      console.log("main",this.$route.query);
    }
  },
  components: {Chatwindow, Payresult, Payment, Submitorder, Searchnavigator}
}
</script>

<style scoped>
/deep/ .el-divider--horizontal {
  margin: 0 10px 20px 10px;
  width: 95%;
}

/deep/ .el-steps--horizontal {
  padding: 30px 0 0 0;
}
</style>
