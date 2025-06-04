<template>
  <div class="min-h-screen bg-gray-900 text-yellow-400 p-6">
    <div class="container mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-yellow-400">E-commerce</h1>
      </div>

      <SearchBar @search="applySearch" class="mb-6" />

      <div class="flex flex-col md:flex-row md:space-x-6">
        <aside class="mb-6 md:mb-0 md:w-1/4 bg-gray-900 rounded-lg p-4 shadow-lg">
          <CategoryMenu
            :categories="categories"
            :selectedCategory="selectedCategory"
            @onCategorySelect="applyCategory"
            class="text-yellow-300"
          />
        </aside>

        <main class="flex-1">
          <div class="mb-6">
            <SortOptions @sort="applySort" class="text-yellow-400" />
          </div>

          <ProductList
            :products="paginatedProducts"
            @add-to-cart="addToCart"
            class="mb-6"
          />

          <div class="flex flex-wrap gap-2 justify-center mb-8">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[ 
                'px-3 py-1 rounded font-semibold transition-colors duration-300',
                currentPage === page
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-gray-800 text-yellow-400 hover:bg-yellow-500 hover:text-black'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </main>
      </div>
    </div>

    <router-link
      to="/cart"
      class="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow-lg z-50"
    >
      Ver Carrinho
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import CategoryMenu from '../components/CategoryMenu.vue'
import SortOptions from '../components/SortOptions.vue'
import ProductList from '../components/ProductList.vue'

const addToCart = inject('addToCart')
const cart = inject('cart')

const products = ref([])
const filteredProducts = ref([])
const categories = ref([])

const searchTerm = ref('')
const selectedCategory = ref(null)
const sortOption = ref('')

const currentPage = ref(1)
const productsPerPage = 12

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  return filteredProducts.value.slice(start, start + productsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / productsPerPage)
})

async function fetchProducts() {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=100')
    products.value = res.data.products
    filteredProducts.value = products.value
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get('https://dummyjson.com/products/categories')
    categories.value = res.data.map(cat => cat.slug) // ✔️ pega só o slug
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
  }
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})

function applySearch(term) {
  searchTerm.value = term
  applyFilters()
}

function applyCategory(category) {
  selectedCategory.value = category
  applyFilters()
}

function applySort(option) {
  sortOption.value = option
  applyFilters()
}

function applyFilters() {
  let result = products.value

  if (searchTerm.value) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    result = result.filter(p => 
      p.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  if (sortOption.value) {
    if (sortOption.value === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortOption.value === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortOption.value === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sortOption.value === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title))
  }

  filteredProducts.value = result
  currentPage.value = 1
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #facc15;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background-color: #1f2937;
}
</style>
