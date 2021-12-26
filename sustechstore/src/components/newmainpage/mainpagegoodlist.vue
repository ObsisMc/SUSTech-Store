<template>
  <div class="infinite-list-wrapper">
    <ul class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-distance="100"
        infinite-scroll-disabled="disabled">
      <li v-for="o1 in Math.ceil(goods.good.length/goods.col)" :key="o1">
        <el-row :gutter="30">
          <el-col :span="24/goods.col"
                  v-for="o2 in o1*goods.col>goods.good.length?goods.good.length-(o1-1)*goods.col:goods.col"
                  :key="o2">
            <singlegood :imgurl="goods.good[(o1-1)*goods.col + o2 - 1].image"
                        :id="goods.good[(o1-1)*goods.col + o2 - 1].id"
                        :icon="goods.good[(o1-1)*goods.col + o2 - 1].icon">
              <template v-slot:title>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].name }}
              </template>
              <template v-slot:intro v-if="goods.good[(o1 - 1) * goods.col + o2 - 1].description!==''">
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].description }}
              </template>
              <template v-slot:username>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].nickName }}
              </template>
              <template v-slot:description>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].description }}
              </template>
              <template v-slot:price>
                {{ goods.good[(o1 - 1) * goods.col + o2 - 1].price }}
              </template>
            </singlegood>
          </el-col>
        </el-row>
      </li>
    </ul>
    <p v-if="loading&&!noMore">
      <el-alert
        title="加载中..."
        type="success"
        center
        show-icon>
      </el-alert>
    </p>
    <p v-if="noMore">
      <el-alert
        title="没有更多了"
        type="info"
        center
        show-icon>
      </el-alert>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Singlegood from "./singlegood";
import {store} from "../../store/store";

export default {
  name: "mainpagegoodlist",
  components: {Singlegood},
  data() {
    return {
      goods: {
        good: [
          {
            description: "",
            image: "",
            id: 0,
            name: "string",
            ownerId: 0,
            price: 100,
            icon: "string",
            nickName: "unamed"
          }
        ],
        col: 4
      },
      pagen: 1,
      pagesize: 4,
      loading: false,
      nomore: false
    }
  },
  mounted() {
    this.getAllGoods();
  },
  methods: {
    getAllGoods() {
      let goodsurl = store.state.database + 'product/findProductVOPage/' + (this.pagen++) +
        '/' + this.pagesize;
      let myurl = "@/../static/goods.json";
      axios.get(goodsurl).then(response => { // 要是是动态路由，需要再加一个../
        this.goods.good = response.data;
        console.log(this.goods.good);
      })
    },
    getSearchTarget(target) {
      if (target === 0) {
        this.getAllGoods();
      } else {
        let goodsurl = store.state.database + "/product/list/1/" + target;
        axios.get(goodsurl).then(response=>{
          console.log(response)
          this.goods.good = response.data;
        })

      }
    },
    load() {
      let goodsurl = store.state.database + 'product/findProductVOPage/' + (this.pagen++) + "/" + this.pagesize;
      let myurl = "@/../static/goods.json";
      this.loading = true;
      console.log("loading")
      axios.get(goodsurl).then(response => { // 要是是动态路由，需要再加一个../
        let newgoods = response.data;
        if (newgoods.length === 0) {
          this.nomore = true;
        } else {
          for (let i = 0; i < this.pagesize; i++) {
            this.goods.good.push(newgoods[i]);
          }
          this.loading = false;
        }
      })
    }
  },
  computed: {
    noMore() {
      return this.nomore;
    },
    disabled() {
      return this.loading || this.nomore;
    }
  }
}
</script>

<style scoped>
.infinite-list-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;

}

/*.infinite-list-wrapper::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/
.infinite-list-wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

.infinite-list-wrapper:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}

.infinite-list-wrapper:hover::-webkit-scrollbar-thumb:hover {
  background-color: #c0cecc;
}

.infinite-list-wrapper:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(193, 193, 193, 0.79);
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}

ul {
  padding: 0 0;
}

.el-row {
  margin: 0 0;
}
</style>
