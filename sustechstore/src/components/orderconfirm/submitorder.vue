<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
             v-loading="loading"
             element-loading-text="submiting order...">
      <el-form-item label="Good's type">
        <el-radio-group v-model="ruleForm.goodtype" disabled>
          <el-radio :label="0"> For slae</el-radio>
          <el-radio :label="1">Wanted</el-radio>
          {{ ruleForm.goodtype }}
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="goodcontainer">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-image
                :src=goods.fileName
                fit="cover">
              </el-image>

            </el-col>
            <el-col :span="6">

              <el-row>

          <span class="goodtitle">
            {{ goods.name }}
          </span>
              </el-row>
              <el-row>
                <el-avatar class="roughdetail" :size="40"> Cate</el-avatar>
                <span class="roughdetail" style="margin-left: 10px;">{{ goods.categoryleveloneId }}</span>
              </el-row>
              <el-row>
                <el-avatar class="roughdetail"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span class="roughdetail" style="margin-left: 10px;">{{ goods.ownerId }}</span>
                <!--                <i class="el-icon-user roughdetail">{{goods.ownerId}}</i>-->
              </el-row>
            </el-col>
            <el-col :span="8">
              <ul style="overflow:auto;height:100px;">
                <li v-for="i in 10"
                    style="background-color: #e8f3fe;list-style-type:none; margin:3px 3px; color: #7dbcfc;">
                  this is items of good
                </li>
              </ul>
            </el-col>
            <el-col :span="4">
              <el-image :src="require('@/assets/rmb32.png')" style="width: 25px; height: 25px;"></el-image>
              <span style="color: #FCC200; font-size: 25px;  line-height: 100px; "> {{ goods.price }}</span>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="Address" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Select trade address">
          <el-option label="The second dorm" value="dorm2"></el-option>
          <el-option label="Lake dorm" value="dormlake"></el-option>
        </el-select>
        <el-input v-model="ruleForm.detailaddress" placeholder="Enter detail address"
                  style="width: 50%; margin-left: 20px;"></el-input>
      </el-form-item>

      <el-form-item label="Payment" prop="paymode">
        <el-switch v-model="ruleForm.paymode" active-text="Pay online"
                   inactive-text="Pay offline"></el-switch>
      </el-form-item>

      <el-form-item label="Notes" prop="notes">
        <el-input type="textarea" v-model="ruleForm.notes" placeholder="Any other notes"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "submitorder",
  data() {
    return {
      ruleForm: {
        goodtype: 0,
        detailaddress: '',
        region: '',
        paymode: false,
        notes: ''
      },
      rules: {
        region: [
          {required: true, message: 'Please select a address', trigger: 'change'}
        ]
      },
      goods: {
        "categoryleveloneId": "study",
        "categorylevelthreeId": 0,
        "categoryleveltwoId": 0,
        "description": "",
        "fileName": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        "id": 0,
        "name": "Hambuger adfsadf sadfsdf",
        "ownerId": 'unamed',
        "price": 1000,
        "orderid": 0
      },

      loading:false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          let nextstatus = parseInt(this.$route.query.status)+1;
          setTimeout(() => {
            this.$router.push({path: '/checkout/' + this.goods.orderid+'/'+nextstatus, query: {status: nextstatus}});
            this.loading = false;
          }, 1000)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted(){
    // axios.get(store.state.database + '').then(response=>{
    //
    // })
  }
}
</script>

<style scoped>
.goodcontainer {
  padding: 5px;
  margin: 10px;
  /*background-color: #2c3e50;*/
}


.el-image {
  border-radius: 30px;
  width: 150px;
  height: 150px;
}

.goodtitle {
  float: left;
  font-size: 20px;
}

.roughdetail {
  float: left;
  margin-top: 5px;
}

/deep/ .el-form-item__label {
  font-size: 10px;
}
</style>
