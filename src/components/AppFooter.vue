<template>
  <v-footer dark padless class="noprint">
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width: 100%; background: #235e8e"
    >
      <v-card-text>
        <span v-for="link in pages" :key="link.title" class="flexitem">
          <span v-if="link.displayFooter && link.status === 'live'">
            <v-btn
              :to="link.slug === 'home' ? '/' : `/${link.slug}`"
              depressed
              class=" mr-1"
              style="background: #235e8e; font-weight: 900 !important"
              :aria-label="link.title"
            >
              <span v-if="link.menuTitle" style="font-size: 12px">{{
                link.menuTitle
              }}</span>
              <span v-else style="font-size: 12px">{{ link.title }}</span>
            </v-btn>
          </span>
        </span>
      </v-card-text>
    </v-card>
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width: 100%; background: #0D4474"
    >
      <v-divider />

      <v-card-text class="white--text">
        <img
          :src="require('@/assets/icjia-logo-white.png')"
          alt="Illinois Criminal Justice Information Authority"
          width="65"
          class="mt-3"
        />
        <br />

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="white--text"
          icon
          :aria-label="icon"
        >
          <v-icon size="18px">
            {{ icon }}
          </v-icon>
        </v-btn>
        <br />
        <div style="font-size: 12px">
          {{ new Date().getFullYear() }}
          <strong>
            <a href="http://www.icjia.state.il.us" class="footer-link"
              >Illinois Criminal Justice Information Authority</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://archive.icjia.cloud"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Document Archive</a
            >
          </strong>
          &nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/covid19"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >COVID-19 Response</a
            >
          </strong>
          &nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/status"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Site Status</a
            >
          </strong>
          &nbsp;|&nbsp;
          <strong>
            <a
              href="https://github.com/ICJIA/icjia-gata-next-2020"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Github</a
            >
          </strong>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { getAllPages } from "@/services/Content";
export default {
  props: {
    // sections: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter"],
    loading: true,
    pages: []
  }),
  async created() {
    this.pages = await getAllPages();
    this.loading = false;
  },
  methods: {
    getArchive() {
      return `https://${process.env.VUE_APP_ARCHIVE_SERVER_URL}`;
    }
  }
};
</script>

<style>
.footer-link {
  color: #fff !important;
  text-decoration: none;
}

.footer-link:hover {
  color: #aaa !important;
}
</style>
