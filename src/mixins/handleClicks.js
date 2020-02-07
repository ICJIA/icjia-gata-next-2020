// export const handleClicks = {
//   data() {
//     return {};
//   },
//   mounted() {},
//   methods: {
//     handleClicks($event) {
//       // intercepts <a></a> tag clicks and routes within app

//       const { target } = $event;
//       const href = $event.target.href;
//       const mailto = /mailto/g;

//       //console.log(target);
//       // handle only links that occur inside the component and do not reference external resources
//       if (!Element.prototype.matches) {
//         Element.prototype.matches = Element.prototype.msMatchesSelector;
//       }

//       if (
//         target &&
//         target.matches(".dynamic-content a:not([href*='://'])") &&
//         target.href &&
//         !href.match(mailto)
//       ) {
//         // some sanity checks taken from vue-router:
//         // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
//         const {
//           altKey,
//           ctrlKey,
//           metaKey,
//           shiftKey,
//           button,
//           defaultPrevented
//         } = $event;
//         // don't handle with control keys
//         if (metaKey || altKey || ctrlKey || shiftKey) return;
//         // don't handle when preventDefault called
//         if (defaultPrevented) return;
//         // don't handle right clicks
//         if (button !== undefined && button !== 0) return;
//         // don't handle if `target="_blank"`
//         if (target && target.getAttribute) {
//           const linkTarget = target.getAttribute("target");
//           if (/\b_blank\b/i.test(linkTarget)) return;
//         }
//         // don't handle same page links/anchors
//         const url = new URL(target.href);
//         const to = url.pathname;
//         if (window.location.pathname !== to && $event.preventDefault) {
//           $event.preventDefault();

//           this.$router.push(to);
//         }
//       }

//       //console.log(/^.*\.(pdf|doc|docx|xls|zip|xlsx)$/i.test(href));
//       let urlToCheck;
//       if (process.env.NODE_ENV === "development") {
//         urlToCheck = "localhost";
//       } else {
//         urlToCheck = "illinois.gov/gata";
//       }

//       //console.log(href, href.indexOf(urlToCheck));

//       if (
//         /^.*\.(pdf|doc|docx|xls|zip|xlsx)$/i.test(href) &&
//         href.indexOf(urlToCheck) > 1
//       ) {
//         $event.preventDefault();

//         let filename = href.replace(/https:\/\/icjia.illinois.gov\/gata/, "");
//         this.$ga.event({
//           eventCategory: "File",
//           eventAction: "Download",
//           eventLabel: filename
//         });
//         // const win = window.open(href);
//         // win.focus();
//         location.href = href;
//       }
//       // TODO: Add YouTube Event tracking
//     }
//   }
// };

export const handleClicks = {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClicks($event) {
      // intercepts <a></a> tag clicks and routes within app
      //$event.preventDefault();
      const { target } = $event;
      const href = $event.target.href;
      const mailto = /mailto/g;
      const isAFile = /^.*\.(pdf|doc|docx|xls|xlsx|zip|csv|json)$/i.test(href);

      if (isAFile) {
        $event.preventDefault();
        const filename = href.split("/").pop();
        console.log("register download event: ", filename);
        this.$ga.event({
          eventCategory: "File",
          eventAction: "Download",
          eventLabel: filename
        });
        location.href = href;
      } else if (
        target &&
        target.matches(".dynamic-content a:not([href*='://'])") &&
        target.href &&
        !isAFile &&
        !href.match(mailto)
      ) {
        const {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          button,
          defaultPrevented
        } = $event;
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) return;
        // don't handle when preventDefault called
        if (defaultPrevented) return;
        // don't handle right clicks
        if (button !== undefined && button !== 0) return;
        // don't handle if `target="_blank"`
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute("target");
          if (/\b_blank\b/i.test(linkTarget)) return;
        }
        const url = new URL(target.href);
        const to = url.pathname;
        if (window.location.pathname !== to && $event.preventDefault) {
          console.log("register internal click");
          $event.preventDefault();
          this.$router.push(to);
        }
      } else {
        return null;
      }
    }
  }
};
