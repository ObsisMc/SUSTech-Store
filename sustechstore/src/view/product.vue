<template>
  <!--  <div class="note" :style="note">-->
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 70px;"></div>
    <el-container style="height: 100%;" v-on="getProductInformation()">
      <!--      <img src="../../assets/orange.jpg" alt="">-->
      <el-header height="60px">
        <el-row :gutter="20">
          <el-col :span="1">
            <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">Sofa</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">Chairs</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">Beds</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="2">
            <div class="header_tags">Sofas</div>
          </el-col>
          <el-col :span="2">
            <div class="header_tags">Chairs</div>
          </el-col>
          <el-col :span="1">
            <div class="header_tags">Beds</div>
          </el-col>
          <el-col :span="2" :offset="5">
            <el-row>
              <i class="el-icon-present"></i>
            </el-row>
            <el-row>
              <div class="Furniture">Furniture</div>
            </el-row>
          </el-col>
          <el-col :span="1" :offset="7" id="header_icon">
            <router-link to="./selfpage">
              <i class="el-icon-s-custom" @click="gotopersonalpage()"></i>
            </router-link>
          </el-col>
          <el-col :span="1" id="header_icon"><i class="el-icon-star-off"></i></el-col>
          <el-col :span="1">
            <el-badge :value="12" class="item">
              <el-button size="small"><i class="el-icon-sell"></i></el-button>
            </el-badge>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="650px" :style="defaultHeight">
          <!--          <el-carousel :interval="2000" type="card"  height="imgHeight" width="imgWidth">-->
          <!--            <el-carousel-item v-for="item in imgList" :key="item.id">-->
          <!--              <el-row>-->
          <!--                <el-col :span="25">-->
          <!--                  <img ref="imgHeight" :src="item.idView" class="banner_img" alt="加载失败"/>-->
          <!--                </el-col>-->
          <!--              </el-row>-->
          <!--            </el-carousel-item>-->
          <img :src="image" alt="失败" width=100% height=100%>
          <!--          </el-carousel>-->
        </el-aside>

        <!--        ??????????????????????????????????-->
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>

        <el-container>
          <el-main>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="main_first">
                  <a class="bold">{{ good.name }}</a>
                </div>
              </el-col>
              <el-col :span="2" :offset="20">
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
                <!--                <div>-->
                <!--                  <p id="reviews">-->
                <!--                    {{reviews}} reviews-->
                <!--                  </p>-->
                <!--                </div>-->
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
              <!--              <el-col>-->
              <!--                <p class="small_para">Home Delivery - ${{money_delivery}}</p>-->
              <!--              </el-col>-->
            </el-row>

          </el-main>
        </el-container>

      </el-container>
      <el-footer>
        <p id="foot">
          Welcome to Sustech Store
        </p>
      </el-footer>
    </el-container>
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
        "categoryleveloneId": 0,
        "categorylevelthreeId": 0,
        "categoryleveltwoId": 0,
        "createTime": "2021-11-24T13:46:26.467Z",
        "description": "string",
        "id": 0,
        "image": "string",
        "name": "string",
        "ownerId": 0,
        "price": 0,
        "updateTime": "2021-11-24T13:46:26.467Z"
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
      axios.get(store.state.database + 'cart/addCart/' + this.good.id).then(response => {
        alert("hi");
      });
    },
    mounted() {
    }
  },
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
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
</style>
