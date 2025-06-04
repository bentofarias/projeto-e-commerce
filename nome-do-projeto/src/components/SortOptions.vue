<template>
  <select
    @change="$emit('sort', $event.target.value)"
    class="border p-2 rounded mb-4"
  >
    <option value="">Ordenar por</option>
    <option value="price-asc">Preço ↓</option>
    <option value="price-desc">Preço ↑</option>
    <option value="name-asc">Nome A-Z</option>
    <option value="name-desc">Nome Z-A</option>
  </select>
</template>

<script setup>
</script>