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
        <el-steps :active="step.active" finish-status="success" v-if="cate===0" direction="horizontal" align-center>
          <el-step title="confirm order"></el-step>
          <el-step title="payment"></el-step>
          <el-step :title="producttype==='SELL'? 'merchant affirm':'customer affirm'"></el-step>
          <el-step :title="producttype==='SELL'? 'customer affirm':'merchant affirm'"></el-step>
          <el-step title="trade result"></el-step>
        </el-steps>
        <el-steps :active="step.active" finish-status="success" v-if="cate===1" direction="horizontal" align-center>
          <el-step title="confirm order"></el-step>
          <el-step title="merchant affirm"></el-step>
          <el-step title="trade result"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="20" class="support">
        <transition name="fade" mode="out-in">
          <component @nextStatus="nextStatus" :is="subrouter" :balance="user.balance" :uid="user.uid"
                     @giveChatParameter="getChatParameter">
          </component>
        </transition>
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
      width="60%"
    >
      <chatwindow :otherid="owner.id" :othername="owner.nickname" :otherphoto="owner.icon"
                  :myid="user.uid" :myname="user.nickName" :myphoto="user.icon"></chatwindow>

      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>


</template>

<script>
import Searchnavigator from "../components/wholenavigator";
import Chatwindow from "../components/chatroom/chatwindow";
import errandmainpage from "./errandmainpage";
import axios from "axios";
import {store} from "../store/store";


export default {
  name: "checkoutpage",
  data() {
    return {
      cate: 0,
      step: {
        active: 0
      },
      chatVisible: false,
      subrouter: '',
      user: {
        balance: 0,
        uid: 0,
        icon: "string",
        nickName: "string",
      },
      owner: {
        id: 0,
        icon: "string",
        nickname: "string"
      },
      producttype: "BUY"
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
      this.chatVisible = true;
    },
    nextStatus() {
      this.step.active += 1
      if (this.cate === 0) {
        switch (this.step.active) {
          case 0:
            this.subrouter = "submitorder";
            break;
          case 1:
            this.subrouter = "payment";
            break;
          case 2:
            this.subrouter = "merchant_confirm";
            break;
          case 3:
            this.subrouter = "buyer_confirm";
            break;
          case 4:
            this.subrouter = "payresult";
            break;
          case 5:
            this.$router.push({name: "shoppingcart"})
        }
      } else if (this.cate === 1) {
        switch (this.step.active) {
          case 0:
            this.subrouter = "errandsubmit";
            break;
          case 1:
            this.subrouter = "merchant_confirm";
            break;
          case 2:
            this.subrouter = "payresult";
            break;
          case 3:
            this.$router.push({name: "errandmain"})
        }
      }
    },
    getChatParameter(ownerInfo) {
      this.owner.id = ownerInfo[0];
      this.owner.icon = ownerInfo[1];
      this.owner.nickName = ownerInfo[2];
      console.log(this.owner.id, this.owner.icon, this.owner.nickName);
    }
  },
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
    axios.get(store.state.database + "user/userInfo").then(response => {
      this.user = response.data;
    })
    this.cate = this.$route.params.category;
    this.producttype = this.$route.query.producttype;
    this.step.active = parseInt(this.$route.query.status);
    if (this.cate === 0) {
      switch (this.step.active) {
        case 0:
          this.subrouter = "submitorder";
          break;
        case 1:
          this.subrouter = "payment";
          break;
        case 2:
          this.subrouter = "merchant_confirm";
          break;
        case 3:
          this.subrouter = "buyer_confirm";
          break;
        case 4:
          this.subrouter = "payresult";
          break;
      }
    } else if (this.cate === 1) {
      switch (this.step.active) {
        case 0:
          this.subrouter = "errandsubmit";
          break;
        case 1:
          this.subrouter = "merchant_confirm";
          break;
        case 2:
          this.subrouter = "payresult";
          break;
      }
    }

  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    Chatwindow,
    Payresult: resolve => {
      require(["../components/orderconfirm/payresult"], resolve)
    },
    Payment: resolve => {
      require(["../components/orderconfirm/payment"], resolve)
    },
    Submitorder: resolve => {
      require(["../components/orderconfirm/submitorder"], resolve)
    },
    Searchnavigator,
    buyer_confirm: resolve => {
      require(["../components/orderconfirm/buyer_confirm"], resolve)
    },
    merchant_confirm: resolve => {
      require(["../components/orderconfirm/merchant_confirm"], resolve)
    },
    errandpayment: resolve => {
      require(["../components/orderconfirm/errandpayment"], resolve)
    },
    errandsubmit: resolve => {
      require(["../components/orderconfirm/errandsubmit"], resolve)
    }
  }
}
</script>

<style scoped>
.support {
  border: 1px solid transparent;
}

/deep/ .el-divider--horizontal {
  margin: 0 10px 20px 10px;
  width: 95%;
}

/deep/ .el-steps--horizontal {
  padding: 30px 0 0 0;
}
</style>
