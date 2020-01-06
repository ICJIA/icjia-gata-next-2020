<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    test ie11
    <v-row>
      <v-list v-if="pages" dense>
        <div v-for="item in pages" :key="item.title">
          <v-list-item link>
            <v-list-item-content>
              <h3
                v-if="item.slug === 'home'"
                style="font-weight: 700;"
                @click="$router.push(`/`)"
              >
                Home
              </h3>
              <h3
                v-else
                style="font-weight: 700;"
                @click="
                  $router.push(`/${item.slug}`).catch(err => {
                    $vuetify.goTo(0);
                  })
                "
              >
                <span v-if="item.menuTitle">
                  {{ item.menuTitle }}
                </span>
                <span v-else>
                  {{ item.title }}
                </span>
              </h3>
            </v-list-item-content>
          </v-list-item>
          <div v-if="item.dividerAfter" class="my-2">
            <v-divider />
          </div>
        </div>
      </v-list>
      <v-spacer></v-spacer>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
/* eslint-disable vuetify/no-legacy-grid */
import { EventBus } from "@/event-bus";
import { getAllPages } from "@/services/Content";
export default {
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drawer: false,
      pages: [],
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  async created() {
    const pages = await getAllPages();
    this.pages = pages.filter(p => {
      return p.status === "live";
    });
    this.loading = false;
  },
  mounted() {
    EventBus.$on("toggleDrawer", () => {
      this.drawer = !this.drawer;
    });
  }
};
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
}

.sidebar-height {
  /* min-height: 88vh; */
  min-height: 98vh;
}

h5 a {
  text-decoration: none;
}
</style>
