<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <CollapsePanel></CollapsePanel>
        <br/>
        <el-row v-for="o1 in Math.ceil(good.length/4)" :key="o1" :gutter="20">
          <el-col span="6" v-for="o2 in o1*4>good.length?good.length-(o1-1)*4:4" :key="o2" >
            <goodexhibition :imgurl="good[o1*4 + o2 - 5].url">
              <template v-slot:title>
                {{ good[o1 * 4 + o2 - 5].title }}
                <!--                hi-->
              </template>
              <template v-slot:intro>
                {{ good[o1 * 4 + o2 - 5].intro }}
                <!--                bi-->
              </template>
            </goodexhibition>
          </el-col>
        </el-row>

        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CollapsePanel from "./CollapsePanel";
import Goodexhibition from "./goodexhibition";
const axios = require('axios');
export default {
  name: "searchbody",
  components: {Goodexhibition, CollapsePanel},
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      good: null
    }
  },
  computed: {
    // 没用
    goodrow(o1) {
      return o1 * 4 - 1
    }
  },
  mounted(){
    axios.get("@/../static/goods.json").then(response=>{this.good = response.data.goods})
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>

<style scoped>

</style>
