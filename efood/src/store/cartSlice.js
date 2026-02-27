import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] // { id, nome, foto, preco, porcao, quantidade }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const found = state.items.find((i) => i.id === product.id);

      if (found) {
        found.quantidade += 1;
      } else {
        state.items.push({
          id: product.id,
          nome: product.nome,
          foto: product.foto,
          preco: product.preco,
          porcao: product.porcao,
          quantidade: 1
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    incrementQty(state, action) {
      const id = action.payload;
      const found = state.items.find((i) => i.id === id);
      if (found) found.quantidade += 1;
    },
    decrementQty(state, action) {
      const id = action.payload;
      const found = state.items.find((i) => i.id === id);
      if (!found) return;

      if (found.quantidade > 1) {
        found.quantidade -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + Number(item.preco || 0) * (item.quantidade || 0),
    0
  );