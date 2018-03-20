import Vue from 'vue';
import iview from 'iview';
import App from './App';
import router from './router';

import store from './store';

import './less/app.less';

Vue.config.productionTip = false;

Vue.use(iview);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
