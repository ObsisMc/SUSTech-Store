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
        {{step.active}}
        <el-steps :active="step.active" finish-status="success" direction="horizontal" align-center>
          <el-step title="confirm order"></el-step>
          <el-step title="payment"></el-step>
          <el-step title="trade result"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="border:1px solid transparent;"></el-col>
      <el-col :span="20"><router-view></router-view></el-col>
<!--      <el-col :span="20">-->
<!--        <div v-if="step.active===0">-->
<!--          <submitorder></submitorder>-->
<!--        </div>-->
<!--        <div v-if="step.active===1">-->
<!--          <payment></payment>-->
<!--        </div>-->
<!--        <div v-if="step.active===2">-->
<!--          <payresult></payresult>-->
<!--        </div>-->
<!--      </el-col>-->
      <el-col :span="2" style="border:1px solid transparent;">
        <el-badge :value="12" >
          <i class="el-icon-chat-dot-round " style="font-size: 30px; cursor: pointer;" @click="openchat"></i>
        </el-badge>
      </el-col>
    </el-row>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>

</template>

<script>
import Searchnavigator from "../components/searchpage2/searchnavigator";
import Submitorder from "../components/orderconfirm/submitorder";
import Payment from "../components/orderconfirm/payment";
import Payresult from "../components/orderconfirm/payresult";

export default {
  name: "checkoutpage",
  data() {
    return {
      rootpath: '',
      step: {
        active: 0,
        page: ['/submit', '/payment', '/payresult']
      }

    }
  },
  methods: {
    next() {
      console.log("now step:");
      console.log(this.step.active);
      if (this.step.active < 2) {
        this.step.active++;
        if (this.step.active > 2) {
          this.step.active = 0;
        }
        console.log("next step");
        console.log(this.step.active);
        console.log(this.rootpath+this.step.page[this.step.active]);
        this.$router.push(this.rootpath + this.step.page[this.step.active]);
        // http://localhost:8080/checkout/1/payment
        // http://localhost:8080/checkout/1/payment
      }
    },
    openchat(){
      alert("chat");
    }
  },
  mounted() {
    // alert("mounted");
    this.rootpath = this.$route.path;
    this.step.active = this.$route.query.status;
    this.$router.push(this.rootpath + this.step.page[this.step.active]);
    // alert(this.step.active);
  },
  beforeRouteEnter(to, from, next) {
    // alert("enter");
    if (to.query.status) {
      console.log(to.query.status);
      next();
    } else {
      alert('Order is out of time, please create a order again.');
      next({name: 'shoppingcart'});
    }
  },
  beforeRouteUpdate(to, from, next) {
    // alert("update");
    if(to.query.status){
      this.step.active = to.query.status;
      this.$router.push(this.rootpath + this.step.page[this.step.active]);
    }
    next();
  },

  components: {Payresult, Payment, Submitorder, Searchnavigator}
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
