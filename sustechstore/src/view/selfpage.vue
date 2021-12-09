
<template>
  <div id="self">
   <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-submenu index='1'>
    <template slot='title'>交易</template>
   <el-menu-item index="1-1" @click="BuyOrderVisible=true, formBuyOrder=getBuyorder()" >我的购买订单</el-menu-item>
    <el-menu-item index="1-2" @click="SellOrderVisible=true,formSellOrder=getSellorder()" >我的卖出订单</el-menu-item>
    <el-menu-item index="1-3"  @click="locationVisible = true, locations=getLocation()">我的交易地址</el-menu-item>
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
    <router-link to='/main'>
    返回主页
    </router-link></el-menu-item>
    <el-menu-item index="5">
    <router-link to='/'>
    登出
    </router-link></el-menu-item>
</el-menu>


<el-dialog title="交易地址" :visible.sync="locationVisible">
  <el-table :data="locations">
     <el-table-column property="id" label="id"></el-table-column>
    <el-table-column property="address" label="地点"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100px">
    <template slot-scope="scope"  >
                    <el-button type="text" @click="delLocation(scope.row.id)"  size="mini" >
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
      <h2 id="name"> {{nickname}}</h2>
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
     <el-form-item label="类型" :label-width="formSellLabelWidth">
         <el-select v-model="selectedSell" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
    <el-button type="primary" @click="dialogFormVisibleSell = false, Sell()">确 定</el-button>
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
        <el-form-item label="类型" :label-width="formSellLabelWidth">
         <el-select v-model="selectedBuy" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
import {store} from "../store/store";


axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
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
    nickname:"aaa",
    img:"",
    userId:0,
      activeIndex:'1',
      uploadfileList:[],
      //发布商品页面
    dialogFormVisibleSell:false,
     formSell: {
          name: '',
          descri:'',
        img:'',
        type:0,
          price:null,
          time:null,
        },
        formSellLabelWidth: '100px',
        //求购商品页面
           formBuy: {
          name: '',
          descri:'',

          price:null,
        },
        dialogFormVisibleBuy:false,
        //常用地址
        locations:[

        ]

        ,
        locationVisible:false,
        newLocation: null,
      //历史订单
      BuyOrderVisible: false,
      formBuyOrder:[

      ],
      SellOrderVisible: false,
      formSellOrder:[

      ],
      selectedBuy :null,
      selectedSell: null,
      options:[
        {
          label: "Study",
          value:1
        },
        {
          label: "Food",
          value:2
        },
        {
          label: "Electronic",
          value:3
        },
        {
          label: "Living",
          value:4
        }

      ]
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
      delLocation(lid){

      },
      addLocation(){

      },
      Sell(){

           axios.defaults.headers.common['satoken'] = store.state.token;

        let  to={
               categoryleveloneId: this.selectedSell,
  categorylevelthreeId: 0,
  categoryleveltwoId: 0,
  createTime: "",
  description: this.formSell.descri,
  id: 0,
  image: this.formSell.img,
  name: this.formSell.name,
  ownerId: this.userId,
  price: this.formSell.price,
  updateTime: "",
           };
           axios.post(store.state.database+'/product/add',to).then(response=>{
                console.log(response)
                if(response.data){
                   this.$message({
          message: 'sucessful!',
          type: 'success'
        });
                }
                else{
                   this.$message.error('ERROR !');
                }
           })
      },
      getLocation(){
       let ans=[]
        axios.defaults.headers.common['satoken'] = store.state.token;
        axios.get(store.state.database+'userAddress/findAll').then(response=>{
        for(let i =0;i<response.data.length;i++){
          let temp={
            id: response.data[i].id,
            address: response.data[i].address+response.data[i].remark
          };
          ans.push(temp);
        }
      })
      return ans;
      },
       getBuyorder(){

         let ans=[];
        axios.defaults.headers.common['satoken'] = store.state.token;
        console.log(store.state.token);
        axios.get(store.state.database+'//order/listBuyVO').then(response=>{
          console.log(response)
          for(let i=0;i<response.data.length;i++){
            let st=null;
            switch(response.data[i].status){
              case 0:
                st="已添加";
                break;
                case 1:
                  st="已支付";
                  break;
                  case 2:
                    st="已确认";
                    break;
                    case 3:
                      st="已收货";
                      break;                }
          let  temp={
              name: response.data[i].productName,
              owner: response.data[i].sellerNickName,
              time: response.data[i].createTime,
              price: response.data[i].cost,
              status: st
            }
            ans.push(temp)
          }
        })
        console.log(ans)
     return ans; },
            getSellorder(){

         let ans=[];
        axios.defaults.headers.common['satoken'] = store.state.token;
        axios.get(store.state.database+'/order/listSellVO').then(response=>{
          console.log(response)
          for(let i=0;i<response.data.length;i++){
            let st=null;
            switch(response.data[i].status){
              case 0:
                st="已添加";
                break;
                case 1:
                  st="已支付";
                  break;
                  case 2:
                    st="已确认";
                    break;
                    case 3:
                      st="已收货";
                      break;                }
          let  temp={
              name: response.data[i].productName,
              owner: response.data[i].buyerNickName,
              time: response.data[i].createTime,
              price: response.data[i].cost,
              status: st
            }
            ans.push(temp)
          }
        })
        console.log(ans)
     return ans; },
      rTime(date) {
    var json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

      },

    mounted(){
      console.log(store.state.token)
axios.defaults.headers.common['satoken'] = store.state.token;
  axios.get(store.state.database+'user/userInfo').then(response=>{
        console.log(response)
        this.money=response.data.balance;
        this.value=response.data.credit+1;
        this.img =response.data.icon;
        this.nickname=response.data.nickName;
        this.userId=response.data.uid;
      });

}



};
</script>

<style>
.el-avatar {
  position: absolute;

  margin: -10px;
  top: 150px;
  left: 50%;
  transform: translateX(-48%);
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
  top: 340px;
  color: gray;
  left: 50%;
  transform: translateX(-60%);
}

.el-rate{
  position: absolute;
  top: 390px;
  left: 50%;
  transform: translateX(-50%);
}
#xinyu{
  position: absolute;
  top:365px;
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
#name{
  position: absolute;
  top: 280px;
  color: gray;
  left: 50%;
  transform: translateX(-60%);
}

</style>
