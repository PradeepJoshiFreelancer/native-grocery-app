import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../component/CartItem";
import { useLayoutEffect, useState, useCallback } from "react";
import Button from "../component/UI/Button";
import { saveUnsavedList } from "../util/utility";
import ErrorOverlay from "../component/UI/ErrorOverlay";
import LoadingOverlay from "../component/UI/LoadingOverlay";
import { groceryItemsAction } from "../store/GroceryItemSlice";

function CartList({ navigation }) {
  const userSelectedList = useSelector(
    (state) => state.groceryItems.groceryItemsList
  );
  const unsavedItemList = useSelector(
    (state) => state.groceryItems.unsavedItemList
  );
  const dbName = useSelector((state) => state.groceryItems.dbName);
  const dispatch = useDispatch();

  let formattedCartList = userSelectedList.filter((item) => item.amount > 0);

  const itemCount = formattedCartList.length;
  const unsavedItemCount = unsavedItemList.length;

  const showDeleteButton = formattedCartList.find(
    (item) => item.isChecked === true
  );
  const showSaveButton = unsavedItemCount > 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View>
          <Text
            style={{
              color: tintColor,
              marginHorizontal: 15,
              marginVertical: 4,
            }}
          >
            Selected Item Count: {itemCount}
          </Text>
          <Text style={{ color: tintColor, marginHorizontal: 15 }}>
            Unsaved Item Count: {unsavedItemCount}
          </Text>
        </View>
      ),
    });
  }, [navigation, itemCount, unsavedItemCount]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onSaveItem = async () => {
    setIsLoading(true);
    const error = await saveUnsavedList(unsavedItemList, dbName);
    setError(error);
    setIsLoading(false);
    dispatch(groceryItemsAction.resetUnsavedItemList());
  };

  const onCheckBoxClick = useCallback((id) => {
    dispatch(groceryItemsAction.updateItemChecked(id));
  }, []);

  const onDeleteItems = () => {
    formattedCartList.map((item) => {
      if (item.isChecked) {
        dispatch(
          groceryItemsAction.updateItemAmount({ id: item.id, amount: 0 })
        );
      }
    });
  };

  const errorHandller = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandller} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (itemCount === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>There are no items in the cart!</Text>
        {showSaveButton && (
          <Button style={styles.button} onPress={onSaveItem}>
            Save Unsaved Items
          </Button>
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={formattedCartList}
        renderItem={(item) => (
          <CartItem {...item.item} onChecked={onCheckBoxClick} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        {showDeleteButton && (
          <Button onPress={onDeleteItems} style={styles.button}>
            Delete
          </Button>
        )}
        {showSaveButton && (
          <Button style={styles.button} onPress={onSaveItem}>
            Save Items
          </Button>
        )}
      </View>
    </View>
  );
}

export default CartList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
  },
  cartContainer: {
    flex: 1,
  },
  message: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 8,
    minWidth: 120,
    marginHorizontal: 8,
  },
});
