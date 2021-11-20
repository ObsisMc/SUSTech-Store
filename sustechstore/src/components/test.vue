<template>
  <div>
    <el-row>
      <el-col :span="15">
        <el-row>
          <span class="title">Shopping cart</span>
          <div style="clear:both;"></div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <cartlist style="margin: 40px 30px;"></cartlist>
        </el-row>
        <el-row>
          <el-col :span="16">
            <router-link to="/">
              <i class="el-icon-d-arrow-left" style="font-size: 25px; float: left; margin:0 30px;"> </i>
            </router-link>
            <span style="float: left;">Continue shopping</span>
          </el-col>
          <el-col :span="8">
            <el-image :src="require('@/assets/rmb32.png')"></el-image>
            <span style="color: #FCC200; font-size: 30px; text-align: center; ">{{ totalprice }}</span>
          </el-col>

        </el-row>
      </el-col>
      <el-col :span="9">
        <div id="orderdetail">
          <el-image :src="require('@/assets/sustechlogo.png')"></el-image>

          <el-button @click="payorder"></el-button>
          <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span slot="title" style="float: left">Payment</span>
            <span>Total price: {{ totalprice }}</span>

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="Virtual coin" name="vc">
                <span style="float: left;">Balance: {{ balance }}</span>
                <el-button type="primary" @click="handlePay" size="mini">confirm</el-button>
              </el-tab-pane>
              <el-tab-pane label="Wechat" name="wc">
                <div id="wechatqr" ref="wechatqrref"></div>
<!--                id cannot contain space and other letters-->
              </el-tab-pane>
              <el-tab-pane label="Alipay" name="ap">No support</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancelorder">cancel</el-button>

  </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import CollapsePanel from "./searchpage/CollapsePanel";
import GoodCard from "./mainage/GoodCard";
import Infinitelist from "./mainage/Infinitelist";
import searchhead from "./searchpage/searchhead";
import Map from "./mainage/Map";
import searchbody from "./searchpage/searchbody";
import Searchbody from "./searchpage2/searchbody";
import Splitpage from "./searchpage/splitpage";
import Goodexhibition from "./searchpage/goodexhibition";
import Searchnavigator from "./searchpage2/searchnavigator";
import Searchfilter from "./searchpage2/searchfilter";
import Mainfilter from "./newmainpage/mainfilter";
import Singlegood from "./newmainpage/singlegood";
import Mainpagegoodlist from "./newmainpage/mainpagegoodlist";
import navigator from "./mainage/navigator";
import mainpageshow from "./newmainpage/mainpageshow";
import Mainpageshow from "./newmainpage/mainpageshow";
import Testlist from "./newmainpage/testlist";
import Cartlist from "./shoppingchart/cartlist";
import Orderdetail from "./shoppingchart/orderdetail";
import QRCode from "qrcodejs2";

export default {
  name: "test",
  data() {
    return {
      totalprice: 1600,
      balance: 10000,
      dialogVisible: false,
      activeName: 'vc',
      qrto: '/success'
    }
  },
  components: {
    Orderdetail,
    Cartlist,
    Testlist,
    Mainpageshow,
    Mainpagegoodlist,
    Singlegood,
    Mainfilter,
    Searchfilter,
    Searchnavigator,
    Goodexhibition,
    Splitpage, Searchbody, GoodCard, CollapsePanel, Infinitelist, Map, searchhead, navigator, QRCode
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
    }
  }
}
</script>

<style scoped>
#nvgtr {
  position: fixed;
}

.el-breadcrumb {
  line-height: 30px;
}

#wna {
  /*height: 10px;*/
}

/deep/ .el-divider--vertical {
  height: 720px;
}

.clearfix:before, .clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  zoom: 1
}

.title {
  float: left;
  margin: 20px 20px;
}

.title {
  color: rgb(0, 63, 67);
  font-family: 'Enriqueta', arial, serif;
  line-height: 1.25;
  margin-top: 25px;
  margin-left: 50px;
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

.qr {
  display: inline-block;

  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;


}
</style>
