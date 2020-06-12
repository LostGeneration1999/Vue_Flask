// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Primise.reject(error);
  }
)

const interceptorsResponse = axios.interceptors.request.use(
  response => {
    return response
  },
  error => {
    return Primise.reject(error);
  }
)

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

Vue.config.productionTip = false

Vue.use(Vuetify,{
  iconfont: 'md',
})
Vue.config.productionTip = false

store.dispatch('autoLogin').then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    vuetify : new Vuetify(),
    components: { App },
    template: '<App/>'
  }).$mount('#app');
});

/* eslint-disable no-new */

