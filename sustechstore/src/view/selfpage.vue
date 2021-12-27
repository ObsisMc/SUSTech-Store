
<template>
  <div id="self">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">交易</template>
        <el-menu-item
          index="1-1"
          @click="(BuyOrderVisible = true), (formBuyOrder = getBuyorder())"
          >我的购买订单</el-menu-item
        >
        <el-menu-item
          index="1-2"
          @click="(SellOrderVisible = true), (formSellOrder = getSellorder())"
          >我的卖出订单</el-menu-item
        >
        <el-menu-item
          index="1-3"
          @click="(FaPaoOrderVisible = true), (formFaPaoOder=getFaPaoOrder())"
        >我发布的跑腿</el-menu-item
        >
        <el-menu-item
          index="1-4"
          @click="(JiePaoOrderVisible = true), (formJiePaoOrder=getJiePaoOrder())"
        >我接收的跑腿</el-menu-item
        >
        <el-menu-item
          index="1-5"
          @click="(locationVisible = true), (locations = getLocation())"
          >我的交易地址</el-menu-item
        >
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">我的钱包</template>
        <el-menu-item index="2-1">我的余额：{{ money }} ￥</el-menu-item>
        <el-menu-item index="2-2" @click="moneyVisible=true">充值</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to="/selfinfo"> 详细信息 </router-link></el-menu-item
      >
      <el-menu-item index="4">
        <router-link to="/main"> 返回主页 </router-link></el-menu-item
      >
      <el-menu-item index="5">
        <router-link to="/"> 登出 </router-link></el-menu-item
      >
    </el-menu>

    <el-dialog title="交易地址" :visible.sync="locationVisible">
      <el-table :data="locations">

        <el-table-column property="address" label="地点"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="delLocation(scope.row.id)"
              size="mini"
            >
              删除地址
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-input
        v-model="newLocation"
        placeholder="添加新地址"
        style="width: 650px"
      ></el-input>
      <el-button type="primary" @click="addLocation()"> 添加 </el-button>
    </el-dialog>

    <el-dialog title="购买订单" :visible.sync="BuyOrderVisible">
      <el-table :data="formBuyOrder"  @row-click="gotoOrder">
        <el-table-column property="name" label="商品名称"></el-table-column>
        <el-table-column property="price" label="交易金额"></el-table-column>
        <el-table-column property="time" label="交易时间"></el-table-column>
        <el-table-column property="owner" label="交易方"></el-table-column>
        <el-table-column property="status" label="订单状态"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="卖出订单" :visible.sync="SellOrderVisible" >
      <el-table :data="formSellOrder" @row-click="gotoOrder">
        <el-table-column property="name" label="商品名称" ></el-table-column>
        <el-table-column property="price" label="交易金额"></el-table-column>
        <el-table-column property="time" label="交易时间"></el-table-column>
        <el-table-column property="owner" label="交易方"></el-table-column>
        <el-table-column property="status" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==='PAYED'"
              size="mini"
              @click.native.stop="fahuo(scope.$index, scope.row)">确认发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="我发布的跑腿" :visible.sync="FaPaoOrderVisible">
      <el-table :data="formFaPaoOder"  @row-click="gotoPao">
        <el-table-column property="name" label="跑腿名称"></el-table-column>
        <el-table-column property="price" label="交易金额"></el-table-column>
        <el-table-column property="origin" label="出发点"></el-table-column>
        <el-table-column property="destination" label="目的地"></el-table-column>
        <el-table-column property="time" label="交易时间"></el-table-column>
        <el-table-column property="owner" label="交易方"></el-table-column>
        <el-table-column property="type" label="跑腿类型"></el-table-column>
        <el-table-column property="status" label="订单状态"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="我接受的跑腿" :visible.sync="JiePaoOrderVisible">
      <el-table :data="formJiePaoOrder"  @row-click="gotoPao">
        <el-table-column property="name" label="跑腿名称"></el-table-column>
        <el-table-column property="price" label="交易金额"></el-table-column>
        <el-table-column property="origin" label="出发点"></el-table-column>
        <el-table-column property="destination" label="目的地"></el-table-column>
        <el-table-column property="time" label="交易时间"></el-table-column>
        <el-table-column property="owner" label="交易方"></el-table-column>
        <el-table-column property="type" label="跑腿类型"></el-table-column>
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
        clickMode="push"
      >
      </vue-particles>

      <el-avatar
        :src='img'
        :size="150"
      ></el-avatar>
      <h2 id="name">{{ nickname }}</h2>
      <h4 id="xinyu">信誉等级:</h4>
      <el-rate
        v-model="value"
        :show-text="true"
        :disabled="true"
        text-color="#F56C6C"
        v-bind="{ texts: texts }"
      >
      </el-rate>
    </div>
    <div id="oper">
      <el-row>
        <el-button-group id="bas">
          <el-button
            type="primary"
            id="searchSell"
            icon="el-icon-sold-out"
            @click="dialogFormVisibleBuy = true"
          >
            求购商品
          </el-button>
          <el-button
            icon="el-icon-sell"
            type="primary"
            id="searchBuy"
            @click="dialogFormVisibleSell = true"
            >发布商品
          </el-button>
          <el-button
            icon="el-icon-sell"
            type="primary"
            id="searchPao"
            @click="dialogFormVisiblePao = true"
            >发布跑腿
          </el-button>
        </el-button-group>
      </el-row>
    </div>
    <el-dialog title="发布商品" :visible.sync="dialogFormVisibleSell">
      <el-form :model="formSell">
        <el-form-item label="商品名称" :label-width="formSellLabelWidth">
          <el-input
            v-model="formSell.name"
            autocomplete="off"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formSellLabelWidth">
          <el-input
            v-model="formSell.descri"
            autocomplete="off"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formSellLabelWidth">
          <el-input
            v-model="formSell.price"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formSellLabelWidth">
          <el-select v-model="selectedSell" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
