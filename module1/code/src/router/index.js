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
    path: "/webrtc",
    name: "webrtc",
    component: () =>
      import(/* webpackChunkName: "voiceChat" */ "../views/WebRTC.vue"),
  },
  {
    path: "/shortUrl",
    name: "shortUrl",
    component: () =>
      import(/* webpackChunkName: "shortUrl" */ "../views/ShortURL.vue"),
  },
  {
    path: "/webRTCScreenShot",
    name: "webRTCScreenShot",
    component: () =>
      import(
        /* webpackChunkName: "webRTCScreenShot" */ "../views/WebRTCScreenShot.vue"
      ),
  },
  {
    path: "/webWorker",
    name: "webWorker",
    component: () =>
      import(/* webpackChunkName: "webWorker" */ "../views/WebWorker.vue"),
  },
  {
    path: "/lasyImage",
    name: "lasyImage",
    component: () =>
      import(/* webpackChunkName: "lasyImage" */ "../views/LasyImage.vue"),
  },
  {
    path: "/imageGrid",
    name: "imageGrid",
    component: () =>
      import(/* webpackChunkName: "imageGrid" */ "../views/ImageGrid.vue"),
  },
  {
    path: "/floatToBinary",
    name: "floatToBinary",
    component: () =>
      import(/* webpackChunkName: "lab" */ "../views/FloatToBinary.vue"),
  },
  {
    path: "/lessTheme",
    name: "lessTheme",
    component: () =>
      import(/* webpackChunkName: "lab" */ "../views/LessTheme.vue"),
  },
  {
    path: "/fishTemplate",
    name: "fishTemplate",
    component: () =>
      import(
        /* webpackChunkName: "fishTemplate" */ "../views/FishTemplate.vue"
      ),
  },
  {
    path: "/bitmask",
    name: "bitmask",
    component: () =>
      import(/* webpackChunkName: "bitmask" */ "../views/BitMask.vue"),
  },
  {
    path: "/memory",
    name: "memory",
    component: () =>
      import(/* webpackChunkName: "memory" */ "../views/Memory.vue"),
  },
  {
    path: "/lab",
    name: "lab",
    component: () => import(/* webpackChunkName: "lab" */ "../views/Lab.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
