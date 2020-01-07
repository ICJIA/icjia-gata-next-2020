<template>
  <div>
    <v-card
      class="py-0 mx-0 px-10"
      style="border-bottom: 1px solid #ddd"
      :class="{
        'elevation-3': elevation,
        'elevation-0': !elevation
      }"
    >
      <v-row>
        <v-col v-if="displayNewsLink" cols="12">
          <div class="text-right mr-10">
            <div
              class="heavy category hover"
              style="color: #fff !important; text-decoration: none !important; font-weight: 900 !important"
              @click="
                $router.push('/news').catch(err => {
                  $vuetify.goTo(0);
                })
              "
            >
              ICJIA GATA News
            </div>
          </div>
        </v-col>
      </v-row>
      <v-list-item three-line>
        <v-list-item-content>
          {{ content.posted | format }}
          <h2 class="news-headline" style="">
            <router-link :to="`/news/${content.slug}`" class="news-link">
              {{ content.title }}
            </router-link>
          </h2>
        </v-list-item-content>
      </v-list-item>
      <v-card-text style="font-size: 14px" class="">
        <div
          class="dynamic-content markdown-body"
          @click="handleClicks"
          v-html="content.html"
        />

        <v-container class="mt-4">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <!-- <div
                class="text-right"
                v-if="
                  content.updatedAt &&
                    displayUpdated(content.createdAt, content.updatedAt)
                "
              >
                Last updated: {{ content.updatedAt | timeAgoFormat }}
              </div> -->
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable vue/no-v-html */
import { handleClicks } from "@/mixins/handleClicks";

export default {
  components: {},
  mixins: [handleClicks],
  props: {
    height: {
      type: Number,
      default: 150
    },
    content: {
      type: Object,
      default: () => {}
    },
    elevation: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    displayNewsLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.cardBackground {
  background: #fff !important;
}
</style>
