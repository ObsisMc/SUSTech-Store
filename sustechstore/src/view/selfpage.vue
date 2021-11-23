
<template>
  <div id="self">
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-submenu index='1'>
    <template slot='title'>交易</template>
   <el-menu-item index="1-1" @click="BuyOrderVisible=true" >我的购买订单</el-menu-item>
    <el-menu-item index="1-2" @click="SellOrderVisible=true">我的卖出订单</el-menu-item>
    <el-menu-item index="1-3"  @click="locationVisible = true">我的交易地址</el-menu-item>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">我的钱包</template>
    <el-menu-item index="2-1" >我的余额：{{money}} ￥</el-menu-item>
    <el-menu-item index="2-2">充值</el-menu-item>

  </el-submenu>
 <el-menu-item index="3">
   <router-link to="/selfinfo">
    详细信息
   </router-link></el-menu-item>
    <el-menu-item index="4">
    <router-link to='/'>
    登出
    </router-link></el-menu-item>
</el-menu>


<el-dialog title="交易地址" :visible.sync="locationVisible">
  <el-table :data="locations">
    <el-table-column property="address" label="地点"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100px">
    <template slot-scope="scope"  >
                    <el-button type="text" @click="delLocation(scope.$index, scope.row)"  size="mini" >
                        删除地址
                    </el-button>
                </template>
    </el-table-column>
  </el-table>
  <el-input v-model="newLocation" placeholder="添加新地址" style="width : 650px"></el-input>
  <el-button type="primary" @click="addLocation()"> 添加
  </el-button>
</el-dialog>

<el-dialog title="购买订单" :visible.sync="BuyOrderVisible">
  <el-table :data="formBuyOrder">
    <el-table-column property="name" label="商品名称"></el-table-column>
    <el-table-column property="price" label="交易金额"></el-table-column>
    <el-table-column property="time" label="交易时间"></el-table-column>
   <el-table-column property="owner" label="交易方"></el-table-column>
   <el-table-column property="status" label="订单状态"></el-table-column>
  </el-table>

</el-dialog>

<el-dialog title="卖出订单" :visible.sync="SellOrderVisible">
  <el-table :data="formSellOrder">
    <el-table-column property="name" label="商品名称"></el-table-column>
    <el-table-column property="price" label="交易金额"></el-table-column>
    <el-table-column property="time" label="交易时间"></el-table-column>
   <el-table-column property="owner" label="交易方"></el-table-column>
   <el-table-column property="status" label="订单状态"></el-table-column>
  </el-table>

</el-dialog>

    <div id="back">
 <vue-particles
          color="#409EFF"
          :particleOpacity="0.7"
          :particlesNumber="60"
          shapeType="circle"
          :particleSize="6"
          linesColor="#409EFF"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push">
</vue-particles>

      <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="150"
      ></el-avatar>
      <el-upload
      id='changePhoto'
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="uploadfileList"
   :show-file-list="false">
  <el-button size="small" type="primary">更换头像</el-button>
</el-upload>
      <h4 id="xinyu">信誉等级:
      </h4>
      <el-rate v-model="value" :show-text=true :disabled=true  text-color="#F56C6C" v-bind="{texts:texts}" > </el-rate>
      <el-input id="userinfo"
        v-bind="{ placeholder: intro, disabled: disableInput }"
        v-model="textarea"
        type="text"
        maxlength="40"
        :rows="3"
        show-word-limit
        label="个人简介"
      >
      </el-input >
       <el-button type="primary" id="changeInfo"
        >编辑简介<i class="el-icon-upload el-icon--right"></i
      ></el-button>

    </div>
  <div id='oper'>
    <el-row>
    <el-button-group id="bas">
    <el-button type="primary" id='searchSell' icon="el-icon-sold-out" @click="dialogFormVisibleBuy = true"> 求购商品
    </el-button>
    <el-button icon='el-icon-sell' type="primary" id='searchBuy' @click="dialogFormVisibleSell = true">发布商品
    </el-button>
    </el-button-group>
    </el-row>
  </div>
