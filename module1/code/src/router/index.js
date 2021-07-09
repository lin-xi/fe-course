import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/arraysort",
    name: "arraysort",
    component: () =>
      import(/* webpackChunkName: "arraysort" */ "../views/ArraySort.vue"),
  },
  {
    path: "/clipboard",
    name: "clipboard",
    component: () =>
      import(/* webpackChunkName: "clipboard" */ "../views/Clipboard.vue"),
  },
  {
    path: "/geolocation",
    name: "geolocation",
    component: () =>
      import(/* webpackChunkName: "geolocation" */ "../views/Geolocation.vue"),
  },
  {
    path: "/keyboard",
    name: "keyboard",
    component: () =>
      import(/* webpackChunkName: "keyboard" */ "../views/Keyboard.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
