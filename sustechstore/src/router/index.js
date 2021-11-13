import Vue from 'vue'
import Router from 'vue-router'
import mainpage from "../view/mainpage";
import card from "../components/mainage/card";
import notfound from "../view/notfound"
import test from "../components/test";
import searchpage from "../view/searchpage";
import searchpage2 from "../view/searchpage2";
import homepage from "../view/homepage";
import login from "../components/welcomepage/login";
import loginpage from "../view/loginpage";
import selfpage from "../view/selfpage";
import otherpage from "../view/otherpage";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path:'/login',
      name: 'login',
      component: loginpage
    },
    {
      path: '/',
      name: 'main',
      component: homepage
    },
    {
      path: '/main2',
      name: 'main2',
      component: mainpage
    },
    {
      path: '/search2',
      name: 'search',
      component: searchpage
    },
    {
      path: '/search',
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
      path: '/selfpage',
      name: 'selfpage',
      component: selfpage
    },
    {
      path: '/otherpage',
      name: 'otherpage',
      component: otherpage
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }
  ]
})
