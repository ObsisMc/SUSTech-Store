<template>
  <div class="personalCenter">
    <el-container>

      <el-container>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="float: left"><b>用户信息</b></span>
                <el-button-group
                  style="float: right; padding: 3px 0"
                  type="text"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="medium"
                    round
                    @click="changeInfo=!changeInfo"
                  >
                    修改信息
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="medium"
                    round
                    @click="changePhoto"
                  >
                    修改头像
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="medium"
                    round
                    @click="changePassword=!changePassword"

                  >
                    修改密码
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-check"
                    size="medium"
                    round
                    @click="submit()"
                  >
                    确认修改
                  </el-button>
                </el-button-group>
              </div>
          <div>

              <el-avatar id="ava"
      :src='ava'
        :size="150"
      ></el-avatar>

<photoUpload @getPhoto='addPhoto' id='photo'>
</photoUpload>

<div id="div1">
  用户昵称:
<el-input
  :placeholder=name
  v-model=inputName
  :disabled=changeInfo

 >
</el-input></div>
<div id="div5">
 uid:
<el-input
  :placeholder=uid
  v-model=uid
  :disabled="true"

 >
</el-input></div>
<div id="div2">
  邮箱:
<el-input
  :placeholder=email
  v-model=inputEmail
  :disabled="true"

  >
</el-input></div>
<div id="div3">
  性别:
 <el-radio :disabled="true" v-model="radio" label="men">男</el-radio>
  <el-radio :disabled="true" v-model="radio" label="women">女</el-radio></div>
          </div>
          <div id="div4">
  密码:
<el-input
  :placeholder="password"
  v-model=inputpassword
  :disabled="changePassword"
   show-password
  ></el-input></div>
              <div id="div7"  v-if="!changePassword">
                确认密码:
                <el-input
                  v-model=checkpassword

                  show-password
                ></el-input></div>
  <div id="div6">
  手机:
<el-input
  :placeholder=mobile
  v-model=inputMobile
  :disabled="true"

  >
</el-input></div>
            </el-card>

          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import { store } from '../store/store'
import photoUpload from '../components/photoUpload/photoUpload.vue'
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
  export default {
        inject:['reload'],
    name: 'selfinfo',
    components :{
      photoUpload
    },
    data() {
      return {
          name:"mihoyo",
          email:"11111111@mhy.com",
          mobile:"",
          password:"密码",
          uid:11111111,
          changeInfo:true,
          radio:"women",
          ava:'',
          inputName:"",
          inputEmail:"",
          inputGender:"",
          inputpassword:"",
       truepassword:"",
        checkpassword:'',
          inputMobile:"",
          base64PhotoList:[],
        changePassword: true,
        newPassword:null,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
       addPhoto(photo){
    this.base64PhotoList.push(photo)
  },
  changePhoto(){
    axios.defaults.headers.common["satoken"] = store.state.token;
    axios.post(store.state.database+'/user/addUserIcon',this.base64PhotoList).then(response=>{
      console.log(response)
      this.reload();

    })
  },
      changePass(){
       if (this.checkpassword!==this.inputpassword){
         this.$message.error("unmatched password! !");
       }
       else {
         axios.defaults.headers.common["satoken"] = store.state.token;
         axios.post(store.state.database+'/user/changePassword/'+this.inputpassword).then(response=>{
           this.$message({
             message: "change password successfully!",
             type: "success",
           });

         })
       }
      },

  submit(){
        if (!this.changePassword){
        this.changePass();}
    axios.post(store.state.database+'/user/changeNickname/'+this.inputName).then(response=>{
      console.log(response)
      this.$message({
        message: "submit successfully!",
        type: "success",
      });
      this.reload()
    })

  }
    },
    created(){

        axios.defaults.headers.common['satoken'] = store.state.token;
      axios.get(store.state.database+'user/userInfo').then(response=>{
        console.log(response)
        this.email=response.data.email;
        this.name =response.data.nickName
        this.inputName=response.data.nickName
        this.mobile=response.data.mobile
        this.uid=response.data.uid
        this.ava=response.data.icon
        this.truepassword=response.data.password
        if(response.data.uid){
            this.radio="men"
        }
      })
    }
  }
</script>
<style scoped>
  .el-header {
    line-height: 40px;
    text-align: center;
    background-color: #b3c0d1;
  }

  .el-main {
    line-height: 36px;
    text-align: center;
    background-color: #e9eef3;
  }

  .demo-basic--circle {
    align: 'center';
    margin-top: 30px;
    margin-left: 150px;
  }
  .block {
    margin-left: 25px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 1368px;
    border-radius: 30px;
    height: 100%;
  }
  #personalCenter{
    margin: 0px;
  }
  .el-container{
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  .el-card{
    height: 600px;
  }
  .el-input{
    width: 300px;
 /*   left: -30%;*/
  }
#div1{
  position: absolute;
  left: 10%;
margin-top: 180px;

}
#div2{
  position: absolute;
  left: 60%;
  margin-top: 80px;

}
#div3{
  position: absolute;
  left: 10%;
margin-top: 280px;
}
#div4{
  position: absolute;
  left: 60%;
margin-top: 180px;
}
#div5{
  position: absolute;
  left: 10%;
  margin-top:80px ;


}
#div6{
  position: absolute;
  left: 10%;
margin-top: 380px;
}
#div7{
  position: absolute;
  left: 60%;
  margin-top: 280px;
}
#ava{
 position: absolute;
 left: 46%;
 margin-top: 0px;
transform: translateX(-40%)
 }
#photo{
  position: absolute;
 left: 44%;
 margin-top: 150px;
 transform: translateX(-30%)
}
</style>
