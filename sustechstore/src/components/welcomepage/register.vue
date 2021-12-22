<template>
  <div class="box">
    <div class="zhuce">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="nickname" prop="nickname">
          <el-input v-model.number="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="studentID" prop="studentID">
          <el-input v-model.number="ruleForm.studentID"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-row>
            <el-col :span="10">
              <el-input v-model.number="ruleForm.studentID" disabled></el-input>
            </el-col>
            <el-col :span="14">
              <el-dropdown>
                <span class="el-dropdown-link">
                  @mail.sustech.edu.cn <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>@mail.sustech.edu.cn</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="10">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="14">
              <el-button type="success" plain @click="verifyEmail" style="padding: 10px 40px;" >Verify Email</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="confirm_psw" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link to="/">
            <el-button>返回登录界面</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {store} from "../../store/store";

export default {
  name: 'register',
  data() {
    var checkNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入nickname'));
      }
      callback();
    };
    var checkuserID = (rule, value, callback) => {
      const regUser = /^[0-9]{8}$/
      if (regUser.test(value)) {
        return callback()
      }
      callback(new Error('请输入student ID'))
    };
    var checkemail = (rule, value, callback) => {
      callback();
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    };
    var checkEmailCode = (rule, value, callback) => {
      if (this.ruleForm.verifiedcode === '') {
        callback(new Error("请验证邮箱"));
      } else if (value !== this.ruleForm.verifiedcode) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        email: '',
        nickname: '',
        studentID: '',
        code: '',
        verifiedcode: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        nickname: [
          {validator: checkNickname, trigger: 'blur'}
        ],
        studentID: [
          {validator: checkuserID, trigger: 'blur'}
        ],
        email: [
          {validator: checkemail, trigger: 'blur'}
        ],
        code: [
          {validator: checkEmailCode, trigger: 'blur', required: true}
        ]
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    returnForm() {
      // 返回login界面
      this.$router.push('/')
    },
    Form() {
      axios.post(store.state.database + 'user/register', {
        email: this.ruleForm.email,
        nickName: this.ruleForm.nickname,
        password: this.ruleForm.checkPass,
        uid: this.ruleForm.studentID
      }).then(response => {
        console.log(this.ruleForm.email)
        console.log(this.ruleForm.nickname)
        console.log(this.ruleForm.checkPass)
        console.log(this.ruleForm.studentID)
        console.log(response)
        if (response.data.data !== '注册成功') {
          alert(response.data.data)
        } else {
          this.$router.push('/')
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Form()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    verifyEmail() {
      let email = this.ruleForm.studentID + "@mail.sustech.edu.cn";
      axios.post(store.state.database + "user/verifyEmail/"+email ).then(response => {
        this.ruleForm.verifiedcode = response.data;
      })
    }
  },
  computed: {}
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

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
