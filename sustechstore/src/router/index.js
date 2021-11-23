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
import payresult from "../view/payresult";
import shoppingcartpage from "../view/shoppingcartpage";
import selfinfo from "../view/selfinfo.vue"
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path:'/',
      name: 'login',
      component: loginpage
    },
    {
      path: '/main',
      name: 'main',
      component: homepage
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
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: shoppingcartpage
    },
    {
      path: '/payresult',
      name: 'success',
      component: payresult
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
      path: "/selfinfo",
      name :"selfinfo",
      component: selfinfo
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }
  ]
})
