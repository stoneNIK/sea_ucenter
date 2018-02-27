// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Resource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(Resource)
Vue.use(VueI18n)
Vue.use(VeeValidate)

const messages = {
  'en': require('./translate/en.json'),
  'zh-cn': require('./translate/zh_cn.json'),
  'tr': require('./translate/tr.json')
}
const i18n = new VueI18n({
  locale: navigator.language.toLowerCase(),
  fallbackLocale: 'en', // 如果没有当地语言，使用英语
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
