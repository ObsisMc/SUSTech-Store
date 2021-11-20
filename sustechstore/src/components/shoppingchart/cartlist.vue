<template>
  <div class="outerdiv">
    <el-row v-for="i in goods.length" :key="i">
      <cartitem>
        <template v-slot:title>
          {{ goods[i - 1].title }}
        </template>
      </cartitem>
    </el-row>
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
          title: 'default',
          owner: 'someone',
          category: 'study',
          msgnum: 0,
          price: 100
        }
      ]
    }
  },
  mounted() {
    axios.get("@/../static/cartgoods.json").then(response =>{
      this.goods=response.data.goods;
    })
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
