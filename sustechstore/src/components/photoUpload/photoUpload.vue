<template>
  <div>
<el-upload
  action=""
   list-type="picture"
  accept="image/jpeg,image/png"
  :on-change="onUploadChange"
  :auto-upload="false"

  :file-list="fileList"
  :limit="3">
    <el-button slot="trigger" size="small" type="primary">选取</el-button>
    <!--el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button-->
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过10m</div>
</el-upload>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../store/store";
export default {
  name: 'photoupload',
  data () {
    return {
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,//图片预览弹窗
      formLabelWidth: '80px',
      limitNum: 1,
      form: {},
      dialogVisible2: false,//弹窗
      file: null,
      fileList: [],
      url :store.state.database+'/productImage/post',
      base64Photo :'',
      photoList :[],
    }
  },
  methods: {

 onUploadChange(file)
  {

    let self =this;
    const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
    const isLt1M = file.size / 1024 / 1024 < 10;

    if (!isIMAGE) {
      this.$message.error('只能上传jpg/png图片!');
      return false;
    }
    if (!isLt1M) {
      this.$message.error('上传文件大小不能超过 10MB!');
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = function(e){

        // this.$options.methods.storeBase64(this.result)
        self.base64Photo=this.result
      self.$emit('getPhoto',self.base64Photo)
    }

  },
  storeBase64 (code){
    this.base64Photo=code;

  }
  }
}
</script>

<style  >

</style>
