<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  props: ['products'],
  components: { ProductCard }
}
</script>
