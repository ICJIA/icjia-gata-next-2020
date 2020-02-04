<template>
  <div>
    <v-container>
      <div ref="Test01">
        <div v-if="!loading">
          <div v-for="item in feed" :key="item.title">
            <v-card class="mb-10 px-5 py-5">
              <h3>{{ item.title }}</h3>

              <!-- <span v-for="(category, index) in item.categories" :key="index">
                {{ category }}
              </span> -->
              {{ item.details[0].description }}
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import moment from "moment";
export default {
  data() {
    return {
      headings: null,
      loading: true,
      feed: null,
      moment
    };
  },
  props: {
    activeTab: {
      type: Number,
      default: null
    }
  },
  created() {},
  mounted() {
    console.log("mounted");
    this.getFeed();
  },

  methods: {
    getHeadings() {
      let headings = document.getElementsByClassName(`tocHeading-0`);
      this.headings = Array.from(headings);
    },
    async getFeed() {
      this.loading = true;
      let feed = null;
      feed = require(`../../public/api/grants-dot-gov.json`);
      const sorted = _.sortBy(feed, "title");
      // //console.log(sorted);
      this.feed = sorted;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
