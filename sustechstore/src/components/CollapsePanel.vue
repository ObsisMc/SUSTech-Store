<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
<!--        <GoodCard></GoodCard>-->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import GoodCard from "./GoodCard";
export default {
  name: "CollapsePanel",
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  components: {GoodCard}
}
</script>

<style scoped>

</style>
