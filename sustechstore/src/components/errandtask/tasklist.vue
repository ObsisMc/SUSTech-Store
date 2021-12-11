<template>
  <div class="outerdiv">
    <div v-if="goods.length">
      <el-row v-for="i in goods.length" :key="i">
        <taskitem :index="i-1" @removeGoods="removeGoods" :imgurl="goods.image" :id="goods[i-1].productId"
                  :orderstatus="goods[i-1].orderstatus">
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
        </taskitem>
      </el-row>
    </div>
    <div v-if="!goods.length">
      <el-empty description="No goods"></el-empty>
    </div>

  </div>
</template>

<script>
import Taskitem from "./taskitem";
import axios from "axios";
import {store} from "../../store/store";

export default {
  name: "tasklist",
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
            productId: 734
          }
        ]
    }
  },
  mounted() {
    let goodsurl = store.state.database + 'task/findAllTaskVO';
    let myurl = "@/../static/taskgoods.json"
    axios.get(goodsurl).then(response => {
      this.goods = response.data;
    })
    this.calcTotalPrice();
  },
  methods: {
    removeGoods(index) {
      axios.delete(store.state.database + 'task/deleteByTaskId/' + this.goods[index].id).then(response => {
        if (response.status === 200) {
          console.log(this.goods[index])
          this.goods.splice(index,1);
          this.$message({
            message:"Remove collection successfully!",
            type:'success'
          })
        }else{
          this.$message({
            message:"Error happens",
            type:'danger'
          })
        }
      })

      this.calcTotalPrice();
    },
    calcTotalPrice() {
      var p = 0;

      for (let i = 0; i < this.goods.length; i++) {
        p += parseFloat(this.goods[i].price);
      }

      this.$emit('setTotalPrice', p);

    }
  },
  computed: {},
  components: {Taskitem}
}
</script>

<style scoped>
.outerdiv {
  height: 580px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
