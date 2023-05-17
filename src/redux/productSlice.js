import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [
      { id: 1, name: 'Product 1', price: 10, description: 'This is product 1.' },
      { id: 2, name: 'Product 2', price: 20, description: 'This is product 2.' },
      { id: 3, name: 'Product 3', price: 30, description: 'This is product 3.' },
    ],
    filter: '',
    sortBy: '',
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const productIndex = state.products.findIndex((product) => product.id === action.payload.id);
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    filterProducts: (state, action) => {
      state.filter = action.payload;
    },
    sortProducts: (state, action) => {
      state.sortBy = action.payload;
      if (action.payload === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === 'price') {
        state.products.sort((a, b) => a.price - b.price);
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, filterProducts, sortProducts } = productSlice.actions;

export const selectFilteredProducts = (state) => {
  const { products, filter } = state.products;
  if (filter) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  return products;
};

export default productSlice.reducer;
