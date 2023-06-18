import { configureStore } from "@reduxjs/toolkit";
import { groceryItemsReducer } from "./GroceryItemSlice";

const store = configureStore({
  reducer: {
    groceryItems: groceryItemsReducer,
  },
});

export default store;
