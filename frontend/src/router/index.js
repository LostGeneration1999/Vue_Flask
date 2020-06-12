import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/view/Signup'
import Login from '@/components/view/Login'
import store from '../store'

Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
  
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter(to, from, next){
        if (store.getters.idToken){
          next();
        }
        else{
          next('/login');
        }
      }
    },
    {
      path: '/signup',
      name: 'Sign',
      component: Signup,
      beforeEnter(to, from, next){
        if (store.getters.idToken){
          next('/');
        }
        else{
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next){
        if (store.getters.idToken){
          next('/');
        }
        else{
          next();
        }
      }
    }
  ]
})
