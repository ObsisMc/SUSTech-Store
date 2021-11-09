import Vue from 'vue'
import Router from 'vue-router'
import mainpage from "../view/mainpage";
import card from "../components/mainage/card";
import notfound from "../view/notfound"
import test from "../components/test";
import searchpage from "../view/searchpage";
import searchpage2 from "../view/searchpage2";

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
      path: '/search',
      name: 'search',
      component: searchpage
    },
    {
      path: '/search2',
      name: 'search2',
      component: searchpage2
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
