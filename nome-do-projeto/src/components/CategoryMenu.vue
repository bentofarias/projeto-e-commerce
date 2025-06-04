<template>
  <section class="mb-6 p-5 bg-gray-900 rounded-xl shadow-md border border-gray-700 max-w-xl mx-auto">
    <h3 class="font-extrabold text-2xl mb-5 text-yellow-400 text-center">
      Categorias
    </h3>

    <div v-if="!categories || categories.length === 0" class="mt-4 text-center text-gray-400">
      Nenhuma categoria disponível.
    </div>

    <div v-else class="category-list">
      <button
        @click="handleCategorySelect(null)"
        :class="{ 'selected-item': selectedCategory === null }"
      >
        Todas as Categorias
      </button>

      <button
        v-for="cat in categories"
        :key="cat"
        @click="handleCategorySelect(cat)"
        :class="{ 'selected-item': selectedCategory === cat }"
      >
        {{ formatCategory(cat) }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  categories: Array,
  selectedCategory: String
})

const emit = defineEmits(['onCategorySelect'])

const handleCategorySelect = (category) => {
  emit('onCategorySelect', category)
}

const formatCategory = (cat) => {
  if (!cat) return ''
  return cat
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.category-list button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  background-color: transparent;
  border: none;
  color: #d1d5db;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  text-transform: capitalize;
}

.category-list button:hover {
  background-color: #374151;
  color: #f3f4f6;
}

.category-list button.selected-item {
  background-color: #4a5568;
  color: #cbd5e0;
  font-weight: bold;
}
</style>
