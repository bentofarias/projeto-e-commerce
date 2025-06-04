import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Busca uma lista de produtos com paginação.
 * @param {number} limit Quantidade de produtos por página (padrão: 10)
 * @param {number} skip Quantidade de produtos a pular para paginação (padrão: 0)
 * @returns {Promise<Object>} Retorna um objeto com produtos e meta dados
 */
export const getProducts = async (limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

/**
 * Busca detalhes de um produto pelo ID.
 * @param {number} id ID do produto
 * @returns {Promise<Object>} Retorna os dados do produto
 */
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Busca todas as categorias disponíveis.
 * @returns {Promise<string[]>} Retorna um array de nomes das categorias
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

/**
 * Busca produtos filtrados por categoria, com paginação.
 * @param {string} category Nome da categoria
 * @param {number} limit Quantidade de produtos por página (padrão: 10)
 * @param {number} skip Quantidade de produtos a pular para paginação (padrão: 0)
 * @returns {Promise<Object>} Retorna um objeto com produtos da categoria e meta dados
 */
export const getProductsByCategory = async (category, limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`, {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria "${category}":`, error);
    throw error;
  }
};

/**
 * Busca produtos que correspondam a uma consulta de texto, com paginação.
 * @param {string} query Termo da busca
 * @param {number} limit Quantidade de produtos por página (padrão: 10)
 * @param {number} skip Quantidade de produtos a pular para paginação (padrão: 0)
 * @returns {Promise<Object>} Retorna um objeto com produtos que correspondem à busca
 */
export const searchProducts = async (query, limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/search`, {
      params: { q: query, limit, skip }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produtos com a query "${query}":`, error);
    throw error;
  }
};