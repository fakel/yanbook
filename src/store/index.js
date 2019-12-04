import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    storeCredentials(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
    },
    removeCredentials(state) {
      state.token = null;
      state.user = null;
    },
  },
  getters: {
    checkUser: state => state.token,
  },
  actions: {
    setCredentials({ commit }, userData) {
      commit('storeCredentials', userData);
      const persist = Object.entries(userData);
      persist.forEach(el => localStorage.setItem(...el));
    },
    checkCredentials({ dispatch }) {
      const credential = { token: null, user: null };
      credential.token = localStorage.getItem('token');
      credential.user = localStorage.getItem('user');
      if (credential.token !== 'null') {
        dispatch('setCredentials', credential);
      } else {
        dispatch('setCredentials', { token: null, user: null });
      }
    },
    clearCredentials({ commit }) {
      commit('removeCredentials');
      localStorage.clear();
    },
  },
  modules: {},
});
