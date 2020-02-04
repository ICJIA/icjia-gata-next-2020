<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div style="margin-top: 100px">
            <h1 class="page-title mb-10">
              GATA WORKSHOP REGISTRATION
            </h1>

            <v-card class="hidden-sm-and-down mb-12">
              <v-tabs
                v-model="tab"
                grow
                centered
                icons-and-text
                background-color="grey lighten-2"
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-by-date">
                  Events by Date
                  <v-icon>calendar_today</v-icon>
                </v-tab>

                <v-tab :disabled="loading" href="#tab-map">
                  Events by Location
                  <v-icon>add_location</v-icon>
                </v-tab>

                <v-tab :disabled="loading" href="#tab-full-list">
                  All Events
                  <v-icon class="material-icons">format_align_justify</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item value="tab-by-date" :eager="true">
                  <v-card flat>
                    <EventCalendar
                      :events="events"
                      :loading="loading"
                      :showTitle="false"
                    ></EventCalendar>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-map" :eager="true">
                  <v-card flat
                    ><EventMap
                      :events="events"
                      :loading="loading"
                      :showAddress="false"
                      :showTitle="true"
                    ></EventMap>
                  </v-card>
                </v-tab-item>

                <v-tab-item value="tab-full-list" :eager="true">
                  <v-card flat>
                    <v-card-text
                      ><EventList
                        :events="events"
                        :loading="loading"
                      ></EventList
                    ></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
            <div class="hidden-md-and-up">
              <v-card flat>
                <v-card-text
                  ><EventList :events="events" :loading="loading"></EventList
                ></v-card-text>
              </v-card>
              <div v-if="loading" class="text-center">
                <v-progress-circular
                  :size="60"
                  :width="7"
                  color="purple"
                  class="mt-10"
                  indeterminate
                ></v-progress-circular>
              </div>
              <EventList v-else :events="events"></EventList>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import axios from "axios";
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
  watch: {
    tab(newValue, oldValue) {
      if (newValue === "tab-by-date") {
        this.hideInstructions = true;
      } else {
        this.hideInstructions = false;
      }
    }
  },

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
      this.loading = true;
      let events = null;
      events = await axios.get(`/gata/.netlify/functions/events`);

      // events = await axios.get(
      //   `https://gata-calendar.netlify.com/.netlify/functions/events`
      // );

      this.events = events.data.events.map(event => {
        let obj = {};
        obj.name = event.name.text;
        obj.start = event.start.local;
        obj.end = event.end.local;
        obj.color = "blue darken-4";
        obj.details = event;
        return obj;
      });

      this.loading = false;
    }
  },
  data: () => ({
    loading: true,
    events: [],
    tab: null,
    isError: true,
    errorMsg: null,
    clientGeolocation: null,
    hideInstructions: false
  })
};
</script>
