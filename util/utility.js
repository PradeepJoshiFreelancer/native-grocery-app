import { CATEGORY_LIST, UNIT_ARRAY } from "../data/dummy-data";
import { updateItem } from "./firebase";

export const formatGrocerryList = (unformattedList) => {
  let groceryItems = [];
  let favouriteList = [];

  for (let i = 0; i < unformattedList.length; i++) {
    // console.log(unformattedList[i]);
    if (unformattedList[i].isFavourate) {
      if (favouriteList.length === 0) {
        const favouriteItem = {
          category: "Favourites",
          data: [
            {
              amount: unformattedList[i].amount,
              defaultQuantity: unformattedList[i].defaultQuantity,
              defaultUnitQuantity: unformattedList[i].defaultUnitQuantity,
              itemName: unformattedList[i].itemName,
              isChecked: unformattedList[i].isChecked,
              isFavourate: unformattedList[i].isFavourate,
              id: unformattedList[i].id,
            },
          ],
        };
        favouriteList.push(favouriteItem);
      } else {
        const data = {
          amount: unformattedList[i].amount,
          defaultQuantity: unformattedList[i].defaultQuantity,
          defaultUnitQuantity: unformattedList[i].defaultUnitQuantity,
          itemName: unformattedList[i].itemName,
          isChecked: unformattedList[i].isChecked,
          isFavourate: unformattedList[i].isFavourate,
          id: unformattedList[i].id,
        };
        favouriteList[0].data.push(data);
      }
    } else {
      const existingItemIndex = groceryItems.findIndex(
        (item) => item.category === unformattedList[i].category
      );
      if (existingItemIndex === -1) {
        const groceryItem = {
          category: unformattedList[i].category,
          data: [
            {
              amount: unformattedList[i].amount,
              defaultQuantity: unformattedList[i].defaultQuantity,
              defaultUnitQuantity: unformattedList[i].defaultUnitQuantity,
              itemName: unformattedList[i].itemName,
              isChecked: unformattedList[i].isChecked,
              isFavourate: unformattedList[i].isFavourate,
              id: unformattedList[i].id,
            },
          ],
        };
        groceryItems.push(groceryItem);
      } else {
        const data = {
          amount: unformattedList[i].amount,
          defaultQuantity: unformattedList[i].defaultQuantity,
          defaultUnitQuantity: unformattedList[i].defaultUnitQuantity,
          itemName: unformattedList[i].itemName,
          isChecked: unformattedList[i].isChecked,
          isFavourate: unformattedList[i].isFavourate,
          id: unformattedList[i].id,
        };
        const updatedGroceryItem = {
          category: groceryItems[existingItemIndex].category,
          data: [...groceryItems[existingItemIndex].data, data],
        };
        groceryItems[existingItemIndex] = updatedGroceryItem;
      }
    }
  }
  //   console.log(JSON.stringify(groceryItems));
  return [...favouriteList, ...groceryItems];
};

export const findUnitQuantity = (unitQuanity) => {
  return UNIT_ARRAY.find((item) => item.label === unitQuanity);
};
export const findCategory = (category) => {
  return CATEGORY_LIST.find((item) => item.name === category);
};

export const saveUnsavedList = async (unsavedList, dbName) => {
  for (let i = 0; i < unsavedList.length; i++) {
    const userItem = {
      category: unsavedList[i].category,
      itemName: unsavedList[i].itemName,
      defaultQuantity: unsavedList[i].defaultQuantity,
      defaultUnitQuantity: unsavedList[i].defaultUnitQuantity,
      isChecked: false,
      isFavourate: unsavedList[i].isFavourate,
      amount: unsavedList[i].amount,
    };
    try {
      await updateItem(unsavedList[i].id, userItem, dbName);
    } catch {
      // console.log({ error: "Error occured while saving unsaved List!" });
      return { error: "Error occured while saving unsaved List!" };
    }
  }
  // console.log("No Errors");
  return null;
};
