<template>
  <div>
    <v-alert
      icon="mdi-alert"
      border="left"
      prominent
      dense
      text
      dismissible
      color="info"
      class="px-6 py-4"
    >
      <div class="pl-3" style="color: #444">
        View up to date information on how Illinois is handling the Coronavirus
        Disease 2019 (COVID-19) from the

        <a
          href="https://coronavirus.illinois.gov"
          style="text-decoration: underline;"
          target="_blank"
          >State of Illinois Coronavirus Response Site</a
        >.
      </div>
      <div class="pl-3 mt-1" style="color: #444">
        View
        <a
          href="https://icjia.illinois.gov/covid19"
          target="_blank"
          style="text-decoration: underline;"
          >ICJIA's COVID-19 Response page</a
        >
        for the latest grant and fiscal notifications, resources, and more.
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    };
  },
  methods: {
    reset() {
      this.alert = true;
    }
  }
};
</script>
