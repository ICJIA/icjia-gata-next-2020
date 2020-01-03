<template>
  <v-form 
    class="pl-2" 
    style="margin-top: -25px;"
  >
    <v-text-field
      v-model="query"
      label="Search"
      placeholder="Enter search term"
      @keyup="instantSearch"
    />
    <div 
      v-for="(result, index) in queryResults" 
      :key="index" 
      class="px-4 py-3"
    >
      <div v-if="query.length">
        <nuxt-link 
          :to="result.path" 
          style="text-decoration: none"
        >
          <h2>{{ result.title }}</h2>
        </nuxt-link>
        <p>{{ result.excerpt }}</p>
      </div>
    </div>
  </v-form>
</template>

<script>
import Fuse from 'fuse.js'

export default {
  props: {
    content: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      query: '',
      queryResults: []
    }
  },
  computed: {},
  watch: {
    query(newValue, oldValue) {}
  },

  mounted() {
    this.fuse = new Fuse(this.content, {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'searchMeta',
        'title',
        'excerpt',
        'section',
        'posted',
        'expires',
        'slug'
      ]
    })
  },
  methods: {
    instantSearch() {
      this.queryResults = this.fuse.search(this.query)
    }
  }
}
</script>

<style scoped>
</style>
