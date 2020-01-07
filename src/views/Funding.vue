<template>
  <div>
    <base-content
      v-if="page && page.content && page.status === 200"
      :loading="page.loading"
      style="margin-top: 100px"
    >
      <template v-slot:content>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <h2
                style="text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 25px;"
              >
                Funding Opportunities
              </h2>
              <toggle />
              <list-funding
                :funding="page.funding"
                :toggle-state="toggleState"
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
import ListFunding from "@/components/ListFunding";
import Toggle from "@/components/Toggle";
import { handleClicks } from "@/mixins/handleClicks";
import { getContent, getAllFunding } from "@/services/Content";
import { getHash } from "@/services/Utilities";
import { EventBus } from "@/event-bus";

export default {
  components: {
    BaseContent,
    ListFunding,
    Toggle
  },
  metaInfo() {
    return {
      title: this.pageTitle
    };
  },
  mixins: [handleClicks],
  data() {
    return {
      loading: true,

      page: null,
      hideExpired: true,

      toggleState: null
    };
  },
  computed: {
    pageTitle() {
      if (this.page && this.page.status === 200) {
        return this.page.content.title;
      } else {
        return "Error";
      }
    }
  },
  methods: {
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
    }
  },
  async created() {
    EventBus.$on("toggle", state => {
      this.toggleState = state;
      //console.log(this.toggleState)
    });
    NProgress.start();
    this.loading = true;
    let page = {};
    try {
      page.content = await getContent("pages", "funding");
      page.funding = await getAllFunding();
      page.loading = false;
      page.error = null;
      page.status = 200;
      page.redirect = null;
    } catch (error) {
      this.loading = false;
      this.routeToError();
    }

    this.page = page;
    if (this.page && this.page.status === 200) {
      this.$ga.page({
        page: this.$route.path,
        title: this.pageTitle,
        location: window.location.href
      });
    }
    this.loading = false;
    NProgress.done();
  }
};
</script>

<style>
.news-title:hover {
  color: #065f60 !important;
}
</style>
