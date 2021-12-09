<template>
  <div>
    <el-row >
      <span class="category">
        <slot name="category" ></slot>
      </span>

    </el-row>

    <el-row v-for="i in goods.length" :key="i" style="margin-top:30px;" >
      <errandproduct :imgurl="goods.image" :id="goods[i-1].productId">
        <template v-slot:description>
          {{ goods[i - 1].description }}
        </template>
      </errandproduct>
    </el-row>
  </div>
</template>

<script>
import {store} from "../../store/store";
import axios from "axios";
import Errandproduct from "./errandproduct";

export default {
  name: "errandcategorylist",
  components: {Errandproduct},
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
            productId: 734
          },
          {
            description: "nothing is here",
            icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            id: 733,
            image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            name: "ham",
            nickName: "unamed",
            ownerId: 0,
            price: 200,
            productId: 734
          }
        ]
    }
  },
  mounted() {
    let goodsurl = store.state.database + 'cart/findAllCartVO';
    axios.get(goodsurl).then(response => {
      this.goods = response.data;
    })

  }
}
</script>

<style scoped>
.category {
  background-color: rgba(237, 108, 0,0.8);
  padding: 5px 10px;
  border-radius: 20px;

}
</style>
