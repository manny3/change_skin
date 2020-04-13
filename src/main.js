import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMeta from 'vue-meta';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import store from './store';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import roundFilter from './filters/round';

Vue.config.productionTip = false;

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: tw.messages[rule],
  });
});

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueMeta);

Vue.config.productionTip = false;

Vue.component('Loading', Loading);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.filter('round', roundFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api)
      .then((res) => {
        if (res.data.success) {
          next();
        } else {
          next({
            path: '/login',
          });
        }
      });
  } else {
    next();
  }
});
