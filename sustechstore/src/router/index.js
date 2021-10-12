import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import notfound from "../view/notfound"
import h_m_f from "../layout/h_m_f";

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'h_m_f',
      component: h_m_f
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/*',
      name: 'notfound',
      component: notfound
    }
  ]
})
