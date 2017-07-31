// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router'
import VueResource from 'vue-resource'

import route from './router/index'
import './common/stylus/index.styl'
/* eslint-disable no-new */
Vue.use(Router);
Vue.use(VueResource);/*全局注册*/
let router = new Router(route)
new Vue({
  router,
  el: '#app',
  render:(h)=>h(App)
});

