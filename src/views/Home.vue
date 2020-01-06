<template>
  <div>
    <div
      v-if="page && page.content && page.status === 200"
      class="text-center py-8"
      style="background: #0D4474; margin-top:90px;"
    >
      <h1 style="color: #fff">
        {{ page.content.title }}
      </h1>
    </div>

    <base-content
      v-if="page && page.content && page.status === 200"
      :loading="page.loading"
    >
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
          </v-row>
        </v-container>
        <div
          style="background: #f5f5f5; border-top: 1px solid #ddd"
          class="py-8"
        >
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
        </div>
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
  mixins: [handleClicks],
  data() {
    return {
      loading: true,

      page: null,
      hideExpired: true,

      toggleState: null
    };
  },
  async created() {
    EventBus.$on("toggle", state => {
      this.toggleState = state;
      //console.log(this.toggleState)
    });
    this.loading = true;
    let page = {};
    try {
      page.content = await getContent("pages", "home");
      page.funding = await getAllFunding();
      page.loading = false;
      page.error = null;
      page.status = 200;
      page.redirect = null;
    } catch (error) {
      this.loading = false;
      this.$router.push(`/404`);
    }

    this.page = page;
    if (this.page && this.page.status === 200) {
      this.$ga.page({
        page: this.$route.path,
        title: "Home",
        location: window.location.href
      });
    }
    this.loading = false;
  }
};
</script>

<style>
.news-title:hover {
  color: #065f60 !important;
}
</style>
