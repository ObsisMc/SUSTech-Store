<template>
  <div>
    <el-result icon="success" title="Pay successfully!" subTitle="Please return back to shopping cart">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="returncart">return</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>

export default {
  name: "payresult",
  data() {
    return {}
  },
  methods: {
    returncart() {
      this.$router.push('/shoppingcart')
    }
  }
}
</script>

<style scoped>
</style>
