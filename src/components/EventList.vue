<template>
  <div>
    <v-select
      v-model="sort.sort_id"
      :items="sortBy"
      item-value="id"
      item-text="name"
      label="Sort By"
      filled
      v-on:change="changeSort(`${sort.sort_id}`)"
    />
    <div v-if="sort.sort_id === 1">
      <div
        v-for="(city, index) in cities"
        :key="index"
        style="margin-top: -20px;"
        class="animated fadeIn"
      >
        <h2
          class="mb-5 tocHeading"
          style="font-size: 28px; line-height: 1.2em;text-transform: uppercase; background: #2657A9; color:  #fff; padding: 10px; margin-top: 50px; "
          id="city"
        >
          {{ city }}
        </h2>
        <div v-for="event in groupedCities[city]" :key="event.details.id">
          <EventDetails :event="event" class="mb-2"></EventDetails>
        </div>
      </div>
    </div>
    <div v-if="sort.sort_id === 2" class="mt-8 animated fadeIn">
      <div
        v-for="(eventDate, index) in dates"
        :key="index"
        style="margin-top: -20px;"
      >
        <h2
          class="mb-5 tocHeading"
          style="font-size: 28px; line-height: 1.2em; text-transform: uppercase; background: #2657A9; color:  #fff; padding: 10px; margin-top: 50px; "
          id="eventDate"
        >
          {{ moment(eventDate).format("dddd, MMMM DD, YYYY") }}
        </h2>
        <div v-for="event in groupedDates[eventDate]" :key="event.details.id">
          <EventDetails :event="event" class="mb-2"></EventDetails>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventDetails from "@/components/EventDetails";
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
export default {
  watch: {
    loading(newValue) {
      if (newValue === false) {
        this.groupAllEvents();
      }
    }
  },

  computed: {
    showToc() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      groupedCities: null,
      groupedDates: null,
      dates: [],
      cities: [],
      isGrouped: false,
      moment,
      toc: null,
      sort: {
        sort_id: 1
      },
      sortBy: [
        {
          id: 1,
          name: "City"
        },
        {
          id: 2,
          name: "Date"
        }
      ]
    };
  },

  methods: {
    changeSort(a) {
      console.log(a, this.sort.sort_id);
    },
    groupAllEvents() {
      this.isGrouped = false;
      this.groupedCities = _.groupBy(this.events, function(event) {
        return event.details.venue.address.city;
      });
      this.groupedDates = _.groupBy(this.events, function(event) {
        return event.start;
      });
      for (const property in this.groupedCities) {
        this.cities.push(property);
      }
      for (const property in this.groupedDates) {
        this.dates.push(property);
      }
      this.cities.sort();
      this.dates.sort();

      this.isGrouped = true;
    },
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return "12";
      }
    }
  },
  components: {
    EventDetails
    // eslint-disable-next-line vue/no-unused-components
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
