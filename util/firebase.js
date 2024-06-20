import axios from "axios";
// Prod
const BASE_URL =
  "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app";

  //Test
  // const BASE_URL =
  // "https://grocery-app-test-b926e-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeGroceryItem(groceryItem, dbName) {
  const response = await axios.post(BASE_URL + "/" + dbName +".json", groceryItem);
  const id = response.data.name;
  return id;
}

export async function fetchGroceryItems(dbName) {
  const response = await axios.get(BASE_URL + "/" + dbName + ".json");

  const groceryItems = [];

  for (const key in response.data) {
    const groceryItem = {
      category: response.data[key].category,
      amount: response.data[key].amount,
      defaultQuantity: response.data[key].defaultQuantity,
      defaultUnitQuantity: response.data[key].defaultUnitQuantity,
      itemName: response.data[key].itemName,
      isChecked: response.data[key].isChecked,
      isFavourate: response.data[key].isFavourate,      
      id: key,
    };
    groceryItems.push(groceryItem);
  }
  // console.log(JSON.stringify(groceryItems));
  return groceryItems;
}

export function updateItem(id, groceryItem, dbName) {
  // console.log(JSON.stringify(groceryItem));
  return axios.put(BASE_URL + `/${dbName}/${id}.json`, groceryItem);
}

export function deleteGroceryItem(id, dbName) {
  return axios.delete(BASE_URL + `/${dbName}/${id}.json`);
}
