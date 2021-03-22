import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
// import vuetify from 'plugins/vuetify';
import vuetify from './plugins/vuetify.js'
import router from './router/index.js'
import {store} from './store/index'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
