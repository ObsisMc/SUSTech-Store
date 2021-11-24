<template>
<!--  <div class="note" :style="note">-->
  <div>
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
                <el-dropdown-item icon="el-icon-circle-plus" >Chairs</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">Beds</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="2"><div class="header_tags">Sofas</div></el-col>
          <el-col :span="2"><div class="header_tags">Chairs</div></el-col>
          <el-col :span="1"><div class="header_tags">Beds</div></el-col>
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
            <img :src="imgList.idView" alt="失败" width=100% height=100%>
<!--          </el-carousel>-->
        </el-aside>

        <!--        ??????????????????????????????????-->
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>

        <el-container>
          <el-main>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="main_first">
                  <a class="bold">{{name}}</a>
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
                {{description}}
              </p>
            </el-row>

            <el-row id="money_margin">
              <a class="bold">{{price}}</a>
            </el-row>

            <el-row>
              <el-col :span="7">
                <div class="main_rate" id="rate_margin">
                  <el-rate
                    v-model="value"
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
                  <router-link to="shoppingcart">
                  <el-button type="primary" plain>Buy Now</el-button>
                  </router-link>
                </button>
              </el-col>
              <el-col :span="6" offset="8">
                <button class="button_margin">
                  <el-button type="success" plain>Add to basket</el-button>
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
export default {
  name: 'product',
  data () {
    return {
      value: 3.7,
      // item: './assets/sofa.png'
      imgList: [
        {id: 0, idView: this.image}
      ],
      note: {
        // backgroundImage: 'url(' + require('../../assets/organic.png') + ')'

      },
      reviews: 441,
      money_delivery: 10,
      description: '',
      image: '',
      name: '',
      price: ''
    }
  },
  methods: {
    // this.$router.push('/main'),
    getProductInformation () {
      let goodid = this.$route.query.id;
      axios.get( store.state.database + 'product/findById/' + goodid
      )
        .then(response => {
          console.log(response)
          this.description = response.data.description
          this.image = response.data.image
          this.name = response.data.name
          this.price = response.data.price
        })
    },
    mounted () {
    }
  }
}
</script>

<style scoped>
#foot{
  text-align: center;
}
#para_margin{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}
#money_margin{
  margin-bottom: 10px;
  text-align: left;
}
#rate_margin{
  margin-top: 15px;
}
#home_deliver_margin{
  margin-top: 50px;
}
#reviews{
  font-size: small;
}
#header_icon{
  margin-top: 8px;
}

.button_margin{
  margin-top: 20px;
  border: none
}

.small_para{
  font-family: "Lucida Console", Monaco, monospace;
  font-size: small;
  text-align: left;
}

.bold{
  text-align: left;
  font-weight: bold;
  font-size: x-large;
}
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
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
.el-main{
}
.el-aside{}
.el-header{
  /*background-color: darkgray;*/
}
.el-footer{
  margin-top: 150px;
  /*background-color: #3399ff;*/
}
</style>
