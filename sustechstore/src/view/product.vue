<template>
  <div>
    <searchnavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></searchnavigator>
    <div style="height: 70px;"></div>
    <el-row>
      <el-col :span="12">
        <picexhibition :imgurllist="good.image" :mainimg="good.image[0]" ref="picexhibition"
                       @changeupdaten="changeupdaten"></picexhibition>
      </el-col>
      <el-col :span="1">
        <el-divider direction="vertical"><i class="el-icon-mobile-phone"></i></el-divider>
      </el-col>
      <el-col :span="11">
        <el-row>
          <discription :rating="rating"
                       :ownerid="good.ownerId"
                       :type="good.type"
                       @toOrder="toOrder"
                       @addToCart="addToCart">
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
          <userinfo :rating="rating"
                    :ownerid="good.ownerId"
                    :icon="good.icon"
                    :ownernickname="good.nickName">
            <template v-slot:owner>
              {{ good.nickName }}
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
  inject: ['reload'],
  data() {
    return {
      rating: 3.7,
      note: {},
      reviews: 441,
      orderid: 0,
      orderstatus: 0,

      good: {
        description: "A sectional sofa or an L shaped sofa can make a great addition to your living room based on your needs",
        id: 0,
        image: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
        name: "Product name",
        ownerId: 0,
        price: 1250,
        nickName: "string",
        icon: "string",
        type: "SELL"
      },
      updaten: 0
    }

  },
  methods: {
    getProductInformation() {
      let goodid = this.$route.query.id;
      axios.get(store.state.database + 'product/findProductVOById/' + goodid
      ).then(response => {
        this.good.description = response.data.description;
        this.good.id = response.data.id;
        this.good.name = response.data.name;
        this.good.ownerId = response.data.ownerId;
        this.good.price = response.data.price;
        this.good.nickName = response.data.nickName;
        this.good.icon = response.data.icon;
        this.good.type = response.data.type;
        axios.get(store.state.database + "user/findById/" + this.good.ownerId).then(response => {
          let rating = response.data.credit / 20
          this.rating = rating > 5 ? 5 : rating;
        })
      })
      axios.get(store.state.database + "productImage/listProductImageByProductId/" + goodid).then(response => {
        this.good.image = response.data;
      })
    },
    toOrder() {
      this.$router.push({
        name: "checkoutpage",
        query: {status: this.orderstatus, producttype: this.good.type},
        params: {id: this.good.id, category: 0}
      });
    },
    addToCart(type) {
      axios.post(store.state.database + 'cart/addCart/' + this.good.id + "/" + type).then(response => {
        if (response.status === 200) {
          this.$message({
            message: 'Adding to shopping cart successfully!',
            type: 'success'
          });
        }
      });
    },
    changeupdaten() {
      this.updaten = 0;
    }
  },
  mounted() {
    axios.defaults.headers.common['satoken'] = store.state.token;
    this.getProductInformation();
  },
  beforeUpdate(to, from, next) {
    // console.log(this.updaten)
    // if (this.updaten < 10) {

    this.getProductInformation();
    // }
    // this.updaten++;
    // this.$refs.picexhibition.getRelatedProducts();
    next();
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

/deep/ .el-divider--horizontal {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
