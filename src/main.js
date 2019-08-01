import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(VeeValidate)

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
