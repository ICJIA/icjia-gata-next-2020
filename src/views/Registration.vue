<template>
  <div>
    <!-- <v-container>
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
            <p>
              Due to the COVID-19 outbreak, ICJIA has expanded the workshop
              format to include both in-person and online sessions. In-person
              session dates are subject to change.
            </p>
          </div>
          <div
            v-if="isError"
            class="mt-8 text-center"
            style="color: red; font-size: 16px;"
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
            <div style="font-weight: 900;" class="mt-5">
              {{ errorMsg }}
            </div>
          </div>

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
    </v-container> -->

    <v-container>
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
            <p>
              Due to the COVID-19 outbreak, ICJIA has expanded the workshop
              format to include both in-person and online sessions. In-person
              session dates are subject to change.
            </p>
          </div>
          <div class="text-center my-12">
            <v-btn
              target="_blank"
              href="https://www.eventbrite.com/o/illinois-criminal-justice-information-authority-29385145153"
              dark
              color="blue darken-4"
            >
              Register on EventBrite&nbsp;<v-icon right
                >open_in_new</v-icon
              ></v-btn
            >
          </div>
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
    //this.getEventBriteEvents();
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
          : `https://gatadev.netlify.app/.netlify/functions/events`;

      await axios
        .get(calendarFeedEndpoint, { timeout: 15000 })
        .then(res => {
          events = res;
          this.isError = false;
          this.events = events.data.events.map(event => {
            let obj = {};
            obj.name = event.name.text;
            obj.online_event = event.online_event;
            obj.start = event.start.local;
            obj.end = event.end.local;
            obj.color = "blue darken-4";
            obj.details = event;
            obj.updatedAt = event.changed;
            if (event.online_event) {
              obj.rank = 0;
            } else {
              obj.rank = 100;
            }
            if (!event.venue && event.online_event) {
              obj.details.venue = {};
              obj.details.venue.name = "ONLINE ONLY";
              obj.details.venue.address = {};
              obj.details.venue.address.address_1 = "";
              obj.details.venue.address.address_2 = "";
              obj.details.venue.address.city = "ONLINE";
              obj.details.venue.address.region = "";
              obj.details.venue.address.postal_code = "";
              obj.details.venue.address.country = "";
              obj.details.venue.address.latitude = null;
              obj.details.venue.address.longitude = null;
              obj.details.venue.address.latitude = null;
              obj.details.venue.address.localized_address_display =
                "Register to receive workshop link";
              obj.details.venue.address.localized_area_display = "ONLINE ONLY";
              obj.details.venue.address.localized_multi_line_address_display = [
                "ONLINE"
              ];
            }
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
          console.error(err);
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
