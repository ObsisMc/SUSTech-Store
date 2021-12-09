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

        <div class="talk" v-show="flag">
          <!--div class="talk-header">
            <div class="talk-header-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduocaozuo"></use>
              </svg>
              <svg class="icon" aria-hidden="true" @click="exit">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
            </div>
          </div-->

          <div class="talk-content ">

            <div v-for="item  in contentDiv" style="margin-top: 20px">
              <div style="text-align: center">
                <p style="font-size: 1px;color: #9b9b9b"> {{ item.time }}</p>
              </div>
              <div style="display: flex;">

                <div class="name_right" v-if="item.show">
                  <p style="font-size: 1px; "> {{ item.name }} </p>
                </div>
                <div class="url_right" v-if="item.show">
                  <el-avatar shape="circle" :size="30" :src="item.url"></el-avatar>
                </div>
                <div class="url-left" v-if="!item.show">
                  <el-avatar shape="circle" :size="30" :src="item.url"></el-avatar>
                </div>


                <div class="name_left" v-if="!item.show">
                  <p style="font-size: 1px;"> {{ item.name }} </p>
                </div>

              </div>


              <div v-html="item.content"
                   class="content_left" v-if="!item.show">
              </div>

              <div v-html="item.content"
                   class="content_right" v-if="item.show">
              </div>

            </div>

          </div>


          <div class=" talk-message
                ">

            <div class="talk-message-face">
              <svg class="icon" aria-hidden="true" @click="isShow">
                <use xlink:href="#icon-biaoqing"></use>
              </svg>
              <emotion :emotionIsShow="emotionIsShow" @sendEmotionSelect="getValue"></emotion>
            </div>
            <div class="talk-message-content">

              <el-input
                v-model="textarea"
                resize="none"
                type="textarea"
                rows="1"
                @keyup.enter.native="submit"
              ></el-input>
            </div>
            <div class="talk-message-send">
              <el-button type="text" style="color:#9b9b9b" @click="submit">发送</el-button>
            </div>
          </div>

        </div>

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

export default {
  components: {
    emotion
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
      url: "https:/rescdn.qqmail.com/node/wwopen/wwopenmng/images/qq_emotion/qq/",
      eList: ['占位', '微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
        '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
        '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
        '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
        '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
        '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
        '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
        '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
        '激动', '街舞', '献吻', '左太极', '右太极'],
      contentDiv: [],
      textarea: "",
      textarea1: "",
      emotionIsShow: false, // 表情面板控制出现
      divIptEmotion: [], // 接收表情组件传过来的数据
      a: [],
      flag: true,
      show: false,
      closeChat: this.close,
      username: "zrh",
      othername: "???",
      userPhoto: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      otherPhoto: "https://img1.baidu.com/it/u=2805547224,266493745&fm=26&fmt=auto"


    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    dialogShow() {
      this.dialog = true
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let box = this.$el.querySelector(".talk-content")
        box.scrollTop = box.scrollHeight
      })
    },
    sendInfo() {
      alert("aaa")
    },
    isShow() {
      if (this.emotionIsShow === false) {
        this.emotionIsShow = true;
      } else {
        this.emotionIsShow = false;
      }
      // this.emotionIsShow = !this.emotionIsShow;
    },
    iptFocus() {
      this.emotionIsShow = true;
    },
    getValue(val, item) {
      let img = '<img src="' + this.url + val + '.png"  style= "width: 22px;height: 22px">';
      let el = '[' + item + ']'
      this.emotionIsShow = false;
      this.textarea = this.textarea + el;
      this.textarea1 += img;
    },
    submit() {
      let a = this.textarea;
      let pre = 0;
      let last = 0;
      let flag = false;
      while (true) {
        if (!a.match("]")) {
          break;
        }
        pre = a.indexOf("[");
        last = a.indexOf("]");
        let face = a.substring(pre + 1, last);
        let b;
        for (let j = 0; j < this.eList.length; j++) {
          if (face == this.eList[j]) {
            b = j;
            break;
          }
        }

        let img = '<img src="' + this.url + b + '.png"  style= "width: 22px;height: 22px">';

        /*   a = a.substring(0, pre) + img + a.substring(last + 1, a.length);*/
        a = a.substring(0, pre) + img + a.substring(last + 1, a.length);
        pre = 0;
        last = 0;
        flag = false;
      }
      let c = {
        "name": this.username,
        /*   "url": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",*/
        "url": this.userPhoto,
        "content": a,
        "show": true,
        "time": new Date().toLocaleTimeString()
      };
      let d = {
        "name": this.othername,
        /*      "url": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",*/
        "url": this.otherPhoto,
        "content": "zrhyyds啊啊啊啊啊啊啊啊啊啊",
        "show": false,
        "time": new Date().toLocaleTimeString()
      };
      this.textarea = "";
      this.textarea1 = "";
      this.contentDiv.push(c);
      this.contentDiv.push(d);
    },
    exit() {
      this.$emit('close', this.fleg)
    }

  },
  mounted() {
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  },

};
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
