// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import Vuetify from 'vuetify'

// Helpers
import colors from 'vuetify/es5/util/colors'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueCookie);
Vue.use(Vuetify, {
  theme: {
    primary: '#7FB800',
    secondary: '#00A6ED',
    info: '#F5BB00',
    error: '#F6511D',
    accent: '#587291'
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    drawer: null
  },
  template: '<App/>',
  components: { App }
})
