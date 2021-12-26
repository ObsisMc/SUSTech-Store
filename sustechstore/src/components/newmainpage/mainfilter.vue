<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-select v-model="sortselect.value" style="width: 100px; border-radius: 20px; float: left; line-height: 4;">
          <el-option
            v-for="item in sortselect.option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-radio-group v-model="simplefilter.selected" @change="changeSelect">
          <el-radio-button label="All" ></el-radio-button>
          <el-radio-button label="Study"></el-radio-button>
          <el-radio-button label="Food"></el-radio-button>
          <el-radio-button label="Electronic"></el-radio-button>
          <el-radio-button label="Living"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4" >
        <el-button @click="filter.show2 = !filter.show2" style="padding: 10px;border-radius:10px;width:100px; float: right;"><i
          class="el-icon-d-caret"></i> Filters
        </el-button>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="filter.show2" class="transition-box">
        <el-row :gutter="20">
          <el-col :span="5">
            <span style="float: left;"><strong>Tags</strong></span><br/>
            <el-input
              class="filteritem"
              id="filtertag"
              placeholder="Please enter"
              prefix-icon="el-icon-search"
              v-model="filter.search.searchinput"
              @keyup.enter.native="getSearchTarget"
              style="width: 230px;float: left;"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="5">
            <span style="float: left;"><strong>Price range</strong></span>
            <span class="cleanbutton" v-if="filter.price.value!=='All'" @click="cleanPrice">clear</span><br/>
            <el-select v-model="filter.price.value" class="filteritem">
              <el-option
                v-for="item in filter.price.option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <span style="float: left;"><strong>Timeframe</strong></span>
            <span class="cleanbutton" v-if="filter.timeframe.value!=='Now'" @click="cleanTime">clear</span><br/>
            <el-select v-model="filter.timeframe.value" class="filteritem">
              <el-option
                v-for="item in filter.timeframe.option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <span style="float: left;"><strong>Address</strong></span>
            <span class="cleanbutton" v-if="filter.address.value!=='All'" @click="cleanAddress">clear</span><br/>
            <el-select v-model="filter.address.value" class="filteritem" placeholder="All addresses">
              <el-option
                v-for="item in filter.address.option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <span style="float: left;"><strong>Role</strong></span>
            <span class="cleanbutton" v-if="filter.role.value!=='General'" @click="cleanRole">clear</span><br/>
            <el-select v-model="filter.role.value" class="filteritem">
              <el-option
                v-for="item in filter.role.option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "mainfilter",
  data() {
    return {
      id: 0,
      sortselect: {
        value: 'New',
        option: [
          {
            label: "New",
            value: "New"
          },
          {
            label: "Popular",
            value: "Popular"
          }
        ]
      },
      simplefilter: {
        selected: 'All'
      },
      filter: {
        show2: false,
        search: {
          searchinput: "",
          searchtarget: ""

        },
        role: {
          value: 'General',
          option: [
            {label: 'General', value: 'General'},
            {label: 'Buyer', value: 'Buyer'},
            {label: 'Seller', value: 'Seller'}
          ]
        },
        timeframe: {
          value: 'Now',
          option: [
            {label: 'Now', value: 'Now'},
            {label: 'Last three days', value: 'threeday'},
            {label: 'Last one week', value: 'oneweek'}
          ]
        },
        address: {
          value: 'All',
          option: [
            {label: 'All addresses', value: 'All'},
            {label: 'Second-stage dorm', value: 'dorm2'},
            {label: 'Lake dorm', value: 'dormlake'}
          ]
        },
        price: {
          value: 'All',
          option: [
            {label: 'Whole range', value: 'All'},
            {label: 'Below 100 ¥ (contain)', value: 'cheap'},
            {label: 'Below 500 ¥ (contain)', value: 'medium'},
            {label: 'Below 1000 ¥ (contain)', value: 'high'},
            {label: 'Above 1000 ¥', value: 'super'},
          ]
        }
      }
    }
  }
  ,
  methods: {
    getSearchTarget() {
      this.filter.search.searchtarget = this.filter.search.searchinput;
      this.$emit('getSearchTarget',this.filter.search.searchtarget);
    },
    loadId(val){
      this.id = val
      this.$emit("listenToChildId",this.id)
    },
    cleanRole() {
      this.filter.role.value = 'General';
    },
    cleanTime() {
      this.filter.timeframe.value = 'Now';
    },
    cleanAddress() {
      this.filter.address.value = 'All';
    },
    cleanPrice() {
      this.filter.price.value = 'All';
    },
    changeSelect(){
      this.load(1);
    }
  }
}
</script>

<style scoped>
/*选择器*/
/deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: orange;
}

/deep/ .el-select .el-input__inner:focus {
  border-color: orange;
}

/deep/ .el-input__inner {
  border-radius: 10px;
}

/*simpleselect css*/
/deep/ .el-radio-button__inner {
  margin: 8px;
}

/*第一个选项*/
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 0;
  border-radius: 10px;
}

/*所有选项*/
/deep/ .el-radio-button__inner {
  border: 0;
  border-radius: 10px;
}

/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 0;
  border-radius: 10px;
}

/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: orange;
  border-color: orange;
  box-shadow: -1px 0 0 0 orange;
}

/deep/ .el-radio-button__inner:hover {
  color: rgb(0, 63, 67);
}

/*过渡动画*/
.transition-box {
  width: 100%;
  height: 100px;
  text-align: center;
  color: rgb(0, 63, 67);
  /*background-color: bisque;*/
  padding: 20px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.filteritem {
  margin-top: 10px;
  float: left;
}

.cleanbutton {
  float: right;
  color: rgba(0, 64, 67, 0.8);
  cursor: pointer;
}

.cleanbutton:last-child {
  float: right;
  color: rgba(0, 64, 67, 0.8);
  cursor: pointer;
}

/*搜索*/
/deep/ .el-input:nth-child(3) .el-input__inner {
  background-color: #f5f5f5;
  border-radius: 15px;
}
</style>
