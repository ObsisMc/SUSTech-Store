<template>
  <div class="outerdiv">
    <div v-if="goods.length">
      <el-row v-for="i in goods.length" :key="i">
        <cartitem :index="i-1" @removeGoods="removeGoods"
                  :imgurl="goods[i-1].image"
                  :id="goods[i-1].productId"
                  :type="goods[i-1].productType"
                  :orderstatus="goods[i-1].orderstatus"
                  :myid="myself.uid"
                  :myname="myself.uname"
                  :myicon="myself.uicon"
                  :otherid="goods[i-1].ownerId"
                  :othername="goods[i-1].nickName"
                  :othericon="goods[i-1].icon">
          <template v-slot:title>
            {{ goods[i - 1].name }}
          </template>
          <template v-slot:price>
            {{ goods[i - 1].price }}
          </template>
          <template v-slot:goodCate>
            {{ goods[i - 1].categoryleveloneId }}
          </template>
          <template v-slot:owner>
            {{ goods[i - 1].nickName }}
          </template>
        </cartitem>
      </el-row>
    </div>
    <div v-if="!goods.length">
      <el-empty description="No goods"></el-empty>
    </div>

  </div>
</template>

<script>
import Cartitem from "./cartitem";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "cartlist",
  data() {
    return {
      goods:
        [
          {
            description: "nothing is here",
            icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            id: 733,
            image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            name: "ham",
            nickName: "unamed",
            ownerId: 0,
            price: 200,
            orderstatus: 1,
            productId: 734,
            productType: "SELL"
          }
        ],
      myself: {
        uid: 0,
        uname: "unamed",
        uicon: "null"
      }
    }
  },
  mounted() {
    let goodsurl = store.state.database + 'cart/findAllCartVO';
    let myurl = "@/../static/cartgoods.json"
    axios.get(goodsurl).then(response => {
      this.goods = response.data;
      this.calcTotalPrice();
    })
    this.getMyInfo();
  },
  methods: {
    removeGoods(index) {
      axios.delete(store.state.database + 'cart/deleteByCartId/' + this.goods[index].id).then(response => {
        if (response.status === 200) {
          console.log(this.goods[index])
          this.goods.splice(index, 1);
          this.$message({
            message: "Remove collection successfully!",
            type: 'success'
          })
          this.calcTotalPrice();
        } else {
          this.$message({
            message: "Error happens",
            type: 'danger'
          })
        }
      })

    },
    calcTotalPrice() {
      var p = 0;
      for (let i = 0; i < this.goods.length; i++) {
        p += parseFloat(this.goods[i].price);
      }

      this.$emit('setTotalPrice', p);

    },
    getMyInfo() {
      axios.get(store.state.database + 'user/userInfo').then(response => {
        if (response.status === 200) {
          this.myself.uid = response.data.uid;
          this.myself.uname = response.data.nickName;
          this.myself.uicon = response.data.icon;
        }
      });
    }
  },
  computed: {},
  components: {Cartitem}
}
</script>

<style scoped>
.outerdiv {
  height: 580px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
