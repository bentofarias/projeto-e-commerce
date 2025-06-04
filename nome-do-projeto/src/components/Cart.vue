<template>
  <div class="p-4 bg-white rounded shadow">
    <h3 class="font-bold mb-2">Carrinho</h3>
    <div v-for="item in cart" :key="item.id" class="flex justify-between mb-2">
      <span>{{ item.title }} (x{{ item.quantity }})</span>
      <div>
        <button @click="$emit('change-qty', item.id, item.quantity - 1)" class="px-2">-</button>
        <button @click="$emit('change-qty', item.id, item.quantity + 1)" class="px-2">+</button>
        <button @click="$emit('remove', item.id)" class="text-red-500 ml-2">Remover</button>
      </div>
    </div>
  </div>
</template>

<script>
export default { props: ['cart'] }
</script>