<el-dialog title="发布商品" :visible.sync="dialogFormVisibleSell">
<el-form :model="formSell"  >
    <el-form-item label="商品名称" :label-width="formSellLabelWidth">
      <el-input v-model="formSell.name" autocomplete="off"  maxlength="20"
  show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="商品描述"  :label-width="formSellLabelWidth">
       <el-input v-model="formSell.descri" autocomplete="off"  maxlength="60"
  show-word-limit ></el-input>
    </el-form-item>
     <el-form-item label="商品价格" :label-width="formSellLabelWidth">
       <el-input v-model="formSell.price" autocomplete="off" type="number"></el-input>
    </el-form-item>
    <el-form-item label="" >
      <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">上传商品图片，只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleSell = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleSell = false">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="求购商品" :visible.sync="dialogFormVisibleBuy">
<el-form :model="formBuy"  >
    <el-form-item label="商品名称" :label-width="formSellLabelWidth">
      <el-input v-model="formBuy.name" autocomplete="off"  maxlength="20"
  show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="商品描述"  :label-width="formSellLabelWidth">
       <el-input v-model="formBuy.descri" autocomplete="off"  maxlength="60"
  show-word-limit ></el-input>
    </el-form-item>
     <el-form-item label="商品价格" :label-width="formSellLabelWidth">
       <el-input v-model="formBuy.price" autocomplete="off" type="number"></el-input>
    </el-form-item>
    <el-form-item label="" >
      <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">上传商品图片，只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleBuy = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisibleBuy = false">确 定</el-button>
  </div>
</el-dialog>
  </div>



</template>


<script>
import axios from 'axios';

export default {
/*created () {
  setTimeout(() => {
    window.L2Dwidget.init({
      pluginRootPath: 'static/live2d/',
      pluginJsPath: '/',
      pluginModelPath: 'Alice',
      tagMode: false,
      debug: false,
      model: { jsonPath: 'static/live2d/Alice/model.json' },
      display: { position: 'left', width: 250, height: 400 },
      mobile: { show: true },
      log: false
    })
  }, 1000)

},*/
  name: "selfpage",
  data() {
    return {
      intro: "这是一坨简介，啦啦啦啦啦啦",
      textarea: null,
      disableInput: true,
      value: 4,
      texts :['极差','差','一般','良好','优秀'  ],
      money: 100,
      level :5,
      activeIndex:'1',
      uploadfileList:[],
      //发布商品页面
    dialogFormVisibleSell:false,
     formSell: {
          name: '',
          descri:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          price:null,
        },
        formSellLabelWidth: '100px',
        //求购商品页面
           formBuy: {
          name: '',
          descri:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          price:null,
        },
        dialogFormVisibleBuy:false,
        //常用地址
        locations:[
          {address: "asd"},{address:"asdasdasd"}
        ]

        ,
        locationVisible:false,
        newLocation: null,
      //历史订单
      BuyOrderVisible: false,
      formBuyOrder:[
        {

        }
      ],
      SellOrderVisible: false,
      formSellOrder:[
        {

        }
      ],
    };
  },
   methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      delLocation(index, row){

      },
      addLocation(){

      }
    },
    mounted(){
      axios.defaults.withCredentials=true;
  axios.get('http://10.17.109.39:8181/user/userInfo').then(response=>{
        console.log(response)
      })
}



};
</script>

<style>
.el-avatar {
  position: absolute;

  margin: -10px;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
}
#userinfo {
  margin: 10px;
  width: 800px;
  height: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 400px;
}
#self {
  margin: 0px;
  background-color: aliceblue;
  color: #333;
  border: 0px;
  width: 100%;
  height: 100%;
  position: fixed;
}
#back {
/*  background-image: url("../assets/nkd.png");
*/
  background-repeat: no-repeat;
  background-position: center;
  height: 500px;
  border: 10px;
  background-size: cover;
}
#changePhoto {
  position: absolute;
  top: 300px;
  color: gray;
  left: 50%;
  transform: translateX(-57%);
}
#changeInfo{
  position: absolute;
  top: 410px;
  left: 50%;
  transform: translateX(250%);
}
.el-rate{
  position: absolute;
  top: 370px;
  left: 50%;
  transform: translateX(-50%);
}
#xinyu{
  position: absolute;
  top:343px;
  left: 50%;
  transform: translateX(-220%);
  color:navajowhite
}
#bas{
  margin: 25px;
  left: 50%;
  transform: translateX(0%);
}
#particles-js {
  width: 100%;
 /* height: calc(100% - 100px);*/
  height: 100%;
  position: relative;
}

</style>
