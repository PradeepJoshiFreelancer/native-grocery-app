import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  groceryItemsList: [],
  unsavedItemList: [],
};
const goceryItemSlice = createSlice({
  name: "groceryItems",
  initialState: initialValues,
  reducers: {
    updateGroceryItemList(state, action) {
      const updatedGroceryItemsList = action.payload;
      state.groceryItemsList = updatedGroceryItemsList;
      // console.log(JSON.stringify(state));
    },
    addItemList(state, action) {
      const updatedItemList = [...state.groceryItemsList, action.payload];
      state.groceryItemsList = updatedItemList;
      // state.groceryItemsList.push(action.payload);
      // console.log(JSON.stringify(state.groceryItemsList));
    },
    updateItem(state, action) {
      const updateItemIndex = state.groceryItemsList.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedGroceryItem = {
        amount: action.payload.amount,
        category: action.payload.category,
        defaultQuantity: action.payload.defaultQuantity,
        defaultUnitQuantity: action.payload.defaultUnitQuantity,
        itemName: action.payload.itemName,
        isChecked: action.payload.isChecked,
        isFavourate: action.payload.isFavourate,
        id: action.payload.id,
      };
      const updatedGroceryItems = [...state.groceryItemsList];
      updatedGroceryItems[updateItemIndex] = updatedGroceryItem;
      state.groceryItemsList = updatedGroceryItems;
      // state.groceryItemsList = updatedGroceryItems;
      // console.log(JSON.stringify(updatedGroceryItems));
      // console.log("Inside Update Slice");
      // console.log(JSON.stringify(state.groceryItemsList));
    },
    updateItemAmount(state, action) {
      const updateItemIndex = state.groceryItemsList.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedGroceryItems = [...state.groceryItemsList];
      updatedGroceryItems[updateItemIndex].amount = action.payload.amount;
      state.groceryItemsList = updatedGroceryItems;

      const updateUnsavedItemIndex = state.unsavedItemList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updateUnsavedItemIndex === -1) {
        const updatedUnsavedList = [
          ...state.unsavedItemList,
          updatedGroceryItems[updateItemIndex],
        ];
        state.unsavedItemList = updatedUnsavedList;
        // state.unsavedItemList.push(action.payload);
      } else {
        const updatedUnsavedItems = [...state.unsavedItemList];
        updatedUnsavedItems[updateUnsavedItemIndex].amount =
          action.payload.amount;
        state.unsavedItemList = updatedUnsavedItems;
      }
      // console.log(JSON.stringify(state.unsavedItemList))

      // state.groceryItemsList[updateItemIndex].amount = action.payload.amount;
    },
    updateItemFavorate(state, action) {
      const updateItemIndex = state.groceryItemsList.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedGroceryItems = [...state.groceryItemsList];
      updatedGroceryItems[updateItemIndex].isFavourate =
        !updatedGroceryItems[updateItemIndex].isFavourate;
      state.groceryItemsList = updatedGroceryItems;

      const updateUnsavedItemIndex = state.unsavedItemList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updateUnsavedItemIndex === -1) {
        const updatedUnsavedList = [
          ...state.unsavedItemList,
          updatedGroceryItems[updateItemIndex],
        ];
        state.unsavedItemList = updatedUnsavedList;
      } else {
        const updatedUnsavedItems = [...state.unsavedItemList];
        updatedUnsavedItems[updateUnsavedItemIndex].isFavourate =
          updatedGroceryItems[updateItemIndex].isFavourate;
        state.unsavedItemList = updatedUnsavedItems;
      }
      // console.log(JSON.stringify(state.unsavedItemList));

      // state.groceryItemsList[updateItemIndex].amount = action.payload.amount;
    },
    updateItemChecked(state, action) {
      const updateItemIndex = state.groceryItemsList.findIndex(
        (item) => item.id === action.payload
      );
      const updatedGroceryItemsList = [...state.groceryItemsList];

      updatedGroceryItemsList[updateItemIndex].isChecked =
        !updatedGroceryItemsList[updateItemIndex].isChecked;
      state.groceryItemsList = updatedGroceryItemsList;
    },
    removeItem(state, action) {
      const updatedGroceryItems = state.groceryItemsList.filter(
        (item) => item.id != action.payload
      );
      state.groceryItemsList = updatedGroceryItems;

      // console.log("Inside Delete Slice");
      // console.log(action.payload);
      // console.log(JSON.stringify(state.groceryItemsList));
    },
    updateUnsavedItemList(state, action) {
      const updateUnsavedItemIndex = state.unsavedItemList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (updateUnsavedItemIndex === -1) {
        const updatedUnsavedList = [...state.unsavedItemList, action.payload];
        state.unsavedItemList = updatedUnsavedList;
        // state.unsavedItemList.push(action.payload);
      } else {
        const updatedUnsavedItems = [...state.unsavedItemList];
        updatedUnsavedItems[updateUnsavedItemIndex].amount =
          action.payload.amount;
        state.unsavedItemList = updatedUnsavedItems;
      }
      // console.log("Unsaved Election List");
      // console.log(
      //   "Unsaved Election List Length = " + state.unsavedItemList.length
      // );
      // console.log(JSON.stringify(state.unsavedItemList));
    },
    resetUnsavedItemList(state) {
      // console.log("Inside resetUnsavedItemList");
      state.unsavedItemList = [];
    },
  },
});

export const groceryItemsAction = goceryItemSlice.actions;

export const groceryItemsReducer = goceryItemSlice.reducer;
