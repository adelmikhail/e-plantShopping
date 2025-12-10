import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of products in the cart
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, quantity } = action.payload;

      // Check if item already exists
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ name, image, cost, quantity });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // Remove if quantity <= 0
          state.items = state.items.filter(i => i.name !== name);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
