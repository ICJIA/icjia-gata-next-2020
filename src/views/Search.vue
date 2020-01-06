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
            <v-col cols="12" v-if="page.searchContent">
              <search :content="page.searchContent" />
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
import Search from "@/components/Search";
import { handleClicks } from "@/mixins/handleClicks";
import {
  getContent,
  getAllNews,
  getAllPages,
  getAllFunding
} from "@/services/Content";
import { getHash } from "@/services/Utilities";
import { EventBus } from "@/event-bus";

export default {
  components: {
    BaseContent,
    Search
  },
  mixins: [handleClicks],
  computed: {},
  data() {
    return {
      loading: true,
      page: null,
      hideExpired: true,
      toggleState: null
    };
  },
  async created() {
    this.loading = true;
    let page = {};
    try {
      page.content = await getContent("pages", "search");
      page.loading = false;
      page.error = null;
      page.status = 200;
      page.redirect = null;
      let news = await getAllNews();
      let funding = await getAllFunding();
      let pages = await getAllPages();
      page.searchContent = [...news, ...funding, ...pages].filter(item => {
        return item.status === "live";
      });
    } catch (error) {
      this.loading = false;
      this.$router.push(`/404`);
    }

    this.page = page;
    this.loading = false;
  }
};
</script>

<style></style>
