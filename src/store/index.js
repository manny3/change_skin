import Vue from 'vue';
import Vuex from 'vuex';

import cartModules from './cart';
import productModules from './product';
import alertModules from './alert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  modules: {
    cartModules,
    productModules,
    alertModules,
  },
});
