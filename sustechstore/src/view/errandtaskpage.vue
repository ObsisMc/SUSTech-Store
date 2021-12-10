<template>
<div>
  <wholenavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></wholenavigator>
  <div style="height: 50px;"></div>
  <el-row>
    <el-col :span="24">
      <el-row>
        <span class="title">Errand tasks</span>
        <div style="clear:both;"></div>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <taskitem @setTotalPrice="setTotalPrice" style="margin: 40px 30px;"></taskitem>
      </el-row>
      <el-row>
        <el-col :span="16">
          <router-link to="/main">
            <i class="el-icon-d-arrow-left" style="font-size: 25px; float: left; margin:0 30px;"> </i>
          </router-link>
          <span style="float: left;">Continue shopping</span>
        </el-col>
        <el-col :span="8">
          <el-image :src="require('@/assets/rmb32.png')"></el-image>
          <span style="color: #FCC200; font-size: 35px; text-align: center; ">{{ totalprice }}</span>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</div>

</template>

<script>
import wholenavigator from "../components/wholenavigator";
import taskitem from "../components/errandtask/taskitem";
import axios from "axios";
import {store} from "../store/store";
export default {
  name: "errandtaskpage",
  data() {
    return {
      totalprice: 0,
      balance: 10000,
      dialogVisible: false,
      activeName: 'vc',
      qrto: '/success'
    }
  },
  methods: {
    payorder() {
      this.dialogVisible = true;
      this.qrto = 'https://www.baidu.com/'
      this.$nextTick(() => {
        this.createQrcode()
      })
    },
    createQrcode() {
      this.qr = new QRCode('wechatqr', {
        text: this.qrto, // 二维码内容
        width: 100,
        height: 100
        // colorDark: '#000000',
        // colorLight: '#ffffff',
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.cancelorder();
        })
        .catch(_ => {

        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlePay() {
      this.dialogVisible = false;
      this.$router.push('/payresult');
    },
    cancelorder() {
      this.dialogVisible = false;
      this.activeName = 'vc';
      this.$refs.wechatqrref.innerHTML = '';
    },
    setTotalPrice(p){
      this.totalprice=p;
    }
  },
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
  },
  components:{wholenavigator,taskitem}
}
</script>

<style scoped>
.title {
  float: left;
  margin: 25px 20px 25px 20px;
  color: rgb(0, 63, 67);
  font-family: 'Enriqueta', arial, serif;
  line-height: 1.25;
  font-size: 25px;
  font-weight: bold;
}

.el-divider {
  margin: 0;
  margin-left: 20px;
}

/deep/ .el-divider--horizontal {
  width: 90%;
}
#orderdetail {
  height: 750px;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 30px;
  margin: 20px 20px;
  background-image: radial-gradient(circle at 50% -20.71%, #e6f58f 0, #e9eb7f 10%, #ecdf6e 20%, #efd25d 30%, #f1c44d 40%, #f2b53c 50%, #f3a52d 60%, #f59522 70%, #f8851d 80%, #fa741e 90%, #fc6324 100%);
  /*background-image: radial-gradient(circle at 50% -20.71%, #d1fff8 0, #befff6 10%, #a7fff4 20%, #8dfff3 30%, #6cfbf2 40%, #3cf2f2 50%, #00e8f3 60%, #00dff5 70%, #00d6f9 80%, #00cefd 90%, #00c6ff 100%);*/
}
</style>
