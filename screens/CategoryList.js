import { View, Text, StyleSheet, SectionList, FlatList } from "react-native";
import SectionItem from "../component/SectionItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groceryItemsAction } from "../store/GroceryItemSlice";
import { fetchGroceryItems } from "../util/firebase";
import ErrorOverlay from "../component/UI/ErrorOverlay";
import { formatGrocerryList } from "../util/utility";

import LoadingOverlay from "../component/UI/LoadingOverlay";

function CategoryList({ navigation }) {
  const dispatch = useDispatch();
  const groceryItems = useSelector(
    (state) => state.groceryItems.groceryItemsList
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // let favorateItemList = [];
  // let remainingItemList = [];

  // groceryItems.map((item) => {
  //   if (item.isFavourate) {
  //     favorateItemList.push(item);
  //   } else {
  //     remainingItemList.push(item);
  //   }
  // });

  useEffect(() => {
    async function getGroceryItems() {
      setIsLoading(true);
      try {
        const items = await fetchGroceryItems();
        dispatch(groceryItemsAction.updateGroceryItemList(items));
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
  return (
    <View style={styles.container}>
      {/* {favorateItemList.length > 0 && (
        <View style={styles.favorate}>
          <Text style={styles.sectionHeader}>Favorate Items</Text>
          <FlatList
            data={favorateItemList}
            renderItem={(item) => (<SectionItem
                  {...item.item}
                  onItemUpdate={onItemCountUpdate}
                  onStarPressed={onStarPress}
                  onLongPress={onItemLongPress}
                />
              )
            }
            keyExtractor={(item) => item.id}
          />
        </View>
      )} */}
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
