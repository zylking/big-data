import Vue from 'vue'
import Axios from 'axios'
import Main from './Main.vue'
import router from './router'
import VeLine from 'v-charts/lib/line.common.min'   // 引入v-charts的折线图
import VeHistogram from 'v-charts/lib/histogram.common.min'   // 引入v-charts的柱状图
import VeRing from 'v-charts/lib/ring.common.min'   // 引入v-charts的环图
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mint);

Vue.component(VeLine.name, VeLine);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VeRing.name, VeRing);

Vue.config.productionTip = false;
Vue.prototype.Toast = Mint.Toast;
Vue.prototype.Axios = Axios;

/**
 * 获取当前时间
 * 格式 YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function (str) {
  let date = str ? new Date(str) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }

  if (day >= 1 && day <= 9) {
    day = '0' + day;
  }

  return year + '-' + month + '-' + day;
};

new Vue({
  router,
  render: h => h(Main)
}).$mount('#index');
