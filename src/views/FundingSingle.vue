<template>
  <div>
    <base-content
      v-if="page"
      id="baseContentTop"
      class="mb-12"
      :loading="page.loading"
      style="margin-top: 55px"
    >
      <template v-if="isExpired && !$browserDetect.isIE" slot="expired">
        <div
          style="background: #EF5350; color: #fff; font-weight: bold; font-size: 18px; margin-left: -20px; margin-right: -20px; margin-top: -10px"
          class="px-2 py-2 text-center mb-10"
        >
          THIS FUNDING OPPORTUNITY HAS EXPIRED
        </div>
      </template>
      <template v-slot:title>
        <v-container v-if="page.content && page.status === 200">
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title uppercase">
                <span v-if="page.content && page.content.fundingType">
                  {{ page.content.fundingType }}
                </span>
                <span v-else>
                  NOTICE OF FUNDING OPPORTUNITY
                </span>

                <br />
                {{ page.content.title }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:content>
        <v-container v-if="page.content && page.status === 200" id="scrollArea">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              :md="dynamicFlex()"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content markdown-body"
                v-html="page.content.html"
                @click="handleClicks"
              />
            </v-col>
            <v-col
              v-if="showToc"
              cols="12"
              sm="12"
              md="3"
              order-md="2"
              order="1"
              order-sm="1"
            >
              <TOC
                selector="#scrollArea"
                top="#baseContentTop"
                :enable-tracking="page.content.enableTracking"
                :key="page.content.title"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import BaseContent from "@/components/BaseContent";
import TOC from "@/components/TOC";
import { getContent } from "@/services/Content";
import { handleClicks } from "@/mixins/handleClicks";
export default {
  components: {
    BaseContent,
    TOC
  },
  watch: {
    $route: "fetchContent"
  },
  mixins: [handleClicks],
  async created() {
    this.fetchContent();
  },
  metaInfo() {
    return {
      title: this.pageTitle
    };
  },
  data() {
    return {
      hideExpired: true,
      content: null,
      loading: true,
      showToc: false,
      page: null,
      renderKey: 1
    };
  },
  computed: {
    pageTitle() {
      if (this.page && this.page.status === 200) {
        return this.page.content.title;
      } else {
        return "Error";
      }
    },
    isExpired() {
      const today = new Date();
      const target = new Date(today.getTime() + 24 * 60 * 60 * 250);
      const expiration = new Date(this.page.content.expires);
      expiration.setDate(expiration.getDate() + 2);
      console.log(expiration);
      if (expiration < target) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    if (this.page) {
      if (this.page.redirect) {
        console.log("Redirect: ", this.page);
        //this.$router.push(`${this.page.redirect}`)
      }
    }
  },
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return this.showToc ? "9" : "12";
      }
    },
    routeToError() {
      this.page = null;
      this.loading = false;
      this.$router
        .push({
          name: "error",
          params: {
            msg: "Page not found",
            statusCode: 404,
            debug: this.$route.params
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {});
    },

    async fetchContent() {
      NProgress.start();
      this.loading = true;
      let page = {};
      try {
        page.content = await getContent("funding", this.$route.params.slug);
        page.error = null;
        page.status = 200;
        page.redirect = null;

        page.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.routeToError();
      }
      this.page = page;
      if (this.page.status === 200) {
        this.page = page;
        this.showToc = this.page.content.showToc;
        this.loading = false;
        this.$ga.page({
          page: this.$route.path,
          title: this.pageTitle,
          location: window.location.href
        });
      }
      this.loading = false;
      NProgress.done();
    }
  }
};
</script>

<style>
.uppercase {
  text-transform: uppercase;
}
</style>
