<template>
  <v-app-bar color="white" fixed height="90" class="noprint">
    <div style="width: 15px" />

    <img
      :src="require('@/assets/icjia-logo.png')"
      alt="Illinois Criminal Justice Information Authority"
      :width="logoWidth()"
      style="margin-left: -5px; margin-right: 8px;"
      class="hover"
      @click="$router.push('/')"
    />&nbsp;&nbsp;&nbsp;&nbsp;
    <v-toolbar-title class="heavy hover" @click="$router.push('/')">
      <span style="" class="agency hover">ICJIA GATA INFORMATION</span>
    </v-toolbar-title>
    <v-spacer />

    <div class="flex-grow-1" />
    <span
      style="font-weight: 900"
      class="hover hidden-sm-and-down"
      @click="toggleDrawer"
    >
      MENU&nbsp;
    </span>
    <v-app-bar-nav-icon style="color: black" large @click="toggleDrawer" />
  </v-app-bar>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import { EventBus } from "@/event-bus";
export default {
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
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
