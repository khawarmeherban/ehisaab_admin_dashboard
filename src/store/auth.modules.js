import axios from "axios";
import { LOGIN_URL, BASE_URL } from "./api";
// import router from "../router/index"

import localStorage from "./utils/LocalStorageService";
const LocalStorageService = localStorage.getService();
// const routes = router;

const state = {
  authLoading: false,
  authStatus: {
    msg: "",
    type: 0,
  },
};
const mutations = {
  AUTH_SUCCES(state, payload) {
    state.User = payload;
    state.Token = payload;
  },
  AUTH_STATUS_MESSAGE(state, payload) {
    state.authStatus = payload;
  },
  AUTH_LOADING(state, payload) {
    state.authLoading = payload;
  },
};

const actions = {
  async userLogin({ commit }, token) {
   var current_user = token;
    commit("AUTH_LOADING", true);
    commit("AUTH_STATUS_MESSAGE",{
      msg: "",
      type: 0,
    });
    try {
      const response = await axios.post(
        `${BASE_URL}${LOGIN_URL}`,
        current_user,
      );
      const token = response.data.token;
      const user = response.data.user;
      console.log("token ", token, "user" ,user)
      commit("AUTH_LOADING", false);
      commit("AUTH_SUCCES", token, user);
      commit("AUTH_STATUS_MESSAGE",{
        msg: 'Login Successfully',
        type:1,
      });
      LocalStorageService.setCurrentUser(current_user);
      LocalStorageService.setToken(token);
      window.location = "/";
    } catch (e) {
      commit("AUTH_STATUS_MESSAGE",{
        msg: e.message,
        type: 2
      });
      commit("AUTH_LOADING", false);
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
