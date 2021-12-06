<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 70px;"></div>
    <el-row>
      <el-col :span="12" >
        <picexhibition :imgurl="good.image"></picexhibition>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>
      </el-col>
      <discription @toOrder="toOrder" @addToChart="addToCart">
        <template v-slot:name>
          {{good.name}}
        </template>
      </discription>

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
import Searchnavigator from "../components/wholenavigator";
import Picexhibition from "../components/goodspage/picexhibition";
import Discription from "../components/goodspage/discription";

export default {
  name: 'product',
  components: {Discription, Picexhibition, Searchnavigator},
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



.small_para {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: small;
  text-align: left;
}





.el-footer {
  margin-top: 150px;
  /*background-color: #3399ff;*/
}



/deep/ .el-divider--vertical {
  height: calc(70vh);
  margin: 5px 0;
}
</style>
