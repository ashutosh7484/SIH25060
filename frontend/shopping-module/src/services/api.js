const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

// Products API
export const productsAPI = {
  getAll: () => apiCall("/products"),
  getById: (id) => apiCall(`/products/${id}`),
}

// Cart API
export const cartAPI = {
  get: (userId) => apiCall(`/cart/${userId}`),
  addItem: (userId, productId, quantity = 1) =>
    apiCall(`/cart/${userId}`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  updateItem: (userId, productId, quantity) =>
    apiCall(`/cart/${userId}/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (userId, productId) =>
    apiCall(`/cart/${userId}/${productId}`, {
      method: "DELETE",
    }),
}

// Checkout API
export const checkoutAPI = {
  process: (userId, customerInfo = {}) =>
    apiCall(`/checkout/${userId}`, {
      method: "POST",
      body: JSON.stringify({ customerInfo }),
    }),
}

// Orders API
export const ordersAPI = {
  getUserOrders: (userId) => apiCall(`/orders/${userId}`),
}

// Health check
export const healthAPI = {
  check: () => apiCall("/health"),
}
