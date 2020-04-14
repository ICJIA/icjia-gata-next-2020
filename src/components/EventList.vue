<template>
  <div>
    <v-select
      v-if="!isError && events.length && showElement"
      v-model="sort.sort_id"
      :items="sortBy"
      item-value="id"
      item-text="name"
      label="Sort By"
      filled
      :disabled="loading"
      v-on:change="changeSort(`${sort.sort_id}`)"
    />

    <div v-if="loading"><EventLoader></EventLoader></div>

    <div
      v-if="!events.length && !isError && !loading"
      class="my-10 text-center"
      style="font-size: 24px; font-weight: 900; line-height: 1.3em;"
    >
      No workshops currently scheduled. Please check back shortly.
      <br />
      <br />
      <div style="font-size: 16px;">
        For questions, please contact:
        <a href="mailto: CJA.GrantTA@Illinois.gov">CJA.GrantTA@Illinois.gov</a>
      </div>
    </div>

    <v-container style="margin: 0; padding: 0; width: 100%;" v-if="!isError">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          :md="dynamicFlex()"
          order-md="1"
          order="2"
          order-sm="2"
          style="margin-top: -25px;"
        >
          <div v-if="sort.sort_id === 1">
            <div
              v-for="(city, index) in cities"
              :key="index"
              style="margin-top: -20px;"
              class="animated fadeIn"
            >
              <h2
                class="mb-5 tocHeadingList"
                style="
                  font-size: 28px;
                  line-height: 1.2em;
                  background: #2657a9;
                  color: #fff;
                  padding: 10px;
                  margin-top: 50px;
                "
                :id="`city-${slugs(city)}`"
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
                style="
                  font-size: 28px;
                  line-height: 1.2em;
                  text-transform: uppercase;
                  background: #2657a9;
                  color: #fff;
                  padding: 10px;
                  margin-top: 50px;
                "
                id="eventDate"
              >
                {{ moment(eventDate).format("dddd, MMMM DD, YYYY") }}
              </h2>
              <div
                v-for="event in groupedDates[eventDate]"
                :key="event.details.id"
              >
                <EventDetails :event="event"></EventDetails>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="2"
          order-md="2"
          order="1"
          order-sm="1"
          v-if="sort.sort_id === 1 && events.length && showElement"
        >
          <EventToc
            selector="#scrollArea"
            top="#baseContentTop"
            v-if="!loading"
            tocHeading="workshops"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EventDetails from "@/components/EventDetails";
import EventToc from "@/components/EventToc";
import moment from "moment";
import EventLoader from "@/components/EventLoader";
const slugs = require("slugs");
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
export default {
  watch: {
    loading(newValue) {
      if (newValue === false) {
        this.groupAllEvents();
      }
    },
  },

  computed: {
    showToc() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    },
    showElement() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return false;
      } else {
        return true;
      }
    },
  },

  data() {
    return {
      groupedCities: null,
      groupedDates: null,
      dates: [],
      cities: [],
      slugs,
      sections: null,
      isGrouped: false,
      moment,

      sort: {
        sort_id: 1,
      },
      sortBy: [
        {
          id: 1,
          name: "Location",
        },
        {
          id: 2,
          name: "Date",
        },
      ],
    };
  },

  async mounted() {},
  methods: {
    changeSort(a) {
      console.log(a, this.sort.sort_id);
    },

    async groupAllEvents() {
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
      // this.cities.sort();
      this.dates.sort();
      this.isGrouped = true;
    },
    dynamicFlex() {
      if (this.sort.sort_id !== 1) {
        return "12";
      } else if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return "10";
      }
    },
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EventDetails,
    // eslint-disable-next-line vue/no-unused-components
    EventToc,
    EventLoader,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
    isError: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
