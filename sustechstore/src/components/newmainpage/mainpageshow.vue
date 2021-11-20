<template>
  <div class="background">

    <el-carousel indicator-position="outside" height="400px">
      <el-carousel-item v-for="item in showimg" :key="item.name">
        <el-image :src="item.url" class="image" ></el-image>
      </el-carousel-item>
    </el-carousel>

    <el-image :src="require('@/assets/mainpage/10univ.png')"
              style="width:30%;height: 500px;" slot="reference"></el-image>
  </div>
</template>

<script>
export default {
  name: "mainpageshow",
  data() {
    return {
      bigimg: "require('@/assets/mainpage/10univ.png')",
      showimg: [
        {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "yidan_luori"
        },
        {
          url:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          name:"hambao"
        }
      ]
    }
  }
}
</script>

<style scoped>
.background {
  background-color: rgba(237, 108, 0, 0.2);
  /*width:100%;*/
  /*height:450px;*/
  padding: 20px 20px;
}

.el-image {
  margin-left: 100px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: rgba(237, 108, 0, 0.4);
}

.el-carousel__item:nth-child(2n+1) {
  background-color: rgba(237, 108, 0, 0.2);
}
.el-carousel {
  width: 50%;
  float: left;
  margin: 30px 0;
}
.image{
  width: 100%;
  height:100%;
}

</style>
