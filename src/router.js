import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const LS_ROUTE_KEY = process.env.VUE_APP_LS_ROUTE_KEY;

const router = new Router({
  mode: "history",
  base: `${process.env.BASE_URL}`,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    /**
     *
     * Home
     *
     */
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {}
    },
    /**
     *
     * Funding
     *
     */
    {
      path: "/funding/:slug",
      name: "fundingSingle",
      component: () =>
        import(/* webpackChunkName: "funding" */ "./views/fundingSingle.vue")
    },

    {
      path: "/funding",
      name: "funding",
      component: () =>
        import(/* webpackChunkName: "funding" */ "./views/funding.vue")
    }
  ]
});

router.afterEach((to, from) => {
  try {
    localStorage.setItem(LS_ROUTE_KEY, from.path);
  } catch (e) {
    console.log(e);
  }
});

export default router;
