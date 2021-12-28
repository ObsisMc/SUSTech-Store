<template>
  <div>
    <el-result icon="success" title="Pay successfully!" subTitle="Please return back to shopping cart">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="returncart">return</el-button>
      </template>
    </el-result>
    <p>请对本次服务做出评价</p>
    <el-rate
      show-score
      allow-half
      v-model="value2"
      :colors="colors"
      :disabled="rated"
      @change="onlyOnce">
    </el-rate>
    <p>请输入对这次服务的评论</p>
    <el-col :span ="6" :offset="9" >
      <el-input
        align="middle"
        type="textarea"
        autosize
        placeholder="请输入评论"
        v-model="textarea1">
      </el-input>
    </el-col>
    <el-button @click="submitComment" :disabled="finished">Submit</el-button>

  </div>
</template>

<script>

import {store} from "../../store/store";
import axios from "axios";

export default {
  name: "payresult",
  props:['uid'],
  // 现在我的id
  data() {
    return {
      rated: false,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      textarea1: "",
      buyerId:-2,
      sellerId:-2,
      finished: false
    }
  },
  methods: {
    submitComment(){
      if (this.value2 === null || this.textarea1 === ""){
        this.$alert('请完成打分和评论',  {
          confirmButtonText: '确定'
        });
      }else{
        if (this.$route.params.category === 0) {
          axios.get(store.state.database + "order/getOrdersVOByOrderId/" + this.$route.query.orderid).then(response => {
            this.buyerId = response.data.buyerId;
            this.sellerId = response.data.sellerId;
            if(this.uid === this.buyerId){
              let goodsurl = store.state.database + "ordersComment/commentOrders/"+this.$route.query.orderid+"/"+this.sellerId+"/"+this.textarea1+"/"+this.value2;
              axios.post(goodsurl).then(response=>{
                this.$message({
                  message:"完成订单评价",
                  type:"success"
                })
                this.finished = true;
              })
            }else if(this.uid === this.sellerId){
              let goodsurl = store.state.database + "ordersComment/commentOrders/"+this.$route.query.orderid+"/"+this.buyerId+"/"+this.textarea1+"/"+this.value2;
              axios.post(goodsurl).then(response=>{
                this.$message({
                  message:"完成订单评价",
                  type:"success"
                })
              })
              this.finished = true;
            }
          })
        } else if (this.$route.params.category === 1) {
          axios.get(store.state.database + 'errand/findErrandVOById/' + this.$route.params.id).then(response => {
            console.log(response.data)
            this.sellerId = response.data.ownerId;
            if (this.sellerId !== this.uid) {
              this.buyerId = this.uid;
            }
          })
        }
        // let goodsurl = store.state.database + "ordersComment/commentOrders/"+this.$route.query.orderid+"/"+this.sellerId+"/"+this.textarea1+"/"+this.value2;
        // console.log(this.$route.query.orderid)
        // console.log(this.sellerId)
        // console.log(this.textarea1)
        // console.log(this.value2)
        // axios.post(goodsurl).then(response=>{
        //   console.log(response.data)
        // })
      }
    },
    returncart() {
      this.$emit("nextStatus");
    },
    onlyOnce(){
      if(!this.rated){
        this.rated = true;
      }
    }
  }
}
</script>

<style scoped>
</style>
