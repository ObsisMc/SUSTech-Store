<template>
  <div id="outerdiv">
    <p>最新信息</p>
    <div id="innerdiv">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <li v-for="i in count" class="list-item">{{ i }}</li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>


  </div>

</template>

<script>
export default {
  name: "infinitelist",
  data() {
    return {
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 50
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }

}
</script>

<style scoped>
#outerdiv {
  height: 620px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px
  /*padding:5px;*/
}
#innerdiv{
  height: 580px;
  overflow: auto;
}

li {
  list-style: none;
}

::-webkit-scrollbar {
  width: 8px;

}

::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}

</style>
