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
import selfinfo from "../view/selfinfo.vue";
import errandmainpage from "../view/errandmainpage";
import errandtaskpage from "../view/errandtaskpage";
import errandsubmit from "../components/orderconfirm/errandsubmit";
import errandpayment from "../components/orderconfirm/errandpayment";
import axios from "axios";

Vue.use(Router)

// export default new Router({
//   mode: "history",
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: loginpage
//     },
//     {
//       path: '/register',
//       name: 'register',
//       component: register
//     },
//     {
//       path: '/main',
//       name: 'main',
//       component: homepage
//     },
//     {
//       path: "/errand",
//       name: "errandmain",
//       component: errandmainpage
//     },
//     {
//       path: '/search',
//       name: 'search2',
//       component: searchpage2
//     },
//     {
//       path: '/test',
//       name: 'test',
//       component: test
//     },
//     {
//       path: '/selfpage',
//       name: 'selfpage',
//       component: selfpage
//     },
//     {
//       path: '/otherpage',
//       name: 'otherpage',
//       component: otherpage
//     },
//     {
//       path: '/shoppingcart',
//       name: 'shoppingcart',
//       component: shoppingcartpage
//     },
//     {
//       path: '/errandtask',
//       name: 'errandtask',
//       component: errandtaskpage
//     },
//     {
//       path: '/product',
//       name: 'product',
//       component: product
//     },
//     {
//       path: '/checkout/:id',
//       name: 'checkoutpage',
//       component: checkoutpage,
//       children: [
//         {path: '0', component: submitorder},
//         {path: '1', component: payment},
//         {path: '2', component: payresult},
//         {path: '3', component: errandsubmit},
//         {path: '4', component: errandpayment}
//       ]
//     },
//     {
//       path: '/payresult',
//       name: 'success',
//       component: payresult
//     },
//     {
//       path: '/selfinfo',
//       component: selfinfo
//     },
//     {
//       path: '/*',
//       name: 'notfound',
//       component: notfound
//     }
//   ]
// })

const router = new Router({
  mode:'history',
  routes:[{
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
      path: "/errand",
      name: "errandmain",
      component: errandmainpage
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
      path: '/errandtask',
      name: 'errandtask',
      component: errandtaskpage
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
        {path: '0', component: submitorder},
        {path: '1', component: payment},
        {path: '2', component: payresult},
        {path: '3', component: errandsubmit},
        {path: '4', component: errandpayment}
      ]
    },
    {
      path: '/payresult',
      name: 'success',
      component: payresult
    },
    {
      path: '/selfinfo',
      component: selfinfo
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }]
})

router.beforeEach((to,form,next)=>{
  const nextRoute = ['errandtask']
  let isLogin = sessionStorage.getItem("token");
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      if (from.name === 'login') {
        next('/')
        return
      }
    }
  }
  if (to.name === 'login'){
  }
  next()
})
export default router


