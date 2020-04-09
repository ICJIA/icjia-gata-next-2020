<template>
  <div>
    <v-alert dense v-model="alert" text dismissible color="info" class="mb-0">
      <div style="color: #000 !important;" class="my-2">
        <v-icon color="red">error</v-icon>

        View up to date information on how Illinois is handling the Coronavirus
        Disease 2019 (COVID-19) from the

        <a
          href="https://coronavirus.illinois.gov"
          style="text-decoration: underline;"
          >State of Illinois Coronavirus Response Site</a
        >
      </div>
      <!-- <div style="color: #000 !important;">
        <v-icon color="red">error</v-icon>

        View up to date news & information from ICJIA at
        <a
          href="https://coronavirus.illinois.gov"
          style="text-decoration: underline;"
          >ICJIA's Coronavirus Response Site</a
        >
      </div> -->
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
    };
  },
  methods: {
    reset() {
      this.alert = true;
    },
  },
};
</script>
