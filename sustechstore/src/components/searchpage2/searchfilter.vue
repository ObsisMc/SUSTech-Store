<template>
  <div class="hoverscrollbar">
    <el-row>
      <br/> <span style="font-weight: bold;float: left; padding-left:30px;">Filter</span>
      <el-button icon="el-icon-refresh-right" circle size="mini" @click="resetfilter"></el-button>
      <el-button icon="el-icon-check" circle size="mini" @click="confirmfilter"></el-button>

      <el-divider></el-divider>
    </el-row>
    <el-row>
      <span class="filtertitle">Categories</span><br/>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="Study"></el-checkbox>
        <el-checkbox label="Food"></el-checkbox>
        <el-checkbox label="Electronic device"></el-checkbox>
        <el-checkbox label="Living"></el-checkbox>
      </el-checkbox-group>
      <el-tag
        :key="tag"
        v-for="tag in classfilter.dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="classfilter.inputVisible"
        v-model="classfilter.inputValue"
        ref="saveTagInput"
        size="small"
        style="width:70%;"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput" type="warning" style="margin:10px;">+ New
        Tag
      </el-button>
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <span class="filtertitle">User Type</span><br/><br/>
      <el-button :type="usrfilter.hasselect" @click="validchanusr" circle size="normal"
                 icon="el-icon-user-solid" style="margin-bottom: 5px;"></el-button>
      <br/>
      <el-switch
        v-model="usrfilter.value"
        :disabled="usrfilter.changeusrvalid"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="买家"
        inactive-text="卖家">
      </el-switch>
      <br/>
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-row>
        <span class="filtertitle">Rating</span><br/><br/>
      </el-row>
      <el-row style="position: relative;left:-10px;">
        <el-col :span="6" style="position: relative;top:-12px;">
          <el-checkbox v-model="ratingfilter.ratingvalid"></el-checkbox>
        </el-col>
        <el-col :span="14" style="position: center;">
          <el-rate
            v-model="ratingfilter.rating"
            :colors="ratingfilter.colors"
            :disabled="!ratingfilter.ratingvalid"
            style="line-height: 10px;">
          </el-rate>
        </el-col>
        <el-col :span="1" style="position: relative;left:-20px;">
          above
        </el-col>
        <br/>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <span class="filtertitle">Price range</span><br/><br/>
        <el-input v-model="pricefilter.min" placeholder="Min" style="width:70px;"></el-input>
        <span>~</span>
        <el-input v-model="pricefilter.max" placeholder="Max" style="width:70px;"></el-input>
        <br/><br/>
        <el-tag type="danger" style="width: 80px" v-if="pricefilter.vaildinput!==1">
          <span style="position:center;">
            ¥ {{ pricefilter.confirmmin }} ~ {{ pricefilter.confirmmax }}
          </span>
        </el-tag>
        <span v-if="pricefilter.vaildinput===1"><el-tag type="danger">Error</el-tag></span>
        <br/><br/>
        <el-button type="warning" @click="setpricefilter">Set price</el-button>
        <el-divider></el-divider>
      </el-row>
      <el-row>
        <span class="filtertitle">Trade Address</span><br/><br/>

        <el-popover
          placement="right"
          width="300px;"
          trigger="click"
        >
          <el-image :src="addressfilter.dorm2.url"
                    style="border-radius: 10px;height:150px;width:200px; cursor: pointer;"
                    slot="reference"></el-image>
          <el-select
            v-model="selectedaddress"
            multiple
            collapse-tags
            style="margin-left: 20px; width: 200px;"
            placeholder="Please select address">
            <el-option
              v-for="item in addressfilter"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-popover>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "searchfilter",
  data() {
    return {
      checkList: [],
      usrfilter: {
        value: true,
        changeusrvalid: true,
        hasselect: "",
      },
      ratingfilter: {
        rating: 0,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],// 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }]
        ratingvalid: false
      },
      classfilter: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      },
      pricefilter: {
        min: '',
        max: '',
        confirmmin: '0',
        confirmmax: '∞',
        vaildinput: 0
      },
      addressfilter: {
        dorm2: {label: "dorm2", value: "dorm2", url: require("@/assets/places/dorm2.jpg")},
        lakedorm: {label: "lakedorm", value: "lakedorm"}
      },
      selectedaddress: []

    };
  },
  methods: {
    resetfilter(){
      this.checkList = [];
      this.usrfilter.value=true;
      this.usrfilter.changeusrvalid=true;
      this.usrfilter.hasselect='';
      this.ratingfilter.rating = 0;
      this.ratingfilter.ratingvalid=false;
      this.classfilter.dynamicTags=[];
      this.classfilter.inputVisible=false;
      this.classfilter.inputValue='';
      this.pricefilter.min = '';
      this.pricefilter.max = '';
      this.pricefilter.confirmin = '0';
      this.pricefilter.confirmax = '∞';
      this.pricefilter.vaildinput = 0;
      this.setpricefilter();
      this.selectedaddress =[];
    },
    confirmfilter(){
      alert("confirm filter");
    },
    validchanusr() {
      if (this.usrfilter.hasselect === "") {
        this.usrfilter.hasselect = "primary";
        this.usrfilter.changeusrvalid = false;
      } else {
        this.usrfilter.hasselect = "";
        this.usrfilter.changeusrvalid = true;
      }
    },
    handleClose(tag) {
      this.classfilter.dynamicTags.splice(this.classfilter.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.classfilter.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.classfilter.inputValue;
      if (inputValue) {
        this.classfilter.dynamicTags.push(inputValue);
      }
      this.classfilter.inputVisible = false;
      this.classfilter.inputValue = '';
    },
    setpricefilter() {
      if (this.pricefilter.min === '' && this.pricefilter.max === '') {
        this.pricefilter.confirmmax = '∞';
        this.pricefilter.confirmmin = '0';
        this.pricefilter.vaildinput = 0
      } else if (/^[0-9]*$/.test(this.pricefilter.min) && /^[0-9]*$/.test(this.pricefilter.max) && (
        (this.pricefilter.min <= this.pricefilter.max && this.pricefilter.max !== '' || this.pricefilter.min >= 0 && this.pricefilter.max === '') ||
        (this.pricefilter.min <= this.pricefilter.max && this.pricefilter.min !== '' || this.pricefilter.max >= 0 && this.pricefilter.min === ''))) {
        if (this.pricefilter.max !== '') {
          this.pricefilter.confirmmax = this.pricefilter.max;
        } else {
          this.pricefilter.confirmmax = '∞';
        }
        if (this.pricefilter.min !== '') {
          this.pricefilter.confirmmin = this.pricefilter.min;
        } else {
          this.pricefilter.confirmmin = '0';
        }
        this.pricefilter.vaildinput = 2
      } else {
        this.pricefilter.vaildinput = 1
      }

    }
  }
}
</script>

<style scoped>
.filtertitle {
  font-weight: bold;

}
/deep/.el-divider--horizontal{
  margin-top: 10px;
}

.el-checkbox {
  width: 50px;
  display: block;
  padding-left: 40px;
  margin: 10px;
  font-size: 20px;

}

/deep/ .el-checkbox__inner {
  height: 16px;
  width: 16px;
  border-radius: 5px;
  font-size: 30px;
}

/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #fdb122;
  background: #fdb122;

}

/deep/ .el-checkbox__label {
  font-size: 15px;
}

.el-tag + .el-tag {
  margin-left: 10px;

}

.el-carousel {
  height: 200px;
  width: 300px;
  background-color: #99a9bf;
}

.hoverscrollbar {
  overflow-y: auto;
  overflow-x: hidden;
  height: 720px;
}

.hoverscrollbar::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

.hoverscrollbar:hover ::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}

.hoverscrollbar:hover::-webkit-scrollbar-thumb:hover {
  background-color: #c0cecc;
}

.hoverscrollbar:hover::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(193, 193, 193, 0.79);
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}


</style>
