import { createSlice } from "@reduxjs/toolkit";
import { loader } from "../menu/Menu";
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new item
      state.cartItems.push(action.payload);
      //   state.cartItems = [...state.cartItems, action.payload];
      console.log(state.cartItems);
    },
    deleteItem(state, action) {
      // payload = item Id
      state.cartItems = state.cartItems.filter(
        (item) => item.pizzaId !== action.payload,
      );
      // state.cartItems.filter((item) => console.log(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
    },
    increasePizzaQuantity(state, action) {
      // payload = pizzaId
      const item = state.cartItems.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreasePizzaQuantity(state, action) {
      // payload = pizzaId
      const item = state.cartItems.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      item.quantity--;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      item.totalPrice = item.quantity * item.unitPrice;
    },
  },
});

export const {
  addItem,
  clearCart,
  deleteItem,
  increasePizzaQuantity,
  decreasePizzaQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
