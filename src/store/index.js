import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import auth from "./auth.modules";
import product from "./product.modules";
import updateProducts from "./updateProducts.modules";

export const store = new Vuex.Store({
  modules:{
    auth,
    product,
    updateProducts,

  }
});