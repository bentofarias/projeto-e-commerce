<template>
  <div class="min-h-screen bg-gray-900">
    <div class="p-6 max-w-4xl mx-auto text-yellow-400">

      <router-link
        to="/"
        class="inline-flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors duration-300 font-semibold mb-6"
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

      <h1 class="text-3xl font-bold mb-6">Seu Carrinho</h1>

      <div v-if="cart.length === 0" class="text-yellow-500 text-center py-10">
        Seu carrinho está vazio.
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="item in cart"
          :key="item.id"
          class="flex items-center justify-between bg-gray-800 rounded p-4 shadow"
        >
          <img :src="item.thumbnail" alt="" class="w-20 h-20 object-cover rounded mr-4" />
          <div class="flex-1">
            <h2 class="font-semibold text-lg">{{ item.title }}</h2>
            <p class="text-yellow-300">Preço: ${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="changeQty(item.id, item.quantity - 1)"
              class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 rounded"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              class="w-12 text-black rounded px-1 text-center"
              v-model.number="item.quantity"
              @change="onQtyChange(item.id, item.quantity)"
            />
            <button
              @click="changeQty(item.id, item.quantity + 1)"
              class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 rounded"
            >
              +
            </button>
            <button
              @click="removeFromCart(item.id)"
              class="ml-4 text-red-500 hover:text-red-700 font-semibold"
              title="Remover item"
            >
              ✕
            </button>
          </div>
        </li>
      </ul>

      <div v-if="cart.length > 0" class="mt-8 text-right">
        <p class="text-xl font-bold">
          Total: ${{ totalPrice.toFixed(2) }}
        </p>
        <button
          @click="checkout"
          class="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded shadow"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'

const cart = ref([])

onMounted(() => {
  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
})

watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true }
)

function changeQty(id, qty) {
  if (qty < 1) {
    removeFromCart(id)
    return
  }
  const item = cart.value.find((i) => i.id === id)
  if (item) {
    item.quantity = qty
  }
}

function onQtyChange(id, qty) {
  if (qty < 1) {
    removeFromCart(id)
  }
}

function removeFromCart(id) {
  cart.value = cart.value.filter((i) => i.id !== id)
}

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function checkout() {
  alert('Checkout não implementado ainda.')
}
</script>
