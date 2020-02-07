<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="6"
      map-type-id="terrain"
      style="width: 100%; height: 350px"
      class="mt-2"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        :key="i"
        v-for="(m, i) in positions"
        :position="m.position"
        :clickable="true"
        @click="displayUpcomingEvents(m, i)"
      ></gmap-marker>
    </GmapMap>
    <div v-if="!displayInfo">
      <div class="text-center">
        <div class="py-3">
          <h2
            style="color: #888; font-size: 14px  !important;"
            class="animated fadeInLeft"
          >
            Click marker for venue information.
          </h2>
        </div>
      </div>
    </div>
    <div id="upcoming-events">
      <div v-if="displayInfo" class="mt-3">
        <div v-for="event in eventsAtThisPosition" :key="event.details.id">
          <EventDetails
            :event="event"
            class="mb-3 animated fadeIn"
          ></EventDetails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import moment from "moment";
import EventDetails from "@/components/EventDetails";
// eslint-disable-next-line no-unused-vars
function click(e) {
  console.log("click", e);
}
export default {
  watch: {
    loading(newValue) {
      if (newValue === false) {
        this.setMarkers();
      }
    }
  },
  components: {
    EventDetails
  },
  data() {
    return {
      center: {
        lat: 41.8781,
        lng: -87.6298
      },
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      positions: [],
      displayInfo: false,
      eventsAtThisPosition: null,
      markersLoading: true
    };
  },
  created() {
    this.geolocateClient();
  },
  mounted() {},
  methods: {
    onClickModel() {
      console.log("click");
    },
    geolocateClient() {
      let vm = this;
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     function(position) {
      //       let pos = {
      //         lat: position.coords.latitude,
      //         lng: position.coords.longitude
      //       };

      //       console.log("Setting client location: ", pos);
      //       vm.center.lat = pos.lat;
      //       vm.center.lng = pos.lng;
      //     },
      //     function() {
      //       console.log("using default map geolocation");
      //     }
      //   );
      // } else {
      //   // Browser doesn't support Geolocation

      //   console.log("using default map geolocation");
      // }
    },
    setMarkers() {
      this.markersLoading = true;
      this.positions = [];
      this.events.forEach(event => {
        let obj = {};
        obj["position"] = {};
        obj["position"]["lat"] = Number(event.details.venue.address.latitude);
        obj["position"]["lng"] = Number(event.details.venue.address.longitude);
        obj["position"]["venue"] = event.details.venue;
        this.positions.push(obj);
      });
      //console.log(this.positions);
      this.markersLoading = false;
      //console.log(this.markersLoading);
    },
    displayUpcomingEvents(m, i) {
      this.displayInfo = true;

      this.eventPosition = m.position.lat + " " + m.position.lng;
      let eventsAtThisPosition = this.events.filter(event => {
        if (
          Number(event.details.venue.address.latitude) === m.position.lat &&
          Number(event.details.venue.address.longitude) === m.position.lng
        ) {
          return event;
        }
      });
      this.eventsAtThisPosition = eventsAtThisPosition;
      // Scroll to events
      //this.$vuetify.goTo("#upcoming-events");

      this.infoWindowPos = m.position;
      let eventText = eventsAtThisPosition.length > 1 ? "events" : "event";
      let markerMessage = `<div ><span style="font-weight: 900; font-size: 14px;">${eventsAtThisPosition.length}</span> upcoming ${eventText} at: &nbsp;&nbsp;</div>`;
      markerMessage =
        markerMessage +
        `<div style="font-weight: 900; margin-top: 10px;">${m.position.venue.name}</div>`;
      markerMessage =
        markerMessage +
        `<div style="margin-top: 5px; margin-bottom: 10px">${m.position.venue.address.localized_address_display}</div>`;

      this.infoContent = markerMessage;

      if (this.currentMidx == i) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = i;
        console.log(this.$refs);
      }
    }
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    },
    isError: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.gm-style .gm-style-iw {
  font-weight: 300;
  font-size: 16px;
  overflow: hidden;
}
</style>
