<template>
  <div>
    <el-input v-model="address">
    </el-input>
 <baidu-map
  id="allmap"
  @ready="mapReady"
  :scroll-wheel-zoom="true"
  @click="Location"
>

  <bm-marker :position="point" animation="BMAP_ANIMATION_BOUNCE">
  </bm-marker>
      <bm-local-search :keyword="address" :auto-viewport="true" style="display: none"></bm-local-search>
       <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
</baidu-map>
  </div>

</template>
<script>
export default{
  name:"mymap",
  data(){
  return{
    point: "",
    address:"南方科技大学",
  }
},

/*created(){
var map = new BMap.Map("allmap");
//然后进行地图初始化（用一个Point坐标点和缩放级别来初始化地图。）
map.centerAndZoom=new BMap.Point(114.005913,22.603944);
},*/
methods:{
    mapReady({ BMap, map }) {
      this.point = new BMap.Point(114.005913,22.603944);
      map.centerAndZoom(this.point, 12);
    },
    Location(e){
        let geoCoder = new BMap.Geocoder();
        this.point=e.point
      console.log(geoCoder);
       geoCoder.getPoint(this.addressKeyword, point => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });

      geoCoder.getLocation(e.point, res=>{
          console.log(res);
          this.address=res.address;
          if(res.surroundingPois.length!==0){
            this.address+=res.surroundingPois[0].title
          }
      })
    },
    changeAnchor(lng ,lnt){
      this.point=new BMap.Point(lng, lnt)
      map =new BMap.Map('allmap')
      map.centerAndZoom(this.point, 12)
    }
}
}
</script>
<style>
#allmap{
  height: 400px;
  width: 100%;
  margin: 0 auto;
}
</style>
