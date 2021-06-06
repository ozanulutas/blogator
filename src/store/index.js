import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      blog: {}
    }
  },
  mutations: {
    setBlog(state, payload) {
      state.blog = payload;
    }
  }
});

export default store;