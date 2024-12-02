import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export const fetchProductsBySeller = async (sellerId) => {
  try {
    const response = await axios.get(`/api/products/seller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by seller:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const response = await axios.post(`/api/wishlist/add`, { userId, productId });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};


// Remove product from wishlist
// api.js
export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await axios.delete(`/api/wishlist/remove`, {
      data: { userId, productId },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    throw error;
  }
};

// Fetch user's wishlist
export const getWishlist = async (userId) => {
  try {
    const response = await axios.get(`/api/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

