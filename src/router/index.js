import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductList.vue"),
  },
  {
    path: "/productDetail",
    name: "productDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("Navigating to:", to.path);
  const token = store.getters["auth/token"];
  console.log(token);
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  if (authRequired) {
    if (!store.getters["auth/isLoggedIn"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
