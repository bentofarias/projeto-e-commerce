<template>
  <div class="relative w-full mb-4">
    <input
      v-model="query"
      @input="$emit('search', query)"
      placeholder="Buscar produto..."
      class="border p-2 pl-3 pr-10 w-full rounded"
      type="search"
      aria-label="Buscar produto"
    />
    <svg
      class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  }
}
</script>
