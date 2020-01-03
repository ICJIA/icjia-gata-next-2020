<template>
  <div>
    <div v-if="items.length===0">
      <h2 
        class="text-center py-5" 
        style="color: #777"
      >
        {{ empty }}
      </h2>
    </div>
    <div 
      v-for="(item, index) in items"
      v-else 
      :key="index"
    >
      <slot v-bind="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseList',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    empty: {
      type: String,
      default: 'There are no current funding opportunities'
    }
  }
}
</script>

<style scoped>
</style>
