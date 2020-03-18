<template>
  <div>
    <v-container
      v-if="
        $vuetify.breakpoint.md ||
          $vuetify.breakpoint.lg ||
          $vuetify.breakpoint.xl
      "
    >
      <v-row class="mb-12">
        <v-col>
          <div>
            <h1 class="page-title mb-10">
              WORKSHOP REGISTRATION
            </h1>
            <p>
              Take the mystery out of securing state grant funding with an ICJIA
              Technical Assistance Workshop. ICJIA offers workshops throughout
              the state to ease the application process for organizations
              seeking grant funding. Participants will receive an overview of
              the ICJIA grant process and what it means to comply with the Grant
              Accountability and Transparency Act (GATA).
            </p>
            <p>
              <router-link to="/technical-assistance">Click here</router-link>
              for more information. Questions? Contact
              <a href="mailto: CJA.GrantTA@Illinois.gov"
                >CJA.GrantTA@Illinois.gov</a
              >
            </p>
            <v-card class="mt-8">
              <v-tabs
                v-model="tab"
                grow
                centered
                icons-and-text
                background-color="grey lighten-2"
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-by-date">
                  All Workshops

                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>format_align_justify</v-icon>
                </v-tab>

                <v-tab :disabled="loading || isError" href="#tab-map">
                  Workshops by Location
                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>add_location</v-icon>
                </v-tab>

                <v-tab :disabled="loading || isError" href="#tab-full-list">
                  Workshops by Date
                  <v-icon
                    v-if="loading"
                    left
                    :disabled="loading"
                    class="custom-loader"
                    color="blue darken-4"
                    >cached</v-icon
                  >
                  <v-icon v-else left>calendar_today</v-icon>
                </v-tab>
              </v-tabs>
              <div
                v-if="isError"
                class="mt-8 text-center"
                style="color: red; font-size: 16px"
              >
                <div>
                  Cannot get workshop information. Please reload and try again.
                </div>

                <div>
                  If this error persists, please contact
                  <a href="mailto: CJA.GrantTA@Illinois.gov"
                    >CJA.GrantTA@Illinois.gov</a
                  >.
                </div>
                <div style="font-weight: 900" class="mt-5">
                  {{ errorMsg }}
                </div>
              </div>
              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-by-date" :eager="true">
                  <v-card flat px-3>
                    <v-card-text>
                      <EventList
                        :events="events"
                        :loading="loading"
                        :isError="isError"
                      ></EventList>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-map" :eager="true">
                  <v-card flat
                    ><EventMap
                      :events="events"
                      :loading="loading"
                      :showAddress="false"
                      :showTitle="true"
                      :isError="isError"
                    ></EventMap>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-full-list" :eager="true">
                  <v-card flat>
                    <v-card-text>
                      <EventCalendar
                        :events="events"
                        :loading="loading"
                        :showTitle="false"
                        :isError="isError"
                      ></EventCalendar
                    ></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
            <!-- <div
              v-if="!loading && !isError && events.length > 0"
              class="text-right mt-2"
              style="font-size: 12px; font-weight: 900; color: #888"
            >
              Workshop list last updated:
              <span style="color: #333">{{
                moment(workshopsLastUpdated).fromNow()
              }}</span>
            </div> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <div>
            <h1 class="page-title mb-5 text-center">
              WORKSHOP REGISTRATION
            </h1>
            <p>
              Take the mystery out of securing state grant funding with an ICJIA
              Technical Assistance Workshop. ICJIA offers workshops throughout
              the state to ease the application process for organizations
              seeking grant funding. Participants will receive an overview of
              the ICJIA grant process and what it means to comply with the Grant
              Accountability and Transparency Act (GATA).
            </p>
            <p>
              <router-link to="/technical-assistance">Click here</router-link>
              for more information. Questions? Contact
              <a href="mailto: CJA.GrantTA@Illinois.gov"
                >CJA.GrantTA@Illinois.gov</a
              >
            </p>
          </div>
          <div
            v-if="isError"
            class="mt-8 text-center"
            style="color: red; font-size: 16px"
          >
            <div>
              Cannot get workshop information. Please reload and try again.
            </div>

            <div>
              If this error persists, please contact
              <a href="mailto: CJA.GrantTA@Illinois.gov"
                >CJA.GrantTA@Illinois.gov</a
              >.
            </div>
            <div style="font-weight: 900" class="mt-5">
              {{ errorMsg }}
            </div>
          </div>

          <!-- <div
            v-if="!loading && !isError && events.length > 0"
            class="text-center mt-2"
            style="font-size: 12px; font-weight: 900; color: #888"
          >
            Workshop list last updated:
            <span style="color: #333">{{
              moment(workshopsLastUpdated).fromNow()
            }}</span>
          </div> -->
          <v-card flat>
            <v-card-text>
              <EventList
                :events="events"
                :loading="loading"
                :isError="isError"
                domElement="h2.tocHeadingList"
              ></EventList>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import axios from "axios";
import moment from "moment";
import EventCalendar from "@/components/EventCalendar";
import EventMap from "@/components/EventMap";
import EventList from "@/components/EventList";
export default {
  components: {
    EventCalendar,
    EventMap,
    EventList
  },
  created() {
    this.getEventBriteEvents();
  },
  metaInfo() {
    return {
      title: this.pageTitle
    };
  },
  mounted() {},
  methods: {
    getColor(name) {
      let type = name.split(":");

      let obj = this.colorMap.filter(c => {
        return c.name === type[0].toLowerCase();
      });
      if (obj.length) {
        return obj[0].color;
      } else {
        return "red";
      }
    },

    async getEventBriteEvents() {
      NProgress.start();
      this.loading = true;
      let events = null;
      //events = await axios.get(`/.netlify/functions/events`);
      //console.log(process.env);

      let calendarFeedEndpoint =
        process.env.NODE_ENV === "development"
          ? `http://localhost:9000/.netlify/functions/events`
          : `https://gatadev.netlify.com/.netlify/functions/events`;

      await axios
        .get(calendarFeedEndpoint, { timeout: 15000 })
        .then(res => {
          events = res;
          this.isError = false;
          this.events = events.data.events.map(event => {
            let obj = {};
            obj.name = event.name.text;
            obj.start = event.start.local;
            obj.end = event.end.local;
            obj.color = "blue darken-4";
            obj.details = event;
            obj.updatedAt = event.changed;
            return obj;
          });

          this.workshopsLastUpdated = new Date(
            Math.max.apply(
              null,
              this.events.map(function(e) {
                return new Date(e.updatedAt);
              })
            )
          );
          // this.events = [];
          // this.workshopsLastUpdated = new Date();
        })
        .catch(err => {
          this.errorMsg = err.message;
          this.isError = true;
        });

      //console.log(this.workshopsLastUpdated);
      this.$ga.page({
        page: this.$route.path,
        title: this.pageTitle,
        location: window.location.href
      });
      NProgress.done();
      this.loading = false;
    }
  },
  data: () => ({
    loading: true,
    events: [],
    tab: null,
    isError: null,
    errorMsg: null,
    clientGeolocation: null,
    workshopsLastUpdated: null,
    moment,
    pageTitle: "Workshop Registration"
  })
};
</script>

<style>
.pullPage {
  margin-top: -25px;
}
</style>
