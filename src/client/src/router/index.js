import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/components/Home'

// Global components
import Header from '@/components/Header'

// Register components
Vue.component('app-header', Header);

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header
      }
    }
  ]
});

export default router
