<template xmlns:text-align="http://www.w3.org/1999/xhtml">
  <div id="app">
    <!--    <router-view/>-->
    <el-container style="height: 100%;">

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
          <el-col :span="1" :offset="7" id="header_icon"><i class="el-icon-s-custom"></i></el-col>
          <el-col :span="1" id="header_icon"><i class="el-icon-star-off"></i></el-col>
          <el-col :span="1">
            <el-badge :value="12" class="item">
              <el-button size="small"><i class="el-icon-sell"></i></el-button>
            </el-badge>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <!--        <el-aside width="650px">-->
        <!--          <img src="./assets/sofa.png" alt="沙发">-->
        <!--        </el-aside>-->
        <el-aside width="650px" :style="defaultHeight">
          <el-carousel :interval="2000" type="card"  height="imgHeight" width="imgWidth">
            <el-carousel-item v-for="item in imgList" :key="item.id">
              <el-row>
                <el-col :span="25">
                  <img ref="imgHeight" :src="item.idView" class="banner_img" alt="加载失败"/>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </el-aside>

        <!--        ??????????????????????????????????-->
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>

        <el-container>
          <el-main>
            <el-row :gutter="20">
              <el-col :span="2">
                <div class="main_first">
                  <a class="bold">llana</a>
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
                A sectional sofa or an L shaped sofa can make a great addition to your living room based on your needs
              </p>
            </el-row>

            <el-row id="money_margin">
              <a class="bold">$ 430.99</a>
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
                <div>
                  <p id="reviews">
                    {{reviews}} reviews
                  </p>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <button class="button_margin">
                  <el-button type="primary" plain>Buy Now</el-button>
                </button>
              </el-col>
              <el-col :span="6" offset="8">
                <button class="button_margin">
                  <el-button type="success" plain>Add to basket</el-button>
                </button>
              </el-col>
            </el-row>

            <el-row id="home_deliver_margin">
              <el-col>
                <p class="small_para">Home Delivery - ${{money_delivery}}</p>
              </el-col>
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

export default {
  name: 'goodstest',
  mounted () {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-chitose/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
        display: { position: 'left', width: 150, height: 300 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  },

  data () {
    return {
      value: 3.7,
      // item: './assets/sofa.png'
      imgList: [
        {id: 0, idView: require('@/assets/logo.png')},
        {id: 1, idView: require('@/assets/logo.png')},
        {id: 2, idView: require('@/assets/logo.png')}
      ],
      reviews: 441,
      money_delivery: 10
    }
  }
}
</script>

<style>
#foot{
  text-align: center;
  margin-top: 100px;
}
#para_margin{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}
#money_margin{
  margin-bottom: 10px;
}
#rate_margin{
  margin-top: 15px;
}
#home_deliver_margin{
  margin-top: 25px;
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
}

.bold{
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
</style>
