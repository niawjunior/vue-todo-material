import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { rtdbPlugin } from 'vuefire'
Vue.use(VueMaterial)
Vue.use(VeeValidate)
Vue.use(rtdbPlugin)

import store from './store'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
