import Vue from 'vue'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import App from './App.vue'
import '@/util/tip/aTips.css'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
