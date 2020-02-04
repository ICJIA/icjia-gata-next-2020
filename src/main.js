import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import "@/filters";
import "@/css/github-markdown.css";
import "@/css/app.css";

// import AOS from "aos";
// import "aos/dist/aos.css";

(function() {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
})();

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: "UA-150082887-5",
  debug: {
    sendHitTask: process.env.NODE_ENV === "production"
  }
});

import VueRouterBackButton from "vue-router-back-button";
Vue.use(VueRouterBackButton, { router });

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    installComponents: true,
    libraries: "places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

Vue.config.productionTip = false;
Vue.config.silent = true;
// eslint-disable-next-line no-undef
NProgress.configure({ showSpinner: false });

new Vue({
  router,
  store,
  // created() {
  //   AOS.init();
  // },
  vuetify,
  render: h => h(App)
}).$mount("#app");
