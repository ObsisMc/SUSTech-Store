import Vue from 'vue'
import Router from 'vue-router'
import notfound from "../view/notfound"
import test from "../components/test";
import searchpage2 from "../view/searchpage2";
import homepage from "../view/homepage";
import login from "../components/welcomepage/login";
import loginpage from "../view/loginpage";
import selfpage from "../view/selfpage";
import otherpage from "../view/otherpage";
import payresult from "../components/orderconfirm/payresult";
import shoppingcartpage from "../view/shoppingcartpage";
import checkoutpage from "../view/checkoutpage";
import payment from "../components/orderconfirm/payment";
import submitorder from "../components/orderconfirm/submitorder";
import product from "../view/product";
import register from "../view/registerpage";
import selfinfo from "../view/selfinfo.vue"
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginpage
    },
    {
      path: '/register',
      name: 'register',
      component: register
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
      path: '/product',
      name: 'product',
      component: product
    },
    {
      path: '/checkout/:id',
      name: 'checkoutpage',
      component: checkoutpage,
      children: [
        {path: '0', component:submitorder},
        {path: '1', component:payment},
        {path: '2', component: payresult}
      ]
    },
    {
      path: '/payresult',
      name: 'success',
      component: payresult
    },
    {
      path : '/selfinfo',
      component: selfinfo
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }
  ]
})
