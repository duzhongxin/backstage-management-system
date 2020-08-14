import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import echarts from 'echarts'
import moment from 'moment'

Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  moment,
  render: h => h(App),
}).$mount('#app')