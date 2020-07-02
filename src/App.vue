<template>
  <v-app id="page-top">
    <app-nav />

    <app-drawer />

    <Outdated
      v-if="$store.state && !$store.state.warningSeen && $browserDetect.isIE"
    ></Outdated>

    <v-main
      id="content-top"
      aria-live="polite"
      style="background: #fafafa; min-height: 68vh"
    >
      <Corona ref="alert" />
      <!-- <corona :showWarning="showWarning"></corona> -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { EventBus } from "@/event-bus";
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";
import AppDrawer from "@/components/AppDrawer";
// import OutdatedBrowser from "@/components/OutdatedBrowser";
import Outdated from "@/components/Outdated";
import Corona from "@/components/Corona";
export default {
  name: "App",
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "ICJIA GATA",
      // all titles will be injected into this template
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en"
      },
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        { charset: "utf-8" },
        {
          vmid: "robots",
          name: "robots",
          content: "index, follow"
        },
        {
          vmid: "description",
          name: "description",
          content: "Description here"
        }
      ]
    };
  },
  components: {
    AppNav,
    AppFooter,
    AppDrawer,
    Outdated,
    Corona
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 100;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.canonical = "https://icjia.illinois.gov/gata" + this.$route.path;
      // console.log(this.canonical);
      if (this.$refs.alert) this.$refs.alert.reset();
    }
  },
  mounted() {
    EventBus.$on("showWarning", bool => (this.showWarning = bool));
  },
  async created() {
    this.loading = true;

    if (!this.$store.state.isAppReady) {
      const configPromise = process.BROWSER_BUILD
        ? import("@/config.json")
        : Promise.resolve(require("@/config.json"));
      let config = await configPromise;

      this.loading = false;
    }
  },
  data() {
    return {
      loading: true,
      pages: [],
      canonical: "",
      showWarning: true
    };
  }
};
</script>
<style></style>
