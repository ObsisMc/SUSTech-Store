<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {store} from "./store/store";
export default {
  name: 'App',
  created(){
    if (sessionStorage.getItem('storetype')) {
      store.state.storetype = JSON.parse(sessionStorage.getItem('storetype'));
    }
    if (sessionStorage.getItem('token')) {
      store.state.token = JSON.parse(sessionStorage.getItem('token'));
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('storetype', JSON.stringify(store.state.storetype));
      sessionStorage.setItem('token', JSON.stringify(store.state.token));
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

::-webkit-scrollbar-track{
  -webkit-box-shadow:inset 0 0 0 rgba(0, 0, 0, 0);
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

::-webkit-scrollbar-track-piece {
  /*鼠标移动上去再显示滚动条*/
  background-color: #fff;
  /* 滚动条的背景颜色 */
  border-radius: 6px;
  /* 滚动条的圆角宽度 */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #c0cecc;
}
::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(193, 193, 193, 0.79);
  border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
</style>
