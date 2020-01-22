import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    categories: [],
  },
  actions: {
    getProducts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((res) => {
        if (res.data.success) {
          context.commit('PRODUCTS', res.data.products);
          context.commit('CATEGORIES', res.data.products);
        }
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    products: state => state.products,
    categories: state => state.categories,
  },
};
