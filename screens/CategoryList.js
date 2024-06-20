import { View, Text, StyleSheet, SectionList } from "react-native";
import SectionItem from "../component/SectionItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groceryItemsAction } from "../store/GroceryItemSlice";
import { fetchGroceryItems } from "../util/firebase";
import ErrorOverlay from "../component/UI/ErrorOverlay";
import { formatGrocerryList } from "../util/utility";

import LoadingOverlay from "../component/UI/LoadingOverlay";
import { useLayoutEffect } from "react";
import { SHOPS } from "../data/dummy-data";

function CategoryList({ navigation, route }) {
  const shopId = route.params.shopId;
  const shop = SHOPS.find(
    (item) => item.id === shopId
  )
  const dispatch = useDispatch();
  const groceryItems = useSelector(
    (state) => state.groceryItems.groceryItemsList
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    const shopTitle = shop.name;
    navigation.setOptions({
      title: shopTitle,
    });
  }, [navigation]);
  
  useEffect(() => {
    async function getGroceryItems() {
      setIsLoading(true);
      try {
        const items = await fetchGroceryItems(shop.dbName)
        const data = {items: items, dbName: shop.dbName}
        // console.log(JSON.stringify(data));
        dispatch(groceryItemsAction.updateGroceryItemList(data));
        // console.log(JSON.stringify(items));
      } catch (error) {
        setError("Could not fetch GroceryItems!");
      }
      setIsLoading(false);
    }
    getGroceryItems();
  }, []);

  const onItemCountUpdate = (num, itemId) => {
    if (num < 0 || num > 10) {
      return;
    }
    dispatch(groceryItemsAction.updateItemAmount({ id: itemId, amount: num }));
  };
  const onItemLongPress = (itemId) => {
    navigation.navigate("ManageItems", {
      groceryItemId: itemId,
    });
  };
  const onStarPress = (itemId) => {
    dispatch(groceryItemsAction.updateItemFavorate({ id: itemId }));
  };
  let formattedGroceryItems = [];

  const errorHandller = () => {
    setError(null);
  };

  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandller} />;

  formattedGroceryItems = formatGrocerryList(groceryItems);

  if (isLoading) return <LoadingOverlay />;

  if (groceryItems.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>There are no items! Please add Item</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
        <View style={styles.remainingItem}>
        <SectionList
          sections={formattedGroceryItems}
          renderItem={({ item }) => (
            <SectionItem
              {...item}
              onItemUpdate={onItemCountUpdate}
              onStarPressed={onStarPress}
              onLongPress={onItemLongPress}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.category}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default CategoryList;

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
  },
  message: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  favorate: {
    flex: 1,
  },
  remainingItem: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
});
