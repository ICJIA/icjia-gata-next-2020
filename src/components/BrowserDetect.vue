<template>
  <div
    v-if="browserObj.isIE"
    class="text-center pt-5 pb-5"
    style="background-color: red; margin-top: 65px;"
  >
    <h1 style="color: white">
      Your browser is out of date.
      <br />In order to view the ICJIA GATA Information Portal, please update to
      the latest
      <br />
      <a href="https://www.google.com/chrome/">Chrome</a>,&nbsp;
      <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>,&nbsp;or
      <a href="https://www.microsoft.com/en-us/windows/microsoft-edge"
        >&nbsp;Microsoft Edge</a
      >.
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      browserObj: {}
    };
  },
  created() {
    if (window.navigator.userAgent) {
      this.internetExplorerDetect();
    }
  },
  methods: {
    internetExplorerDetect() {
      if (window.navigator.userAgent) {
        let ua = window.navigator.userAgent;
        let browserObj = {};
        browserObj.isIE = /*@cc_on!@*/ false || !!document.documentMode;
        browserObj.isChrome =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor);
        browserObj.ua = ua;
        this.browserObj = browserObj;
        console.log(browserObj);
      }
    }
  }
};
</script>

<style scoped></style>
