import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    id: null,
  },
  mutations: {
    storeCredentials(state, userData) {
      state.token = userData.token;
      state.user = userData.user;
      state.id = userData.id;
    },
    removeCredentials(state) {
      state.token = null;
      state.user = null;
      state.id = null;
    },
  },
  getters: {
    checkToken: state => state.token,
    checkUser: state => state.user,
    checkId: state => state.id,
  },
  actions: {
    setCredentials({ commit }, userData) {
      commit('storeCredentials', userData);
      const persist = Object.entries(userData);
      persist.forEach(el => localStorage.setItem(...el));
    },
    checkCredentials({ dispatch }) {
      const credential = { token: null, user: null, id: null };
      credential.token = localStorage.getItem('token');
      credential.user = localStorage.getItem('user');
      credential.id = localStorage.getItem('id');
      if (credential.token !== 'null') {
        dispatch('setCredentials', credential);
      } else {
        dispatch('setCredentials', { token: null, user: null, id: null });
      }
    },
    clearCredentials({ commit }) {
      commit('removeCredentials');
      localStorage.clear();
    },
  },
  modules: {},
});
