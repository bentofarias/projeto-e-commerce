<template>
  <div
    class="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4 max-w-xs"
  >
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full h-40 object-cover rounded-xl mb-4"
      loading="lazy"
    />

    <h2
      class="text-gray-900 font-semibold text-lg truncate mb-1"
      :title="product.title"
    >
      {{ product.title }}
    </h2>

    <p class="text-green-600 font-bold text-base mb-1">
      ${{ product.price }}
    </p>

    <p class="text-sm text-gray-500 capitalize mb-1">
      Categoria: {{ formatCategory(product.category) }}
    </p>

    <p
      class="text-sm font-medium mb-2"
      :class="product.stock > 0 ? 'text-blue-600' : 'text-red-600'"
    >
      Estoque: {{ product.stock > 0 ? product.stock : 'Esgotado' }}
    </p>

    <router-link
      :to="`/product/${product.id}`"
      class="text-red-600 text-sm font-medium hover:underline mb-3"
    >
      Ver Detalhes
    </router-link>

    <button
      @click="addToCart(product)"
      :disabled="product.stock === 0"
      class="mt-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200"
    >
      Adicionar ao Carrinho
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const addToCart = inject('addToCart')

function formatCategory(category) {
  return category.replace(/-/g, ' ')
}
</script>
