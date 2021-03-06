<template>
  <div>
    <base-content
      v-if="page && page.content && page.status === 200"
      :loading="page.loading"
      style="margin-top: 100px"
    >
      <template v-slot:title>
        <v-container v-if="page.content && page.status === 200">
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title">
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
              md="12"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content markdown-body px-4"
                @click="handleClicks"
                v-html="page.content.html"
              />
            </v-col>
            <v-col cols="12" v-if="page.news">
              <ListNewsTable :items="filteredNews" />
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
import ListNewsTable from "@/components/ListNewsTable";
import { handleClicks } from "@/mixins/handleClicks";
import { getContent, getAllNews } from "@/services/Content";
import { getHash } from "@/services/Utilities";
import { EventBus } from "@/event-bus";

export default {
  components: {
    BaseContent,
    ListNewsTable
  },
  metaInfo() {
    return {
      title: this.pageTitle
    };
  },
  mixins: [handleClicks],
  computed: {
    filteredNews() {
      let filteredNews = this.page.news.filter(item => {
        return item.status === "live";
      });
      return filteredNews;
    },
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
  data() {
    return {
      loading: true,

      page: null,
      hideExpired: true,

      toggleState: null
    };
  },
  async created() {
    NProgress.start();
    this.loading = true;
    let page = {};
    try {
      page.content = await getContent("pages", "news");
      page.news = await getAllNews();
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
