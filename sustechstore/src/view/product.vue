<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 70px;"></div>
    <el-row>
      <el-col :span="12">
        <picexhibition :imgurllist="good.image"></picexhibition>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>
      </el-col>
      <el-col :span="11">
        <el-row>
          <discription :rating="rating" @toOrder="toOrder" @addToCart="addToCart">
            <template v-slot:name>
              {{ good.name }}
            </template>
            <template v-slot:discription>
              {{ good.description }}
            </template>
            <template v-slot:price>
              {{ good.price }}
            </template>
          </discription>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <userinfo :rating="rating">
            <template v-slot:owner>
              unamed
            </template>
          </userinfo>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import {store} from "../store/store";
import Searchnavigator from "../components/wholenavigator";
import Picexhibition from "../components/goodspage/picexhibition";
import Discription from "../components/goodspage/discription";
import Userinfo from "../components/goodspage/userinfo";

export default {
  name: 'product',
  components: {Userinfo, Discription, Picexhibition, Searchnavigator},
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
        description: "A sectional sofa or an L shaped sofa can make a great addition to your living room based on your needs",
        id: 0,
        image: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
        name: "Product name",
        ownerId: 0,
        price: 1250,
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
        path: '/checkout/' + this.good.id + '/' + this.orderstatus, query: {status: this.orderstatus}
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
    console.log(store.state.token);
    axios.defaults.headers.common['satoken'] = JSON.parse(sessionStorage.getItem('token'));
    this.getProductInformation();
  }
}
</script>

<style scoped>
#foot {
  text-align: center;
}


#reviews {
  font-size: small;
}

#header_icon {
  margin-top: 8px;
}


/deep/ .el-divider--vertical {
  height: calc(80vh);
  margin: 5px 0;
}
/deep/ .el-divider--horizontal{
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
