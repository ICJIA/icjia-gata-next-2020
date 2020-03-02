<template>
  <div>
    <v-app-bar color="white" fixed height="90" class="noprint">
      <v-app-bar-nav-icon
        aria-label="Menu"
        style="color: black"
        large
        @click="toggleDrawer"
      />
      <div style="width: 15px" />
      <img
        :src="require('@/assets/icjia-logo.png')"
        alt="Illinois Criminal Justice Information Authority"
        :width="logoWidth()"
        style="margin-left: -5px; margin-right: 8px;"
        class="hover"
        @click="
          $router.push('/').catch(err => {
            $vuetify.goTo(0);
          })
        "
      />&nbsp;&nbsp;&nbsp;&nbsp;

      <v-toolbar-title
        class="heavy hover"
        @click="
          $router.push('/').catch(err => {
            $vuetify.goTo(0);
          })
        "
      >
        <span style="" class="agency hover"
          >GRANT INFO<span
            v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
            >RMATION</span
          ></span
        >
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        :to="item.path === '/home' ? '/' : `${item.path}`"
        text
        class="hidden-sm-and-down"
        style="font-weight: 900"
        :aria-label="item.title"
        v-for="item in links"
        :key="item.menuTitle"
        >{{ item.menuTitle }}</v-btn
      >
      <v-btn text to="/search">
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    test
  </div>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import { getAllPages } from "@/services/Content";
import { EventBus } from "@/event-bus";
export default {
  async created() {
    let pages = await getAllPages();

    let filteredPages = pages.filter(item => {
      if (item.showInNav) return item;
    });
    this.links = filteredPages;
    console.log(this.links);
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      links: null
    };
  },
  mounted() {},
  methods: {
    toggleDrawer() {
      EventBus.$emit("toggleDrawer");
    },
    logoWidth() {
      //console.log(this.$vuetify.breakpoint);
      if (this.$vuetify.breakpoint.xs) {
        return 50;
      } else {
        return 90;
      }
    }
  }
};
</script>

<style>
.agency {
  font-weight: 900;
  font-size: 24px;
}
</style>
