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
                    @click="changeInfo=false"
                  >
                    修改信息
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-check"
                    size="medium"
                    round
                  >
                    确认修改
                  </el-button>
                </el-button-group>
              </div>
          <div>
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
  :disabled=changeInfo

  >
</el-input></div>
<div id="div3">
  性别:
 <el-radio :disabled=changeInfo v-model="radio" label="men">男</el-radio>
  <el-radio :disabled=changeInfo v-model="radio" label="women">女</el-radio></div>
          </div>
          <div id="div4">
  密码:
<el-input
  :placeholder=password
  v-model=inputpassword
  :disabled=changeInfo
   show-password
  ></el-input></div>
  <div id="div6">
  手机:
<el-input
  :placeholder=mobile
  v-model=inputMobile
  :disabled=changeInfo

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
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
  export default {
    name: 'selfinfo',
    data() {
      return {
          name:"aaa",
          email:"???@???.com",
          mobile:"",
          password:"密码",
          uid:null,
          changeInfo:true,
          radio:"men",
          inputName:"",
          inputEmail:"",
          inputGender:"",
          inputpassword:"",
          inputMobile:"",
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },

    },
    mounted(){
      axios.get('http://10.21.64.1:8181/user/userInfo').then(response=>{
        console.log(response)
        this.email=response.data.email;

      })
    }
  }
</script>
<style>
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
margin-top: 80px;

}
#div2{
  position: absolute;
  left: 60%;

}
#div3{
  position: absolute;
  left: 10%;
margin-top: 160px;
}
#div4{
  position: absolute;
  left: 60%;
margin-top: 80px;
}
#div5{
  position: absolute;
  left: 10%;

}
#div6{
  position: absolute;
  left: 60%;
margin-top: 160px;
}
</style>
