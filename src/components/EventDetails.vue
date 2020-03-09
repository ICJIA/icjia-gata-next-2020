<template>
  <div>
    <v-card class="py-5 grey lighten-4 elevation-6">
      <h2
        v-if="showTitle"
        style="font-weight: 900"
        class="pl-3"
        id="event.name"
      >
        {{ event.name }}
      </h2>
      <v-card-text style=" font-weight: 700;">
        <div style="font-size: 18px">
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
        <div class="subtitle-1 black--text">
          <v-card-text class="mb-5">
            <strong>{{ event.details.venue.name }}</strong>

            <div>
              {{ event.details.venue.address.localized_address_display }}
            </div>
          </v-card-text>
        </div>
      </v-card-text>

      <v-divider class="mx-4" style="margin-top: -25px;"></v-divider>

      <!-- <v-card-title>Availability</v-card-title> -->

      <v-card-actions class="mt-3">
        <v-chip
          class="seats-available hidden-sm-and-down"
          style="font-size: 14px"
        >
          {{ seatsRemaing }}
          seats remaining</v-chip
        >
        <v-chip
          class="seats-available hidden-md-and-up"
          style="font-size: 12px"
        >
          {{ seatsRemaing }}
          seats left</v-chip
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
          SOLD OUT
          <v-icon small right>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  methods: {
    register() {}
  },
  computed: {
    seatsRemaing() {
      return (
        this.event.details.ticket_classes[0]["quantity_total"] -
        this.event.details.ticket_classes[0]["quantity_sold"]
      );
    }
  },
  data() {
    return {
      moment
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
</style>
