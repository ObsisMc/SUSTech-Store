<template>
  <div>
    <!--    <el-button @click="creatQrCode"></el-button>-->
    <!--    <div class="qrcode" ref="qrCodeUrl"></div>-->
    <el-button type="primary" @click="payOrder">生成二维码</el-button>
    <el-dialog
      width="30%"
      title="payment"
      @close="closeCode"
      :visible.sync="innerVisible"
      append-to-body>
      <!-- 放置二维码的容器,需要给一个ref -->
      <div id="myqrcode" ref="qrcoderef"></div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  name: "qrvaild",
  data(){
    return{
      jumpto:'',
      innerVisible: false
    }
  },
  components: {QRCode},
  methods: {
    // creatQrCode() {
    //   var qrcode = new QRCode(this.$refs.qrCodeUrl, {
    //     text: 'https://www.baidu.com/', // 需要转换为二维码的内容
    //     width: 100,
    //     height: 100,
    //     colorDark: '#000000',
    //     colorLight: '#ffffff',
    //     correctLevel: QRCode.CorrectLevel.H
    //   });
    // }
    payOrder () {
      this.innerVisible = true;
      // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
      this.jumpto = 'https://www.baidu.com/';
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        this.createQrcode()
      })
    },
    // 生成二维码
    createQrcode () {
      this.qr = new QRCode('myqrcode', {
        width: 150,
        height: 150, // 高度
        text: this.jumpto // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      // console.log(this.qrcode)
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode () {
      this.$refs.qrcoderef.innerHTML = ''
    }
  }
}
</script>

<style scoped>
.qrcode {
  display: inline-block;

  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
  box-sizing: border-box;


}
</style>
