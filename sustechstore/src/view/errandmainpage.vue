<template>
  <div>
    <wholenavigator style="position: fixed;width: 100%;left: 0;top: 0;z-index: 1000;"></wholenavigator>
    <div style="height: 50px;"></div>
    <errandproduct></errandproduct>
  </div>

</template>

<script>
import wholenavigator from "../components/wholenavigator";
import Errandproduct from "../components/errandmain/errandproduct";
export default {
  name: "errandmainpage",
  components:{Errandproduct, wholenavigator}
}
</script>

<style scoped>

</style>
