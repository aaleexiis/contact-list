import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/components/Home'
import CreateContact from '@/components/CreateContact'
import ViewContact from '@/components/ViewContact'

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
    },
    {
      path: '/contacts/create',
      name: 'CreateContact',
      components: {
        default: CreateContact,
        header: Header
      }
    },
    {
      path: '/contacts/view/:id',
      name: 'ViewContact',
      components: {
        default: ViewContact,
        header: Header
      },
      props: (route) => ({
        mode: route.query.mode
      })
}
  ]
});

export default router
