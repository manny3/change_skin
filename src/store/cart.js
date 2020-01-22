import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {
      carts: [],
    },
  },
  actions: {
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((res) => {
        if (res.data.data.carts) {
          context.commit('CART', res.data.data);
        }
        context.commit('LOADING', false, { root: true });
      });
    },
    addToCart(context, { id, qty = 1 }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = { product_id: id, qty };
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: cart }).then((res) => {
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
        context.dispatch('alertModules/updateMessage', { message: res.data.message, status: 'success' }, { root: true });
      });
    },
    removeCartItem(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((res) => {
        context.dispatch('alertModules/updateMessage', { message: res.data.message, status: 'danger' }, { root: true });
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart: state => state.cart,
  },
};