<photoUpload @getPhoto='addPhoto' >
</photoUpload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSell = false, clearPhoto()">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisibleSell = false), Sell()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="求购商品" :visible.sync="dialogFormVisibleBuy">
      <el-form :model="formBuy">
        <el-form-item label="商品名称" :label-width="formSellLabelWidth">
          <el-input
            v-model="formBuy.name"
            autocomplete="off"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formSellLabelWidth">
          <el-input
            v-model="formBuy.descri"
            autocomplete="off"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formSellLabelWidth">
          <el-input
            v-model="formBuy.price"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formSellLabelWidth">
          <el-select v-model="selectedBuy" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
<photoUpload @getPhoto='addPhoto'>
</photoUpload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleBuy = false, clearPhoto">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleBuy = false, Buy()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="发布跑腿" :visible.sync="dialogFormVisiblePao">
      <el-form :model="formPao">
        <el-form-item label="跑腿名称" :label-width="formSellLabelWidth">
          <el-input
            v-model="formPao.name"
            autocomplete="off"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="跑腿描述" :label-width="formSellLabelWidth">
          <el-input
            v-model="formPao.descri"
            autocomplete="off"
            maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formSellLabelWidth">
          <el-input
            v-model="formPao.price"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="我的位置" :label-width="formSellLabelWidth">
          <el-input
            v-model="formPao.origin"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formSellLabelWidth">
          <el-select v-model="selectedPao" placeholder="请选择">
            <el-option
              v-for="item in paoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <!--photoUpload @getPhoto='addPhoto'>
          </photoUpload-->
        </el-form-item>
        <el-form-item label="目的地">
          <mymap @mapAddress="getMapAddress"> </mymap>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblePao = false, clearPhoto">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisiblePao = false, Pao()"
        >确 定</el-button
        >
      </div>

    </el-dialog>
    <el-dialog title="充值" :visible.sync="moneyVisible">
      <el-input  v-model="addMoney" label="充值金额" >
      </el-input>
      <el-button @click="addMoneytoAccount">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
