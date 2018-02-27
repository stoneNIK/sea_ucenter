import Vue from 'vue'
import Vuex from 'vuex'
import Resource from 'vue-resource'
import Config from '../config'

Vue.use(Vuex)
Vue.use(Resource)

let store = new Vuex.Store({
  state: {
    user: {},
    isLoading: false
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  },
  actions: {
    getUserAsync ({commit}) {
      return new Promise((resolve, reject) => {
        Vue.http.jsonp(Config.uc + '/login/islogin.html')
          .then(response => {
            if (response.body.data) {
              commit('updateUser', {user: response.body.data})
              resolve(response.body.data)
            }
          })
          .catch(response => {
            // error callback
            console.log(response)
            reject(false)
          })
      })
    }
  }
})

export default store
