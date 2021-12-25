<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
             v-loading="loading"
             element-loading-text="submiting order...">
      <el-form-item label="Good's type">
        <el-radio-group v-model="ruleForm.goodtype" disabled>
          <el-radio :label="0"> For sale</el-radio>
          <el-radio :label="1">Wanted</el-radio>
          {{ ruleForm.goodtype }}
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="goodcontainer">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-image
                :src="goods.image"
                fit="fit">
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
                <span class="roughdetail" style="margin-left: 10px;">{{ goods.nickName }}</span>
                <!--                <i class="el-icon-user roughdetail">{{goods.ownerId}}</i>-->
              </el-row>
            </el-col>
            <el-col :span="8">
              <ul style="overflow:auto;height:100px;">
                <li v-for="i in 1"
                    style="background-color: #e8f3fe;list-style-type:none; margin:3px 3px; color: #7dbcfc;">
                  {{ goods.description }}
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
          <el-option label="SUSTECH" value="SUSTECH"></el-option>
          <el-option label="others" value="others"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Detail Address" prop="detailaddress">
        <el-select v-if="ruleForm.region==='SUSTECH'" v-model="ruleForm.detailaddress"
                   placeholder="Select detail address">
          <el-option :label="this.ruleForm.schoolregin.dorm2" :value="this.ruleForm.schoolregin.dorm2"></el-option>
          <el-option :label="this.ruleForm.schoolregin.lakedorm" :value="this.ruleForm.schoolregin.lakedorm"></el-option>
          <el-option :label="this.ruleForm.schoolregin.xingdorm" :value="this.ruleForm.schoolregin.xingdorm"></el-option>
          <el-option :label="this.ruleForm.schoolregin.lidorm" :value="this.ruleForm.schoolregin.lidorm"></el-option>
          <el-option :label="this.ruleForm.schoolregin.librarydan" :value="this.ruleForm.schoolregin.librarydan"></el-option>
          <el-option :label="this.ruleForm.schoolregin.engineerbuliding" :value="this.ruleForm.schoolregin.engineerbuliding"></el-option>
        </el-select>
        <el-input v-if="ruleForm.region==='others'" v-model="ruleForm.detailaddress"
                  placeholder="Enter detail address"
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
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {store} from "../../store/store";
import axios from "axios";

export default {
  name: "submitorder",
  data() {
    return {
      ruleForm: {
        goodtype: 0,
        detailaddress: '',
        schoolregin: {
          dorm2: "南方科技大学二期宿舍11栋",
          lakedorm: "南方科技大学书院5栋",
          xingdorm: "南方科技大学欣园宿舍",
          lidorm: "南方科技大学荔园4栋",
          librarydan: "南方科技大学一丹图书馆",
          teachingbuliding: "南方科技大学第一教学楼",
          engineerbuliding: "南方科技大学工学院"
        },
        region: 'SUSTECH',
        paymode: false,
        notes: ''
      },
      rules: {
        detailaddress: [
          {required: true, message: 'Please input detail address', trigger: 'change'}
        ]
      },
      goods: {
        "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        "id": 733,
        "name": "Hambuger ad",
        "ownerId": 'unamed',
        "price": 1000,
        "description": "string",
        "icon": "string",
        "nickName": "string"
      },

      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          axios.post(store.state.database + 'order/add/' + this.goods.id + '/' + this.ruleForm.detailaddress).then(response => {
            if (response.status === 200) {
              this.loading = false;
              this.$route.query.orderid = response.data;
              this.$message({
                message: "Submit order successfully",
                type: "success"
              });
              this.$emit("nextStatus");
            } else {
              this.$router.push({name: 'shoppningcart'});
              this.$message({
                message: "Fail to submit order",
                type: "error"
              })
            }
          })
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
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
    // TODO 需要改成VO
    axios.get(store.state.database + 'product/findProductVOById/' + this.$route.params.id).then(response => {
      if (response.status === 200) {
        this.goods = response.data;
      }
    })
  },
  computed: {
    // todo 这里需要改善
    getDetailAdress: function () {

    }
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
  font-weight: bold;
}

.roughdetail {
  float: left;
  margin-top: 5px;
}

/deep/ .el-form-item__label {
  font-size: 10px;
}
</style>
