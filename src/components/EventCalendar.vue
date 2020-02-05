<template>
  <div style="margin-top: -50px">
    <v-container
      ><v-row
        ><v-col>
          <!-- {{ this.start.date }} - {{ this.end.date }} - {{ this.type }} -->
          <div style="min-height: 30px">
            <div
              class="text-right"
              style="max-height: 20px; font-size: 12px; font-weight: 900; color: #B71C1C"
              v-if="loading"
            >
              Fetching GATA events
            </div>
          </div>
          <v-sheet tile height="54" color="grey lighten-3" class="d-flex ">
            <v-btn class="mt-2" icon @click="$refs.calendar.prev()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span
              style="font-weight: 900; font-size: 24px; margin-top: 14px; "
              class="hover "
              @click="setCalendar('month')"
            >
              {{ title }}
            </span>
            <v-btn class="mt-2" icon @click="$refs.calendar.next()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

            <v-btn
              outlined
              small
              class="mr-4 ml-5 mt-3 "
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>

            <v-spacer></v-spacer>

            <span class="mt-3 mr-4">
              <v-btn small class="mr-3" @click="setCalendar('month')">
                <v-icon
                  v-if="loading"
                  left
                  :disabled="loading"
                  class="custom-loader"
                  color="red darken-4"
                  >cached</v-icon
                >
                <v-icon v-else left>fas fa-calendar-alt</v-icon>
                <span class="">Month</span></v-btn
              >

              <v-btn small class="mr-3" @click="setCalendar('week')">
                <v-icon
                  v-if="loading"
                  left
                  class="custom-loader"
                  color="red darken-4"
                  >cached</v-icon
                >
                <v-icon v-else left>fas fa-calendar-week</v-icon>
                <span class="">Week</span>
              </v-btn>

              <v-btn small @click="setCalendar('day')">
                <v-icon
                  v-if="loading"
                  left
                  class="custom-loader"
                  color="red darken-4"
                  >cached</v-icon
                >
                <v-icon v-else left>fas fa-calendar-day</v-icon>
                <span class="">Day</span>
              </v-btn>
            </span>
            <!-- <div style="width: 35px;" class="mr-10">
              <div v-if="loading" class="text-right">
                <v-progress-circular
                  :size="30"
                  color="blue"
                  class="mr-5 mt-3"
                  indeterminate
                ></v-progress-circular>
              </div>
            </div> -->
          </v-sheet>

          <v-sheet height="700">
            <v-calendar
              ref="calendar"
              v-model="value"
              :type="type"
              :now="today"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-sheet max-width="400px">
                <EventDetails
                  :event="selectedEvent"
                  :showTitle="true"
                  :key="new Date()"
                ></EventDetails>
              </v-sheet> </v-menu></v-sheet></v-col></v-row
    ></v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import moment from "moment";

import EventDetails from "@/components/EventDetails";
import NProgress from "nprogress";
export default {
  data() {
    return {
      type: "month",
      moment,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      types: ["month", "day", "week"],
      start: {},
      end: {},
      today: moment().format("YYYY-MM-DD"),
      value: "",
      colorMap: [
        { name: "gata", color: "blue darken-4" },
        { name: "r3", color: "orange" }
      ]
    };
  },
  watch: {},
  props: {
    events: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EventDetails
  },

  computed: {
    title() {
      if (this.type === "month") {
        return moment(this.start.date).format("MMMM, YYYY");
      } else if (this.type === "day") {
        return moment(this.start.date).format("MMMM DD, YYYY");
      } else {
        return `${moment(this.start.date).format("MMM DD, YYYY")} - ${moment(
          this.end.date
        ).format("MMM DD, YYYY")}`;
      }
    }
  },
  methods: {
    getEvents(e) {
      const { start, end } = e;
      this.start = start;
      this.end = end;
    },
    setToday() {
      this.value = this.today;
    },
    viewDay({ date }) {
      this.value = date;
      this.type = "day";
    },

    setCalendar(type) {
      this.type = type;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    }
  }
};
</script>

<style>
.hover {
  cursor: pointer;
}
.v-present button {
  background: red !important;
  color: #fff !important;
  font-weight: 900;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
