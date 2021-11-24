<template>
  <div class="outerdiv">
    <div v-if="goods.length">
      <el-row v-for="i in goods.length" :key="i">
        <cartitem :index="i" @removeGoods="removeGoods" :imgurl="goods.fileName" :id="goods.id"
        :orderstatus="goods[i-1].orderstatus">
          <template v-slot:title>
            {{ goods[i - 1].name }}
          </template>
          <template v-slot:price>
            {{ goods[i - 1].price }}
          </template>
          <template v-slot:goodCate>
            {{goods[i-1].categoryleveloneId}}
          </template>
          <template v-slot:owner>
            {{goods[i-1].ownerId}}
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
          price: 100,
          orderstatus:1
        }
      ]
    }
  },
  mounted() {
    // axios.defaults.headers.common['satoken'] = store.state.token;
    let goodsurl = store.state.database+ 'cart/findAll'
    let myurl = "@/../static/cartgoods.json"
    axios.get(goodsurl).then(response => {
      console.log(response.data);
      this.goods = response.data;

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
  computed:{

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