import { store } from "../store/store";
import mymap from "../components/baiduMap/baiduMap.vue";
import photoUpload from '../components/photoUpload/photoUpload.vue'

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
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
  components: {
    mymap,photoUpload
  },
  inject:['reload'],
  data() {
    return {
      intro: "这是一坨简介，啦啦啦啦啦啦",
      textarea: null,
      disableInput: true,
      value: 4,
      texts: ["极差", "差", "一般", "良好", "优秀"],
      money: 100,
      nickname: "aaa",
      img: "",
      userId: 0,
      activeIndex: "1",
      uploadfileList: [],
      base64Photo:'',
      base64PhotoList :[],
      //发布商品页面
      dialogFormVisibleSell: false,
      formSell: {
        name: "",
        descri: "",
        img: "",
        type: 0,
        price: null,
        time: null,
        SellProductPhoto:[],

      },
      formSellLabelWidth: "100px",
      //求购商品页面
      formBuy: {
        name: "",
        descri: "",
        BuyProductPhoto: [],
        price: null,

      },
      //跑腿页面
      formPao:{
        name: '',
        origin:'',
        destination:'南方科技大学',
        descri:'',
          price:0,
        paoproductPhoto:[],


      },
      dialogFormVisibleBuy: false,
      //常用地址
      locations: [],

      locationVisible: false,
      newLocation: null,
      moneyVisible :false,
      addMoney: 0,
      //历史订单
      BuyOrderVisible: false,
      formBuyOrder: [],
      SellOrderVisible: false,
      formSellOrder: [],
      JiePaoOrderVisible:false,
      formJiePaoOrder :[],
      FaPaoOrderVisible:false,
      formFaPaoOder:[],
      selectedBuy: null,
      selectedSell: null,
      selectedPao: null,
      options: [
        {
          label: "Study",
          value: 1,
        },
        {
          label: "Food",
          value: 2,
        },
        {
          label: "Electronic",
          value: 3,
        },
        {
          label: "Living",
          value: 4,
        },
      ],
      paoOptions:[
        {
          label:'FETCH',
          value :1,
        },
        {
           label: 'SEND',
          value: 2,
        },
        {
          label: 'DO',
          value: 3
        }
      ],
      dialogFormVisiblePao: false,
    };
  },
  methods: {

    delLocation(lid) {
      axios.defaults.headers.common["satoken"] = store.state.token;
     axios.delete(store.state.database+'/userAddress/deleteById/'+lid).then(response=>{
       console.log(response);
       if (response.data){
       this.$message({
         message: "delete location successfully!",
         type: "success",
       })}

  this.reload()   })
    },
    addLocation() {
      axios.defaults.headers.common["satoken"] = store.state.token;
      let to={
        address: this.newLocation,
        remark: "",
        isDefault:0,
      }
      axios.post(store.state.database+'/userAddress/add',to).then(response=>{
         if (response.data){
           this.$message({
             message: "add location successfully!",
             type: "success",
           })
           this.reload();
         }
      })
    },

    Sell() {

      axios.defaults.headers.common["satoken"] = store.state.token;

      let to = {
        categoryleveloneId: this.selectedSell,
        categorylevelthreeId: 0,
        categoryleveltwoId: 0,
        createTime: "",
        description: this.formSell.descri,
        id: 0,
        images: this.base64PhotoList,
        name: this.formSell.name,
        ownerId: this.userId,
        price: this.formSell.price,
        updateTime: "",
        type: "SELL"
      };
    this.clearPhoto();
      axios.post(store.state.database + "/product/add",to).then((response) => {
        console.log(response);
        if (response.data) {
          this.$message({
            message: "sucessful!",
            type: "success",
          });
        } else {
          this.$message.error("ERROR !");
        }

      });
    },
    Buy(){
      axios.defaults.headers.common["satoken"] = store.state.token;
      console.log('Buy')
      let to = {
        categoryleveloneId: this.selectedSell,
        categorylevelthreeId: 0,
        categoryleveltwoId: 0,
        createTime: "",
        description: this.formBuy.descri,
        id: 0,
        images: this.base64PhotoList,
        name: this.formBuy.name,
        ownerId: this.userId,
        price: this.formBuy.price,
        updateTime: "",
        type: "BUY"
      };
      this.clearPhoto();
      axios.post(store.state.database + "/product/add",to).then((response) => {
        console.log(response);
        if (response.data) {
          this.$message({
            message: "sucessful!",
            type: "success",
          });
        } else {
          this.$message.error("ERROR !");
        }

      });
    },
    Pao(){
      axios.defaults.headers.common["satoken"] = store.state.token;
      let to ={
        buyerId:0,
        createTime: "",
        description: this.formPao.descri,
        destination: this.formPao.destination,
        id :0,
        image: '',
        name : this.formPao.name,
        origin: this.formPao.origin,
        ownerId: this.userId,
        status : 'OPENED',
        type: this.selectedPao,
        updateTime: "",
        price: this.formPao.price,

      }
      this.clearPhoto();
      if (this.formPao.price>this.money){
        this.$message.error('Do not have enough money!')
      }
     else {
      axios.post(store.state.database+'/errand/add',to).then(response=>{
        if (response.data){
          this.$message({
            message: "successful!",
            type: "success",
          });
        }
        else {
          this.$message.error("ERROR !");
        }
      })}
    },
    getLocation() {
      let ans = [];
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios
        .get(store.state.database + "userAddress/findAll")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            let temp = {
              id: response.data[i].id,
              address: response.data[i].address + response.data[i].remark,
            };
            ans.push(temp);
          }
        });
      return ans;
    },
    getBuyorder() {
      let ans = [];
      axios.defaults.headers.common["satoken"] = store.state.token;
      console.log(store.state.token);
      axios.get(store.state.database + "//order/listBuyVO").then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let st = null;
          if (response.data[i].status==='OPENED'){
            st =0;
          }
          else if (response.data[i].status==='PAYED'){
            st =1;
          }
          else if (response.data[i].status==='SHIPPED'){
            st =2;
          }
          else if (response.data[i].status==='CONFIRMED'){
            st =3;
          }
          else if (response.data[i].status==='CLOSED'){
            st =4;
          }
          let temp = {
            id : response.data[i].id,
            name: response.data[i].productName,
            owner: response.data[i].buyerNickName,
            time: response.data[i].createTime,
            price: response.data[i].cost,
            status:  response.data[i].status,
            truestatus: st,
          };
          ans.push(temp);
        }
      });
      console.log(ans);
      return ans;
    },
    getSellorder() {
      let ans = [];
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios.get(store.state.database + "/order/listSellVO").then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let st = null;
          if (response.data[i].status==='OPENED'){
              st =0;
          }
          else if (response.data[i].status==='PAYED'){
            st =1;
          }
          else if (response.data[i].status==='SHIPPED'){
            st =2;
          }
          else if (response.data[i].status==='CONFIRMED'){
            st =3;
          }
          else if (response.data[i].status==='CLOSED'){
            st =4;
          }
          let temp = {
            id : response.data[i].id,
            name: response.data[i].productName,
            owner: response.data[i].buyerNickName,
            time: response.data[i].createTime,
            price: response.data[i].cost,
            status: response.data[i].status,
            truestatus:st ,
          };
          ans.push(temp);
        }
      });

      return ans;
    },
    getFaPaoOrder(){
      let ans=[];
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios.get(store.state.database+'/errand/listReleasedVO').then(response=>{
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let st = null;
          if (response.data[i].status==='OPENED'){
            st =0;
          }
          else if (response.data[i].status==='RUNNING'){
            st =1;
          }
          else if (response.data[i].status==='CLOSED'){
            st =2;
          }
          let temp = {
            id : response.data[i].id,
            name: response.data[i].name,
            descri :response.data[i].description,
            owner: response.data[i].ownerNickname,
            time: response.data[i].createTime,
            price: response.data[i].price,
            status: response.data[i].status,
            truestatus:st ,
            type: response.data[i].type,
            origin: response.data[i].origin,
            destination: response.data[i].destination,
          };
          ans.push(temp);
        }
      })
   return ans },
    getJiePaoOrder(){
      let ans=[];
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios.get(store.state.database+'/errand/listTakenVO').then(response=>{
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let st = null;
          if (response.data[i].status==='OPENED'){
            st =0;
          }
          else if (response.data[i].status==='RUNNING'){
            st =1;
          }
          else if (response.data[i].status==='CLOSED'){
            st =2;
          }
          let temp = {
            id : response.data[i].id,
            name: response.data[i].name,
            descri :response.data[i].description,
            owner: response.data[i].ownerNickname,
            time: response.data[i].createTime,
            price: response.data[i].price,
            status: response.data[i].status,
            truestatus:st ,
            type: response.data[i].type,
            origin: response.data[i].origin,
            destination: response.data[i].destination,
          };
          ans.push(temp);
        }
      })
 return ans   },

  clearPhoto(){
   this.base64PhotoList=[]
  },
  addPhoto(photo){
    this.base64PhotoList.push(photo)
  },
    getMapAddress(address){
        this.formPao.destination=address;

    },
    gotoOrder(row, event, column){
      console.log(row, column);
      var goodid=0;
      axios.get(store.state.database+'/order/getOrdersVOByOrderId/'+row.id).then(response=>{

        goodid=response.data.productId;
        this.$router.push({
          name:'checkoutpage',
          query: { status: row.truestatus+1, uid:this.userId, orderid: row.id},
          params:{id:goodid, category:0}
        });
      })

    },
    gotoPao(row, event, column){
      console.log(row, column);
        this.$router.push({
          name:'checkoutpage',
          query: { status: row.truestatus, uid:this.userId},
          params:{id: row.id, category:1}
      })

    },

    fahuo(index, row){
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios.put(store.state.database+"/order/confirmById/"+row.id).then(response=>{
        if (response.data){
          this.$message({
            message: "successful!",
            type: "success",
          });
        }
        this.reload()
      })
    },
    addMoneytoAccount(){
      axios.defaults.headers.common["satoken"] = store.state.token;
      axios.put(store.state.database+'/user/addBalance/'+this.addMoney).then(response=>{
        if (response.data){
          this.$message({
            message: "successful!",
            type: "success",
          });
          this.reload()
        }
      })
    }
  },

  mounted() {
    console.log(store.state.token);
    axios.defaults.headers.common["satoken"] = store.state.token;
    axios.get(store.state.database + "user/userInfo").then((response) => {
      console.log(response);
      this.money = response.data.balance;
      if (response.data.credit>=100){
        this.value=5
      }
      else {
        this.value=response.data.credit/5
      }
      this.img = response.data.icon;
      this.nickname = response.data.nickName;
      this.userId = response.data.uid;
    });
  },
};
</script>

<style scoped>
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

.el-rate {
  position: absolute;
  top: 388px;
  left: 50%;
  transform: translateX(-50%);
}
#xinyu {
  position: absolute;
  top: 365px;
  left: 50%;
  transform: translateX(-220%);
  color: navajowhite;
}
#bas {
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
#name {
  position: absolute;
  top: 280px;
  color: gray;
  left: 50%;
  transform: translateX(-60%);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#avatarBuy {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
