import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    control1: 10,
    control2: 20,
    control3: 20
  },
  mutations: {
    setControlState(state, payload) {
      state[payload.target] = payload.value;
    }
  },
  actions: {},
  modules: {}
});
