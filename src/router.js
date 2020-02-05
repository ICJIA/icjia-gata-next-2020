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
     * Technical Assistance redirect
     *
     */

    {
      path: "/ta",
      redirect: "/technical-assistance"
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
        import(/* webpackChunkName: "funding" */ "@/views/FundingSingle.vue")
    },

    {
      path: "/funding",
      name: "funding",
      component: () =>
        import(/* webpackChunkName: "funding" */ "@/views/Funding.vue")
    },
    /**
     *
     * Search
     *
     */

    {
      path: "/search",
      name: "search",
      component: () =>
        import(/* webpackChunkName: 'search' */ "@/views/Search.vue")
    },
    /**
     *
     * Registration
     *
     */

    {
      path: "/registration",
      name: "registration",
      component: () =>
        import(
          /* webpackChunkName: 'registration' */ "@/views/Registration.vue"
        )
    },
    /**
     *
     * News
     *
     */
    {
      path: "/news/:slug",
      name: "newsSingle",
      component: () =>
        import(/* webpackChunkName: "news" */ "@/views/NewsSingle.vue")
    },

    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "news" */ "@/views/News.vue")
    },
    /**
     *
     * Error
     *
     */

    {
      path: "/error",
      name: "error",
      component: () => import(/* webpackChunkName: '404' */ "@/views/Error.vue")
    },

    /**
     *
     * Default
     *
     */
    {
      path: "/:slug",
      name: "page",
      component: () => import(/* webpackChunkName: "Page" */ "@/views/Page.vue")
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
