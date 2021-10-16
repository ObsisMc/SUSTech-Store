import Vue from 'vue'
import Router from 'vue-router'
import mainpage from "../view/mainpage";
import HelloWorld from '@/components/HelloWorld'
import card from "../components/card";
import notfound from "../view/notfound"
import test from "../components/test";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'main',
      component: mainpage
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/card',
      name: 'card',
      component: card
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }
  ]
})
