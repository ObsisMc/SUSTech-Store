<template>
  <div>
    <ul>
      <li v-for="o1 in Math.ceil(goods.length/col)" :key="o1" >
        <el-row :gutter="30">
          <el-col :span="24/col"
                  v-for="o2 in o1*col>goods.length?goods.length-(o1-1)*col:col"
                  :key="o2">
            <errandproduct :imgurl="goods[(o1-1)*col + o2 - 1].image"
                        :id="goods[(o1-1)*col + o2 - 1].productId"
              :icon="goods[(o1 - 1) * col + o2 - 1].icon">
              <template v-slot:description>
                {{ goods[(o1 - 1) * col + o2 - 1].description }}
              </template>
              <template v-slot:nickName>
                {{goods[(o1 - 1) * col + o2 - 1].nickName}}
              </template>
            </errandproduct>
          </el-col>
        </el-row>
      </li>
    </ul>
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
        ],
      col:4
    }
  },
  mounted() {
    // let goodsurl = store.state.database + 'cart/findAllCartVO';
    let goodsurl = "@/../static/goods.json";
    axios.get(goodsurl).then(response => {
      this.goods = response.data.goods;
    })

  }
}
</script>

<style scoped>
.category {
  background-color: rgba(237, 108, 0, 0.8);
  padding: 5px 10px;
  border-radius: 20px;
}

ul{
  list-style-type: none;
}

li{
  margin-bottom: 20px;
}
</style>
