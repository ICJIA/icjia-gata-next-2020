<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="10">
          <v-sheet
            :color="`grey lighten-4`"
            v-for="i in 5"
            :key="`loading-${i}`"
          >
            <v-boilerplate
              type="image, article"
              class="mb-6"
              :boilerplate="false"
            ></v-boilerplate>
          </v-sheet>
        </v-col>
        <v-col cols="2" class="hide-sm-and-down">
          <v-sheet :color="`grey lighten-4`">
            <v-boilerplate
              type="article"
              class="mb-6"
              :boilerplate="false"
            ></v-boilerplate>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VSkeletonLoader } from "vuetify/lib";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VSkeletonLoader,
    // Create a new component that
    // extends v-skeleton-loader
    // eslint-disable-next-line vue/no-unused-components
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "VSkeletonLoader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
