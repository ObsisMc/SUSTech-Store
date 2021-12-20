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
import buyer_confirm from "../components/orderconfirm/buyer_confirm";
import merchant_confirm from "../components/orderconfirm/merchant_confirm";
import shoppingcartpage from "../view/shoppingcartpage";
import checkoutpage from "../view/checkoutpage";
import payment from "../components/orderconfirm/payment";
import submitorder from "../components/orderconfirm/submitorder";
import product from "../view/product";
import register from "../view/registerpage";
import selfinfo from "../view/selfinfo.vue";
import errandmainpage from "../view/errandmainpage";
import errandtaskpage from "../view/errandtaskpage";
import errandsubmit from "../components/orderconfirm/errandsubmit";
import errandpayment from "../components/orderconfirm/errandpayment";
import {store} from "../store/store";
import axios from "axios";

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [{
    path: '/',
    name: 'login',
    component: loginpage,
    meta: {requiresAuth: false}
  },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {requiresAuth: false}
    },
    {
      path: '/main',
      name: 'main',
      component: homepage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/errand",
      name: "errandmain",
      component: errandmainpage,
      meta: {requiresAuth: true}
    },
    {
      path: '/search',
      name: 'search2',
      component: searchpage2,
      meta: {requiresAuth: true}
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {requiresAuth: true}
    },
    {
      path: '/selfpage',
      name: 'selfpage',
      component: selfpage,
      meta: {requiresAuth: true}
    },
    {
      path: '/otherpage/:id',
      name: 'otherpage',
      component: otherpage
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: shoppingcartpage,
      meta: {requiresAuth: true}
    },
    {
      path: '/errandtask',
      name: 'errandtask',
      component: errandtaskpage,
      meta: {requiresAuth: true}
    },
    {
      path: '/product',
      name: 'product',
      component: product,
      meta: {requiresAuth: true}
    },
    {
      path: '/checkout/:id',
      name: 'checkoutpage',
      component: checkoutpage,
      meta: {requiresAuth: true},
      children: [
        // {path: '0', component: submitorder,meta: { requiresAuth: true}},
        // {path: '1', component: payment,meta: { requiresAuth: true}},
        // {path: '2', component: payresult,meta: { requiresAuth: true}},
        // {path: '3', component: errandsubmit, meta: { requiresAuth: true}},
        // {path: '4', component: errandpayment,meta: { requiresAuth: true}}
        {path: '0', component: submitorder, meta: {requiresAuth: true}},
        {path: '1', component: payment, meta: {requiresAuth: true}},
        {path: '2', component: merchant_confirm, meta: {requiresAuth: true}},
        {path: '3', component: buyer_confirm, meta: {requiresAuth: true}},
        {path: '4', component: payresult, meta: {requiresAuth: true}},
        {path: '5', component: errandsubmit, meta: {requiresAuth: true}},
        {path: '6', component: errandpayment, meta: {requiresAuth: true}}
      ]
    },
    {
      path: '/payresult',
      name: 'success',
      component: payresult,
      meta: {requiresAuth: true}
    },
    {
      path: '/selfinfo',
      name: 'selfinfo',
      component: selfinfo,
      meta: {requiresAuth: true}
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound,
      meta: {requiresAuth: false}
    }]
})


// router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.getItem('token')
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if(isLogin){
//       next()
//     }else{
//       next({
//         path: '/',
//         query:{redirect:to.fullPath}
//       })
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })
router.beforeEach((to, from, next) => {
  const toflea = ['main', 'search2', "shoppingcart"]
  const toerrand = ['errandmain', "errandtask"]
  if (toflea.indexOf(to.name) > -1) {
    store.state.storetype = "1";
  } else if (toerrand.indexOf(to.name) > -1) {
    store.state.storetype = "2";
  }
  next();
  // TODO 即使未登录islogin也会返回true
  // let goodsurl = store.state.database + 'user/isLogin';
  // const nextRoute = ['main', 'errandmain', 'search2','test', 'selfpage', 'otherpage', 'shoppingcart', 'errandtask', 'product', 'checkoutpage', 'success', 'selfinfo']
  // if (nextRoute.indexOf(to.name) >= 0) {
  //   axios.get(goodsurl).then(
  //     response => {
  //       if (response.status !== 200 && response.status !== "200" ) {
  //         if (from.name === ('login' || 'register')) {
  //           next('/');
  //           return
  //         }
  //         next({name: 'login', params: {redirect: to.fullPath}});
  //       }
  //       alert(response.status )
  //       next();
  //     })
  // }
  // else{
  //   next();
  // }


})


export default router;
