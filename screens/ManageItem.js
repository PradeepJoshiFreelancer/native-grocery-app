import { StyleSheet, View } from "react-native";
import ItemForm from "../component/ManageItem/ItemForm";
import { GlobalStyles } from "../data/GlobalStyles";
import { useLayoutEffect } from "react";
import {
  deleteGroceryItem,
  storeGroceryItem,
  updateItem,
} from "../util/firebase";
import { useDispatch, useSelector } from "react-redux";
import { groceryItemsAction } from "../store/GroceryItemSlice";
import IconButton from "../component/IconButton";
import { useState } from "react";
import ErrorOverlay from "../component/UI/ErrorOverlay";
import LoadingOverlay from "../component/UI/LoadingOverlay";

function ManageItem({ navigation, route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const groceryItems = useSelector(
    (state) => state.groceryItems.groceryItemsList
  );
  const dbName = useSelector((state) => state.groceryItems.dbName);

  const cancelButtonHandller = () => {
    navigation.goBack();
  };
  const editedGroceryItemId = route.params.groceryItemId;
  let isEditing = !!editedGroceryItemId;
  const selectedGroceryItem = groceryItems.find((item) => {
    return item.id === editedGroceryItemId;
  });
  if (selectedGroceryItem) isEditing = true;
  // console.log(JSON.stringify(selectedGroceryItem));
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit GroceryItem" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const onConfirmHandller = async (groceryItem) => {
    try {
      if (isEditing) {
        await updateItem(editedGroceryItemId, groceryItem, dbName);
        dispatch(
          groceryItemsAction.updateItem({
            id: editedGroceryItemId,
            isChecked: false,
            ...groceryItem,
          })
        );
      } else {
        const id = await storeGroceryItem(groceryItem, dbName);
        dispatch(
          groceryItemsAction.addItemList({
            ...groceryItem,
            isChecked: false,
            id: id,
          })
        );
      }
      navigation.goBack();
    } catch {
      setError("Error has occured while saving!");
    }
  };
  const deleteButtonHandller = async () => {
    setIsLoading(true);
    try {
      await deleteGroceryItem(editedGroceryItemId, dbName);
      dispatch(groceryItemsAction.removeItem(editedGroceryItemId));
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setError("Count not delete expense! Please try later.");
      setIsLoading(false);
    }
  };

  const errorHandller = () => {
    setError(null);
  };
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandller} />;

  if (isLoading) return <LoadingOverlay />;
  return (
    <View style={styles.formConatiner}>
      <ItemForm
        onCancel={cancelButtonHandller}
        label={isEditing ? "Update" : "Add"}
        onSubmitHandler={onConfirmHandller}
        defaultValues={selectedGroceryItem}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteButtonHandller}
            // style={styles.infoText}
          />
        </View>
      )}
    </View>
  );
}

export default ManageItem;

const styles = StyleSheet.create({
  formConatiner: {
    flex: 1,
    padding: 15,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
