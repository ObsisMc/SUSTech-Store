<template>
  <div id="self">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu index='1'>
        <template slot='title'>用户</template>
        <el-menu-item index="1-1">查看与该用户交易记录</el-menu-item>
        <el-menu-item index="1-2">评价该用户</el-menu-item>
      </el-submenu>

      <el-menu-item index="2">举报</el-menu-item>
      <el-menu-item index="3" @click="dialogShow">

        聊天

      </el-menu-item>
    </el-menu>

    <div id="back">
      <el-dialog title="聊天" :visible.sync="dialog" id="talk" >
      <chatwindow :otherid="id" :myid="myid" :othername="nickname" :myname="myname" :myphoto="myimg" :otherphoto='img'>
      </chatwindow>
   </el-dialog>

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
        :src="img"
        :size="150"
      ></el-avatar>
      <h2 id="name">{{ nickname }}</h2>
      <h4 id="xinyu">信誉等级:
      </h4>
      <el-rate v-model="evaluate" :show-text=true :disabled=true text-color="#F56C6C" v-bind="{texts:texts}"></el-rate>



    </div>
    <div id='oper'>
      <el-row>
        <el-button-group id="bas">
          <el-button type="primary" id='searchSell' icon="el-icon-sold-out"> 查看该用户的求购商品
          </el-button>
          <el-button icon='el-icon-sell' type="primary" id='searchBuy'>查看该用户的发布商品
          </el-button>
        </el-button-group>
      </el-row>
    </div>

  </div>

</template>


<script>
import emotion from "../components/chatroom/emotion.vue";
import "../assets/style/talk.css";
import "../jsfolder/iconfont.js";
import chatwindow from '../components/chatroom/chatwindow.vue'
import axios from "axios";
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
import { store } from '../store/store'
export default {
  inject:['reload'],
  components: {
    emotion, chatwindow
  },
    created(){
   this.id= this.$route.params.id
      axios.defaults.headers.common['satoken'] = store.state.token;
      axios.get(store.state.database+'user/userInfo').then(response=>{
        this.myname =response.data.nickName
        this.myid=response.data.uid
        this.myimg =response.data.icon

      })
    },

  beforeMount() {

  axios.get(store.state.database+'user/findById/'+this.id).then(response=>{
    if (response.data.credit>=100){
      this.evaluate=5
    }
    else {
      this.evaluate=response.data.credit/20
    }
    this.img=response.data.icon
    this.nickname=response.data.nickName

  })

},
  name: "otherpage",
  data() {
    return {
      textarea: null,
      disableInput: true,
      evaluate: 4,
      texts: ['极差', '差', '一般', '良好', '优秀'],
      money: 100,
      level: 5,
      activeIndex: '1',
      id :1,
      img:'',
      nickname:'null',
      myid: 1,
      myname: 'null',
      myimg:'',

  dialog: false,

}},
methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);

    },
    dialogShow() {
      this.dialog = true
    },
}
}
</script>

<style scoped>
.el-avatar {
  position: absolute;

  margin: -10px;
  top: 150px;
  left: 50%;
  transform: translateX(-48%);
}


.el-input {
  margin: 10px;
  width: 800px;
  height: 800px;
  position: absolute;
  left: 400px;
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
#name {
  position: absolute;
  top: 280px;
  color: gray;
  left: 50%;
  transform: translateX(-60%);
}
.el-rate {
  position: absolute;
  top: 364px;
  left: 50%;
  transform: translateX(-50%);
}

#xinyu {
  position: absolute;
  top: 343px;
  left: 665px;
  color: navajowhite
}

#bas {
  margin: 25px;
}

#particles-js {
  width: 100%;
  /* height: calc(100% - 100px);*/
  height: 100%;
  position: relative;
}


</style>
