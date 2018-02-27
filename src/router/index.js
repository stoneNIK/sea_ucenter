import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
import Terms from '@/components/Law/terms'
import Policy from '@/components/Law/policy'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }, {
      path: '/terms',
      name: 'Terms',
      component: Terms
    }, {
      path: '/policy',
      name: 'policy',
      component: Policy
    }
  ]
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
