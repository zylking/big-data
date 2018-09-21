import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs';
import Main from './Main.vue'
import router from './router'

// mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

// 图表相关
import VeLine from 'v-charts/lib/line.common.min'
import VeHistogram from 'v-charts/lib/histogram.common.min'
import VeRing from 'v-charts/lib/ring.common.min'
import 'v-charts/lib/style.css'

Vue.use(Mint);
Vue.component(VeLine.name, VeLine);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VeRing.name, VeRing);

Vue.config.productionTip = false;
Vue.prototype.Toast = Mint.Toast;
Vue.prototype.MessageBox = Mint.MessageBox;

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.Axios = Axios;
Vue.prototype.$qs = qs;

/**
 * 获取时间
 * str : 时间格式，可以获取指定的时间
 * ago : xx天之前，可以获取今天之前的几天的时间
 * 格式 YYYY-MM-DD
 */
Vue.prototype.getNowFormatDate = function (str, ago) {
  let date = str ? new Date(str) : new Date();

  // 获取几天后的日期/几天前的日期
  if (ago) date.setDate(date.getDate() + ago);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month >= 1 && month <= 9) month = '0' + month;
  if (day >= 1 && day <= 9) day = '0' + day;

  return year + '-' + month + '-' + day;
};

Vue.prototype.showMessage = function (msg) {
  Mint.MessageBox({title: '提示', message: msg, confirmButtonText: '我知道了', closeOnClickModal: false});
};

/**
 * vue-router全局导航，判断是否登录，数据中心放行，其他路由则不允许放行
 */
router.beforeEach(function (to, from, next) {
  switch (to.path) {
    case '/index':
    case '/index.html':
      next();
      break;
    case '/wait':
      _Vue.showMessage('敬请期待！');
      break;
    default:
      let eId = sessionStorage.getItem('entityId');

      // 如果未登录，则直接提示
      if (!eId || eId === 'undefined') {
        if (_Vue) {
          _Vue.showMessage('请先登录！');
        } else {
          Mint.MessageBox({title: '提示', message: '请先登录！', confirmButtonText: '我知道了', closeOnClickModal: false});
        }
        return;
      }

      next();
      break;
  }

});

let _Vue = new Vue({router, render: h => h(Main)}).$mount('#index');
