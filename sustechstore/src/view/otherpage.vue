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
      <el-dialog title="聊天" :visible.sync="dialog">
      <chatwindow>
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
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="150"
      ></el-avatar>

      <h4 id="xinyu">信誉等级:
      </h4>
      <el-rate v-model="value" :show-text=true :disabled=true text-color="#F56C6C" v-bind="{texts:texts}"></el-rate>
      <el-input
        v-bind="{ placeholder: intro, disabled: disableInput }"
        v-model="textarea"
        type="text"
        maxlength="40"
        :rows="3"
        show-word-limit
        label="个人简介"
      >
      </el-input>


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

export default {
  components: {
    emotion, chatwindow
  },

   /* created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2d/',
        pluginJsPath: '/',
        pluginModelPath: 'yuri',
        tagMode: false,
        debug: false,
        model: {jsonPath: 'static/live2d/yuri/model.json'},
        display: {position: 'left', width: 250, height: 400},
        mobile: {show: true},
        log: false
      })
    }, 1000)
  },*/
  name: "otherpage",
  data() {
    return {
      intro: "这是一坨简介，啦啦啦啦啦啦",
      textarea: null,
      disableInput: true,
      value: 4,
      texts: ['极差', '差', '一般', '良好', '优秀'],
      money: 100,
      level: 5,
      activeIndex: '1',
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

<style>
.el-avatar {
  position: absolute;
  left: 710px;
  margin: -10px;
  top: 150px;
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

#changePhoto {
  position: absolute;
  top: 300px;
  color: gray;
  left: 710px;
}

#changeInfo {
  position: absolute;
  top: 410px;
  left: 1200px;
}

.el-rate {
  position: absolute;
  top: 370px;
  left: 750px;
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
