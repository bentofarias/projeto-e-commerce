<template>
  <div class="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
    <router-link
      to="/"
      class="self-start mb-6 inline-flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors duration-300 font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Voltar para a loja
    </router-link>

    <div v-if="product" class="w-full max-w-2xl flex flex-col items-center space-y-5">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="rounded-xl shadow-lg object-cover w-full max-w-sm max-h-60"
      />

      <h1 class="text-3xl font-bold text-center">{{ product.title }}</h1>

      <p class="text-gray-300 text-base text-center">{{ product.description }}</p>

      <div class="text-xl font-semibold text-green-400">
        Preço: ${{ product.price.toFixed(2) }}
      </div>

      <div class="text-sm text-gray-400 capitalize">
        Categoria:
        <span class="font-medium text-gray-200">{{ formatCategory(product.category) }}</span>
      </div>

      <div
        class="text-sm"
        :class="product.stock > 0 ? 'text-blue-300' : 'text-red-400 font-semibold'"
      >
        Estoque: {{ product.stock > 0 ? product.stock : 'Esgotado' }}
      </div>

      <button
        :disabled="product.stock === 0"
        class="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-300"
      >
        Adicionar ao Carrinho
      </button>
    </div>

    <div v-else class="text-gray-400 text-center mt-10 text-sm animate-pulse">
      Carregando produto...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()

const formatCategory = (category) => category.replace(/-/g, ' ')

onMounted(async () => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
    product.value = res.data
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
})
</script>
