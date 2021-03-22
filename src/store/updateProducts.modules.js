import axios from "axios";
import { BASE_URL, UPDATE_PRDOUCT } from "./api";

import localStorage from "./utils/LocalStorageService";
// const LocalStorageService = localStorage.getService();
const state = {
  updateLoading: false,
  productID: null,
  acceptProduct: null,
  UpdationMessage: {
    msg: "",
    type: 0,
  },
};
const mutations = {
  SET_PRODUCT_ID(state, payload) {
    state.productID = payload;
  },
  STATUSTYPE(state, payload) {
    state.acceptProduct = payload;
  },
  SET_BUTTON_LOADER(state, payload) {
    state.updateLoading = payload;
  },
  UPDATE_STATUS_MESSAGE(state, payload) {
    state.UpdationMessage = payload;
  },
};

const actions = {
  async updateProduct({ commit }, info) {
    let Token = localStorage.getAccessToken();
    commit("SET_PRODUCT_ID", info.id);
    commit("SET_BUTTON_LOADER", true);
    commit("STATUSTYPE", info.status);
    commit("UPDATE_STATUS_MESSAGE", {
      msg: "",
      type: 0
    });
    try {
      const response = await axios.post(
        `${BASE_URL}${UPDATE_PRDOUCT}`,
        {
          id: info.id.toString(),
          status: info.status.toString(),
        },

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      const data = response.data;
      commit("UPDATE_STATUS_MESSAGE", {
        msg: data,
        type: 1,
      });
      commit("SET_BUTTON_LOADER", false);
    } catch (e) {
      commit("SET_BUTTON_LOADER", false);
      commit("UPDATE_STATUS_MESSAGE", {
        msg: e.message,
        type: 2,
      });
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
