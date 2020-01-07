<template>
  <v-form class="pl-2" style="margin-top: -25px;">
    <v-text-field
      v-model="query"
      label="Search"
      placeholder="Enter search term"
      @keyup="instantSearch"
    />
    <div v-for="(result, index) in queryResults" :key="index" class="px-4 py-3">
      <div v-if="query.length">
        <div @click="routeAndLogEvent(result)" class="hover searchTitle">
          <h2>{{ result.title }}</h2>
        </div>
        <p class="hover" @click="routeAndLogEvent(result)">
          {{ result.excerpt }}
        </p>
      </div>
    </div>
  </v-form>
</template>

<script>
import Fuse from "fuse.js";

export default {
  props: {
    content: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: "",
      queryResults: []
    };
  },
  computed: {},
  watch: {
    query(newValue, oldValue) {}
  },

  mounted() {
    this.fuse = new Fuse(this.content, {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "searchMeta",
        "title",
        "excerpt",
        "section",
        "posted",
        "expires",
        "slug"
      ]
    });
  },
  methods: {
    instantSearch() {
      this.queryResults = this.fuse.search(this.query);
    },
    routeAndLogEvent(item) {
      if (!item.path) return;
      console.log(this.query + " --> ", item.path);
      this.$ga.event({
        eventCategory: "Search Conversion",
        eventAction: "Click",
        eventLabel: "Query: '" + this.query + "' --> " + `${item.path}`
      });
      this.$router.push(`${item.path}`).catch(err => {
        this.$vuetify.goTo(0);
      });
    }
  }
};
</script>

<style scoped>
.searchTitle:hover {
  color: #777;
}
</style>
