<template>
  <div>
    <v-card class="my-4 py-5 grey lighten-4 elevation-6">
      <!-- <v-btn
        absolute
        dark
        fab
        top
        right
        color="teal darken-3"
        v-if="isItNew(event)"
      >
        <span font-size="9px !important;">ONLINE</span>
      </v-btn> -->

      <h2
        v-if="showTitle"
        style="font-weight: 900;"
        class="pl-3"
        :id="slugs(event.name)"
      >
        {{ event.name }}
      </h2>
      <v-card-text style="font-weight: 700;">
        <div style="font-size: 18px;">
          {{ moment(event.start).format("dddd, MMMM DD, YYYY") }}
        </div>
        <div class="mt-1">
          {{ moment(event.start).format("h:mm a") }} -
          {{ moment(event.end).format("h:mm a") }}&nbsp;CST
        </div>
      </v-card-text>
      <v-card-text style="margin-top: -15px;">
        <div v-html="event.details.description.html"></div>
      </v-card-text>
      <v-card-text style="margin-top: -30px;">
        <div class="text-subtitle-1 black--text">
          <v-card-text class="mb-5">
            <strong>
              <span :class="{ online: event.online_event }">{{
                event.details.venue.name
              }}</span></strong
            >

            <div>
              <span :class="{ online: event.online_event }">
                {{ event.details.venue.address.localized_address_display }}
              </span>
            </div>
          </v-card-text>
        </div>
      </v-card-text>

      <v-divider class="mx-4" style="margin-top: -25px;"></v-divider>

      <!-- <v-card-title>Availability</v-card-title> -->

      <v-card-actions class="mt-3">
        <v-chip
          class="seats-available hidden-sm-and-down"
          style="font-size: 14px;"
        >
          {{ seatsRemaing }}
          {{ seatWord }} remaining</v-chip
        >
        <v-chip
          class="seats-available hidden-md-and-up"
          style="font-size: 12px;"
        >
          {{ seatsRemaing }}
          {{ seatWord }} left</v-chip
        >

        <v-spacer></v-spacer>
        <v-btn
          small
          v-if="seatsRemaing > 0"
          color="blue darken-4"
          :href="event.details.url"
          target="_blank"
          class="mr-5"
          dark
        >
          Register<span class="hidden-sm-and-down"> Now&nbsp;</span
          ><v-icon small right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          v-else
          small
          dark
          color="red lighten-2"
          :href="event.details.url"
          target="_blank"
          class="mr-5"
        >
          <!-- JOIN THE WAITLIST -->
          SOLD OUT
          <v-icon small right>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
      <!-- <v-card-text style="padding: 0 !important;" class="mt-2">
        <div class="text-right px-4" style="font-size: 10px;">
          Registration link not working?<br />Email:
          <a href="mailto: CJA.GrantTA@Illinois.gov"
            >CJA.GrantTA@Illinois.gov</a
          >
        </div>
      </v-card-text> -->
    </v-card>
  </div>
</template>

<script>
const slugs = require("slugs");
import moment from "moment";
export default {
  methods: {
    register() {},
    isItNew(event) {
      let now = moment(new Date()); //todays date
      let end = moment(event.details.created); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      //console.log(days);
      if (days <= 3) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    seatsRemaing() {
      let seats =
        this.event.details.ticket_classes[0]["quantity_total"] -
        this.event.details.ticket_classes[0]["quantity_sold"];
      if (seats <= 0) {
        return 0;
      } else {
        return seats;
      }
    },
    seatWord() {
      return this.seatsRemaing === 1 ? "seat" : "seats";
    }
  },
  data() {
    return {
      moment,
      slugs
    };
  },
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    showAddress: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.v-chip__content {
  font-weight: 900;
}

.online {
  color: #304ffe;
}
</style>
