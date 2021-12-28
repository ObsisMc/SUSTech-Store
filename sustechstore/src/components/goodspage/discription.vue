<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <span class="title">
          <slot name="name"></slot>
        </span>
        <el-tag style="float: left; margin-left: 5px;" size="medium" type="success" v-if="gooodtype===0">出售</el-tag>
        <el-tag style="float: left; margin-left: 5px;" size="medium" v-if="gooodtype===1">求购</el-tag>
      </el-col>

    </el-row>

    <el-row margin="100px" id="para_margin">
      <p class="small_para">
        <slot name="discription"></slot>
      </p>
    </el-row>

    <el-row id="money_margin">
        <span class="pricespan">
         ¥  <slot name="price"></slot>
        </span>
    </el-row>

    <el-row>
      <div>
        <el-rate
          v-model="rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          :colors="ratingobj.colors"
          style="float: left;">
        </el-rate>
      </div>
    </el-row>

    <el-row style="margin-top: 30px;">
      <el-row style="float: left;">
        <span class="itemstitle"> Items </span>
        <el-checkbox :indeterminate="products.isIndeterminate"
                     v-model="products.checkAll"
                     @change="handleCheckAllChange"
        >
        </el-checkbox>
      </el-row>

      <!--only for change line-->
      <el-row>
      </el-row>

      <el-checkbox-group v-model="products.checkedCities" @change="handleCheckedCitiesChange"
                         style="float: left; margin-top: 10px;">
        <div v-for="city in products.cities" :key="city">
          <el-checkbox :label="city" style="float: left; margin-bottom: 10px;">{{ city }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-row>

    <el-row style="margin-top: 40px;">
      <el-col :span="12">
        <el-button plain @click="toOrder" class="productbutton">Buy Now</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="addToCart" class="productbutton">Add to basket</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import {store} from "../../store/store";

const cityOptions = ['shanghai', 'beijing', 'guangzhou', 'shenzhen'];
export default {
  name: "discription",
  props: ["rating", "ownerid","type"],
  data() {
    return {
      ratingobj: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      products: {
        checkAll: false,
        checkedCities: ['shanghai', 'beijing'],
        cities: cityOptions,
        isIndeterminate: true
      }
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.products.checkedCities = val ? cityOptions : [];
      this.products.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.products.checkAll = checkedCount === this.products.cities.length;
      this.products.isIndeterminate = checkedCount > 0 && checkedCount < this.products.cities.length;
    },
    toOrder() {
      axios.get(store.state.database + "user/userInfo").then(response => {
        if (response.status === 200) {
          if (response.data.uid === this.ownerid) {
            this.$message({
              message: "You cannot buy your own product",
              type: "error"
            })
          } else {
            this.$emit("toOrder");
          }
        }
      })

    },
    addToCart() {
      axios.get(store.state.database + "user/userInfo").then(response => {
        if (response.status === 200) {
          if (response.data.uid === this.ownerid) {
            this.$message({
              message: "You cannot collect your own product",
              type: "error"
            })
          } else {
            this.$emit("addToCart",this.type);
          }
        }
      })
    }
  },
  computed:{
    gooodtype(){
      if(this.type==="SELL"){
        return 0;
      }else{
        return 1;
      }
    }
  }
}
</script>

<style scoped>
.title {
  float: left;
  text-align: left;
  font-weight: 700;
  font-size: xx-large;
  margin-top: 20px;
}

#para_margin {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}

.small_para {
  font-family: "Microsoft Yahei", serif;
  font-size: small;
  text-align: left;
  margin-right: 20px;
}

#money_margin {
  margin-bottom: 10px;
  text-align: left;
}

.pricespan {
  color: #FCC200;
  font-weight: 580;
  font-size: 25px;
}

.el-button {
  padding: 25px 80px;
  float: left;
}

.itemstitle {
  font-weight: 540;
  font-size: 20px;
}
</style>
