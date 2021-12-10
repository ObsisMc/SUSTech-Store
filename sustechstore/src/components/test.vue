<template>
  <div>

  </div>
</template>

<script>
import Searchbody from "./searchpage2/searchbody";
import Searchnavigator from "./wholenavigator";
import Searchfilter from "./searchpage2/searchfilter";
import Mainfilter from "./newmainpage/mainfilter";
import Singlegood from "./newmainpage/singlegood";
import Mainpagegoodlist from "./newmainpage/mainpagegoodlist";
import Mainpageshow from "./newmainpage/mainpageshow";
import Testlist from "./newmainpage/testlist";
import Cartlist from "./shoppingchart/cartlist";
// import Orderdetail from "./shoppingchart/orderdetail";
import FlipCountdown from 'vue2-flip-countdown';

export default {
  name: "test",
  data() {
    return {
      totalprice: 1600,
      balance: 10000,
      dialogVisible: false,
      activeName: 'vc',
      qrto: '/success',
      active: 0
    }
  },
  components: {
    Cartlist,
    Testlist,
    Mainpageshow,
    Mainpagegoodlist,
    Singlegood,
    Mainfilter,
    Searchfilter,
    Searchnavigator,
    Searchbody,   Map, navigator,FlipCountdown
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
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>

<style scoped>


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
