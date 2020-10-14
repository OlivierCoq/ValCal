import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Login from '@/components/Login'

  // Core App
import Calculator from '@/components/Calculator'

import firebase from 'firebase'
Vue.use(Router)

let router = new Router({

  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]

})

//Nav Guards
router.beforeEach((to, from, next) => {
  //Check for requiresAuth Guards
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //Check if NOT logged in
    if(!firebase.auth().currentUser){
      //go to login page:
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route:
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    //Check if IS logged in
    if(firebase.auth().currentUser){
      //go to Calculator:
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route:
      next()
    }
  } else {
    //Proceed to route:
    next()
  }
})

export default router
