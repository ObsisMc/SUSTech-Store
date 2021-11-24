<template>
  <div class="outerdiv">
    <div v-if="goods.length">
      <el-row v-for="i in goods.length" :key="i">
        <cartitem :index="i" @removeGoods="removeGoods" :imgurl="goods.fileName" :id="goods.id">
          <template v-slot:title>
            {{ goods[i - 1].name }}
          </template>
          <template v-slot:price>
            {{ goods[i - 1].price }}
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

export default {
  name: "cartlist",
  data() {
    return {
      goods: [
        {
          categoryleveloneId: 0,
          categorylevelthreeId: 0,
          categoryleveltwoId: 0,
          description: "nothing is here",
          id: 733,
          image: "",
          name: "ham",
          ownerId: 0,
          price: 100
        }
      ]
    }
  },
  mounted() {
    let goodsurl = 'http://10.21.64.1:8181/cart/findAll'
    let myurl = "@/../static/cartgoods.json"
    axios.get(goodsurl).then(response => {
      // this.goods=response.data.goods;
      this.goods = response.data;
      console.log(response);
    })
    this.calcTotalPrice(1);
  },
  methods: {
    removeGoods(index) {
      this.goods.pop(index);
      this.calcTotalPrice(2);
    },
    calcTotalPrice(mode) {
      var p = 0;
      if (mode === 1) {
        for (let i = 0; i < this.goods.length; i++) {
          p += this.goods[i].price;
        }

      } else if (mode === 2) {
        for (let i = 0; i < this.goods.length; i++) {
          p += this.goods[i].price;
        }
      }
      this.$emit('setTotalPrice', p);

    }
  },
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
