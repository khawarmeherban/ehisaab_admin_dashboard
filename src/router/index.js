
import Vue from "vue";
import VueRouter from "vue-router";
import { validateToken } from "../store/utils/helper.js";
import Layout from "../components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  
  {
    path: "/",
    name: "Dashboard",
    // component: Layout
    component: () => import("../pages/Dashboard"),
    meta: { layout: Layout },
    beforeEnter(to, from, next) {
      if (validateToken()) {
        next();
      } else {
        next({
          name: "Login",
        });
      }
    },
  },
  {
    path: "/product",
    name: "productPage",
    component: () => import("../pages/Product/productPage"),
    meta: { layout: Layout },
    beforeEnter(to, from, next) {
      if (validateToken()) {
        next();
      } else {
        next({  
          name: "Login",
        });
      }
    }
}, 
{
    path: "/notify",
    name: "Notification",
    component: () => import("../components/commons/Notification"),
    meta: {layout: Layout},
    beforeEnter(to, from, next){
      if(validateToken()){
        next();
      }else{
        next({
          name: "Login"
        })
      }
    }
},
  {
    path: "/login",
    name: "Login",
    // component: Login,
    component: () => import("../pages/Login"),
    beforeEnter(to, from, next) {
      if (!validateToken()) {
        // console.log(" before" , validateToken)
        next();
      } else {
        next({
          name: "Dashboard"
        })
      }
    },
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
