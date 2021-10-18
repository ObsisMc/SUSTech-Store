<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          高级筛选<i class="header-icon el-icon-info">
          <el-button icon="el-icon-refresh" circle size="mini" type="success"></el-button>
        </i>
        </template>
        <el-row>
          <el-col :span="6" class="filter">
            <div>
              <el-button :type="usrfilter[2].hasselect" @click="validchanusr" circle size="normal"
                         icon="el-icon-user-solid"></el-button>
              <br/>
              <el-switch
                v-model="usrfilter[0].value"
                :disabled="usrfilter[1].changeusrvalid"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="买家"
                inactive-text="卖家">
              </el-switch>
              <br/>
              <span class="demonstration"></span>
              <el-rate
                v-model="ratingfilter[0].rating"
                :colors="ratingfilter[1].colors">
              </el-rate>
              <el-tag type="warning" v-if="ratingfilter[0].rating">评分>={{ ratingfilter[0].rating }}</el-tag>
            </div>

          </el-col>


          <el-col :span="6" class="filter">
            <el-select
              v-model="classfilter[3].value2"
              multiple
              collapse-tags
              style="margin-left: 20px; width: 200px;"
              placeholder="请选择类别">
              <el-option
                v-for="item in classfilter[3].options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <br/><br/>

            <el-tag
              :key="tag"
              v-for="tag in classfilter[0].dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="classfilter[1].inputVisible"
              v-model="classfilter[2].inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            <el-button icon="el-icon-refresh" circle size="mini"></el-button>
          </el-col>
          <el-col :span="6" class="filter">
            <span>价格筛选</span><br/>
            <el-input-number v-model="pricefilter[0].num1" :precision="2" :step="0.1" :max="100000"
                             :min="0"></el-input-number>
            <br/><br/>
            <el-tag type="warning" v-if="pricefilter[0].num1">价格<={{ pricefilter[0].num1 }}</el-tag>
          </el-col>
          <el-col :span="6">
            地图
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import GoodCard from "../mainage/GoodCard";

export default {
  name: "CollapsePanel",
  data() {
    return {
      activeNames: ['1'],
      usrfilter: [
        {value: true},
        {changeusrvalid: true},
        {hasselect: ""},
      ],
      ratingfilter: [
        {rating: 0},
        {colors: ['#99A9BF', '#F7BA2A', '#FF9900']}// 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }]
      ],
      pricefilter: [{num1: 0}],
      classfilter: [
        {dynamicTags: []},
        {inputVisible: false},
        {inputValue: ''},
        {
          options: [{
            value: '选项1',
            label: '学习'
          }, {
            value: '选项2',
            label: '美食'
          }, {
            value: '选项3',
            label: '电子设备'
          }, {
            value: '选项4',
            label: '居家'
          }
          ],
          value2: ''
        }
      ]

    }
      ;
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    validchanusr() {
      if (this.usrfilter[2].hasselect === "") {
        this.usrfilter[2].hasselect = "primary";
        this.usrfilter[1].changeusrvalid = false;
      } else {
        this.usrfilter[2].hasselect = "";
        this.usrfilter[1].changeusrvalid = true;
      }
    },
    handleClose(tag) {
      this.classfilter[0].dynamicTags.splice(this.classfilter[0].dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.classfilter[1].inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.classfilter[2].inputValue;
      if (inputValue) {
        this.classfilter[0].dynamicTags.push(inputValue);
      }
      this.classfilter[1].inputVisible = false;
      this.classfilter[2].inputValue = '';
    }
  },
  components: {GoodCard}
}
</script>

<style scoped>
.filter {
  /*border-radius: 2px;*/
  /*border: 1px solid rgba(128, 128, 128, 0.47);*/
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  /*padding: 10px;*/
  /*margin-bottom: 0;*/
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
