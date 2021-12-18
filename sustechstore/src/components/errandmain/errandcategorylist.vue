<template>
  <div>
    <ul>
      <li v-for="o1 in Math.ceil(goods.length/col)" :key="o1">
        <el-row :gutter="30">
          <el-col :span="24/col"
                  v-for="o2 in o1*col>goods.length?goods.length-(o1-1)*col:col"
                  :key="o2">
            <errandproduct :imgurl="goods[(o1-1)*col + o2 - 1].image"
                           :id="goods[(o1-1)*col + o2 - 1].productId"
                           :icon="goods[(o1 - 1) * col + o2 - 1].icon"
                           :rating="4"
                           :saved="goods[(o1 - 1) * col + o2 - 1].saved"
                           @changeFlag="changeFlag">
              <template v-slot:description>
                {{ goods[(o1 - 1) * col + o2 - 1].description }}
              </template>
              <template v-slot:nickName>
                {{ goods[(o1 - 1) * col + o2 - 1].nickName }}
              </template>
              <template v-slot:price>
                {{ goods[(o1 - 1) * col + o2 - 1].price }}
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
            buyerId: 0,
            createTime: "2021-12-18T11:48:34.228Z",
            description: "string",
            destination: "string",
            id: 0,
            image: "string",
            name: "string",
            origin: "string",
            ownerId: 0,
            price: 0,
            status: "OPENED",
            type: "FETCH",
            updateTime: "2021-12-18T11:48:34.228Z",
            saved: false
          },
          {
            buyerId: 0,
            createTime: "2021-12-18T11:48:34.228Z",
            description: "string",
            destination: "string",
            id: 0,
            image: "string",
            name: "string",
            origin: "string",
            ownerId: 0,
            price: 0,
            status: "OPENED",
            type: "FETCH",
            updateTime: "2021-12-18T11:48:34.228Z",
            saved: false
          }
        ],
      col: 4
    }
  },
  methods: {
    getAllGoods() {
      // pass test
      let url = "";
      axios.get(url).then(response => {
        this.goods = response.data;
      })
    },
    getSearchTarget([target, cate]) {
      // pass test
      let url = "";
      axios.get(url).then(response => {
        this.goods = response.data;
      })
    },
    getProductsByCate(idx) {
      //pass
      let url = "";
      axios.get(url).then(response => {
        this.goods = response.data;
      })
    },
    changeFlag(id) {
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].productId === id) {
          this.goods[i].saved = !this.goods[i].saved;
        }
      }
    }
  },
  mounted() {
    let goodsurl = store.state.database + 'errand/list';
    // let goodsurl = "@/../static/goods.json";
    axios.get(goodsurl).then(response => {
      console.log(response.data)
      // this.goods = response.data;
      console.log(this.goods)
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

ul {
  list-style-type: none;
}

li {
  margin-bottom: 20px;
}
</style>
