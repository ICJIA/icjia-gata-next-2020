<template>
  <v-app id="page-top">
    <app-nav />
    <outdated-browser v-if="$browserDetect.isIE"></outdated-browser>
    <app-drawer />

    <v-content
      id="content-top"
      aria-live="polite"
      style="background: #fafafa; min-height: 68vh"
    >
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";
import AppDrawer from "@/components/AppDrawer";
import OutdatedBrowser from "@/components/OutdatedBrowser";
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
    OutdatedBrowser
  },
  methods: {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.canonical = "https://icjia.illinois.gov/gata" + this.$route.path;
      // console.log(this.canonical);
    }
  },
  async mounted() {},
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
      canonical: ""
    };
  }
};
</script>
<style></style>
