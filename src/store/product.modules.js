import axios from "axios";
import { PRODUCT_STATUS_URL, BASE_URL } from "./api";

import localStorage from "./utils/LocalStorageService";

const state = {
  products: [],
  loading: false,
  statusMessage: "",
  stopCallingAPI: false,
};

const mutations = {
  SET_PRODUCT(state, payload) {
    let temp = [...payload];
    let tempArr = state.products;
    state.products = [...tempArr, ...temp];
  },
  PRODUCT_LOADING(state, payload) {
    state.loading = payload;
  },
  STATUS_MESSAGE(state) {
    state.statusMessage = "No Product Found !";
  },
  STOPCALLAPI(state, payload) {
    state.stopCallingAPI = payload;
  },
};
const actions = {
  async getProduct({ commit }, info) {
    let Token = localStorage.getAccessToken();
    commit("PRODUCT_LOADING", true);
    try {
      const response = await axios.post(
        `${BASE_URL}${PRODUCT_STATUS_URL}`,
        {
          limit: info.limit,
          status: info.status,
          offset: info.offset,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      const data = response.data;
     

      commit("PRODUCT_LOADING", false);

      if (data.length == 0) {
        commit("STOPCALLAPI", true);
      }

      commit("SET_PRODUCT", data);
      if (data == "") {
        commit("STATUS_MESSAGE", true);
      }
    } catch (e) {
      commit("STATUS_MESSAGE", e.message);
      commit("PRODUCT_LOADING", false);
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
