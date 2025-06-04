<template>
  <router-view />
</template>

<script setup>
import { ref, watch, provide, onMounted } from 'vue'

const cart = ref([])

onMounted(() => {
  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
})

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

function addToCart(product) {
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

provide('cart', cart)
provide('addToCart', addToCart)
</script>
