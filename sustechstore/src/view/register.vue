<template>
  <div class="box">
    <div class="zhuce">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="nickname" prop="user">
          <el-input v-model="ruleForm.user" clearable></el-input>
        </el-form-item>
        <el-form-item label="uid" prop="mobile">
          <el-input v-model="ruleForm.userID" clearable></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="ruleForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" clearable></el-input>
        </el-form-item>
        <el-form-item label=" confirm_psw" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">Register</el-button>
          <el-button @click="returnForm">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    var checkUser = (rule, value, callback) => {
      const regUser = /^[a-zA-Z0-9_-]{3,16}$/
      if (regUser.test(value)) {
        return callback()
      }
      callback(new Error('用户名不能为空'))
    }
    var checkMobile = (rule, value, callback) => {
      const regUser = /^[0-9]{1,8}$/
      if (regUser.test(value)) {
        return callback()
      }
      callback(new Error('student ID 不能为空'))
    }
    var checkEmail = (rule, value, callback) => {
      const regUser = /^[0-9]{1,8}@mail\.sustech\.edu\.cn$/
      if (regUser.test(value)) {
        return callback()
      }
      callback(new Error('请输入SUSTECH邮箱'))
    }
    var validatePass = (rule, value, callback) => {
      const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/
      if (regPass.test(value)){
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
      // eslint-disable-next-line standard/no-callback-literal
      callback('必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间')

      //  else {
      //   if (this.ruleForm.checkPass !== '') {
      //     this.$refs.ruleForm.validateField('checkPass')
      //   }
      //   callback()
      // }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user: '',
        userID: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        user: [{ validator: checkUser, trigger: 'blur' }],
        userID: [{ validator: checkMobile, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    returnForm () {
      // 返回login界面
      this.$router.push('/')
    },
    submitForm () {
      // var data = this.item
      // this.$http.post('/api/employee/login', data, { emulateJSON: false }).then(
      //   (response) => {
      //     console.log(response.body)
      //     this.grouplist = response.body
      //     alert('注册成功！')
      //     this.$router.push('/login')
      //   },
      //   (response) => {
      //     console.log(response)
      //     alert('出问题啦！！！')
      //   }
      // )
      axios.post('http://10.21.64.1:8181/user/register', {
        email: this.email,
        user: this.user,
        chechpass: this.checkPass,
        userID: this.userID
      }).then(response => {
        console.log(response)
        if (response.data === false){
          alert('Something wrong. Please try again')
        }else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  height: 100%;
  background-color: #2e4e6e;
}
.zhuce {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
}
.el-form-item {
  margin-top: 30px;
  width: 400px;
}
</style>
