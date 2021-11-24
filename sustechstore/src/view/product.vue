<template>
  <!--  <div class="note" :style="note">-->
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 70px;"></div>
    <el-row>
      <el-col :span="16">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="失败"
                  fit="cover"></el-image>
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="main_first">
              <a class="bold">{{ good.name }}</a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="main_first">
              <i class="el-icon-star-off"></i>
            </div>
          </el-col>
        </el-row>

        <el-row margin="100px" id="para_margin">
          <p class="small_para">
            {{ good.description }}
          </p>
        </el-row>

        <el-row id="money_margin">
          <a class="bold">{{ good.price }}</a>
        </el-row>

        <el-row>
          <el-col :span="7">
            <div class="main_rate" id="rate_margin">
              <el-rate
                v-model="rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </el-col>
          <el-col :span="7">
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <button class="button_margin">
              <el-button type="primary" plain @click="toOrder">Buy Now</el-button>
            </button>
          </el-col>
          <el-col :span="6" offset="8">
            <button class="button_margin">
              <el-button type="success" plain @click="addToCart">Add to basket</el-button>
            </button>
          </el-col>
        </el-row>

        <el-row id="home_deliver_margin">
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p id="foot">
          Welcome to Sustech Store
        </p>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import {store} from "../store/store";
import Searchnavigator from "../components/searchpage2/searchnavigator";

export default {
  name: 'product',
  components: {Searchnavigator},
  data() {
    return {
      rating: 3.7,
      note: {},
      reviews: 441,
      orderid: 0,
      orderstatus: 0,

      good: {
        categoryleveloneId: 0,
        categorylevelthreeId: 0,
        categoryleveltwoId: 0,
        createTime: "2021-11-24T13:46:26.467Z",
        description: "string",
        id: 0,
        image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        name: "string",
        ownerId: 0,
        price: 0,
        updateTime: "2021-11-24T13:46:26.467Z"
      }
    }
  },
  methods: {
    // this.$router.push('/main'),
    getProductInformation() {
      let goodid = this.$route.query.id;
      axios.get(store.state.database + 'product/findById/' + goodid
      ).then(response => {
        this.good = response.data;
      })
    },
    toOrder() {
      this.$router.push({
        path: '/checkout/' + this.orderid + '/' + this.orderstatus, query: {status: this.orderstatus}
      });
    },
    addToCart() {
      axios.post(store.state.database + 'cart/addCart/' + this.good.id).then(response => {
        if (response.status === 200) {
          this.$message({
            message: 'Adding to shopping cart successfully!',
            type: 'success'
          });
        }
      });
    }
  },
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
    this.getProductInformation();
  }
}
</script>

<style scoped>
#foot {
  text-align: center;
}

#para_margin {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}

#money_margin {
  margin-bottom: 10px;
  text-align: left;
}

#rate_margin {
  margin-top: 15px;
}

#home_deliver_margin {
  margin-top: 50px;
}

#reviews {
  font-size: small;
}

#header_icon {
  margin-top: 8px;
}

.button_margin {
  margin-top: 20px;
  border: none
}

.small_para {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: small;
  text-align: left;
}

.bold {
  text-align: left;
  font-weight: bold;
  font-size: x-large;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-main {
}

.el-aside {
}

.el-header {
  /*background-color: darkgray;*/
}

.el-footer {
  margin-top: 150px;
  /*background-color: #3399ff;*/
}

.el-image {
  /*border-radius: 30px;*/
  width: 300px;
  height: 300px;
}

/deep/ .el-divider--vertical {
  height: 500px;
  margin: 30px 20px;
}
</style>
