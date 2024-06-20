import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "../UI/Input";
import { useState } from "react";
import DropDownInput from "../UI/DropDown";
import { CATEGORY_LIST, UNIT_ARRAY } from "../../data/dummy-data";
import Button from "../UI/Button";
import { GlobalStyles } from "../../data/GlobalStyles";
import SearchableDrop from "../UI/SearchableDrop";
import { findCategory, findUnitQuantity } from "../../util/utility";

function ItemForm({ onCancel, label, onSubmitHandler, defaultValues }) {
  const [inputs, setInputs] = useState({
    itemName: {
      value: defaultValues ? defaultValues.itemName : "",
      isValid: true,
    },
    defaultQuantity: {
      value: defaultValues ? defaultValues.defaultQuantity.toString() : "",
      isValid: true,
    },
    defaultUnitQuantity: {
      value: defaultValues
        ? findUnitQuantity(defaultValues.defaultUnitQuantity)
        : { label: "", value: "" },
      isValid: true,
    },
    category: {
      value: defaultValues
        ? findCategory(defaultValues.category)
        : { label: "", value: "" },
      isValid: true,
    },
  });
  const inputChangeHandller = (inputIndentifer, enteredValue) => {
    setInputs((currEnteredValue) => {
      return {
        ...currEnteredValue,
        [inputIndentifer]: { value: enteredValue, isValid: true },
      };
    });
  };

  const onCategoryDropHandler = (data) => {
    setInputs((currEnteredValue) => {
      return {
        ...currEnteredValue,
        defaultUnitQuantity: { value: data, isValid: true },
      };
    });
    // console.log("Text = " + JSON.stringify(data));
  };

  const onCategoryChangeHandler = (data) => {
    setInputs((currEnteredValue) => {
      return {
        ...currEnteredValue,
        category: { value: data, isValid: true },
      };
    });
    // console.log("Text = " + JSON.stringify(data));
  };

  const submitHandller = () => {
    const groceryItem = {
      amount: 0,
      category: inputs.category.value.name,
      defaultQuantity: +inputs.defaultQuantity.value,
      defaultUnitQuantity: inputs.defaultUnitQuantity.value.label,
      itemName: inputs.itemName.value,
    };
    // console.log(JSON.stringify(inputs));
    // console.log(groceryItem);
    const isCategoryValid =
      groceryItem.category != null && groceryItem.category.trim().length > 0;

    const isDefaultQuantityValid =
      !isNaN(groceryItem.defaultQuantity) && groceryItem.defaultQuantity > 0;

    const isDefaultUnitQuantityValid =
      groceryItem.defaultUnitQuantity != null &&
      groceryItem.defaultUnitQuantity.trim().length > 0;

    const isItemNameValid = groceryItem.itemName.trim().length > 0;

    // console.log("isCategoryValid = " + isCategoryValid);
    // console.log("isDefaultQuantityValid = " + isDefaultQuantityValid);
    // console.log("isDefaultUnitQuantityValid = " + isDefaultUnitQuantityValid);
    // console.log("isItemNameValid = " + isItemNameValid);

    if (
      !isCategoryValid ||
      !isDefaultQuantityValid ||
      !isDefaultUnitQuantityValid ||
      !isItemNameValid
    ) {
      Alert.alert("Invalid Input", "Please check your inputs");
      return;
    }
    onSubmitHandler(groceryItem);
  };
  return (
    <View>
      <Text style={styles.title}>
        {defaultValues ? "Update Item" : "Add New Item"}
      </Text>
      <Input
        label="Description"
        textInputConfig={{
          autoCorrect: false,
          // autoCapitalize: "none",
          onChangeText: inputChangeHandller.bind(this, "itemName"),
          value: inputs.itemName.value,
        }}
      />
      <View style={styles.unitContainer}>
        <View style={styles.rowInput}>
          <Input
            label="Default Quantity"
            textInputConfig={{
              autoCorrect: false,
              autoCapitalize: "none",
              inputMode: "numeric",
              keyboardType: "number-pad",
              onChangeText: inputChangeHandller.bind(this, "defaultQuantity"),
              value: inputs.defaultQuantity.value,
            }}
          />
        </View>
        <View style={styles.rowInput}>
          <DropDownInput
            data={UNIT_ARRAY}
            label="Default Unit"
            currentDropValue={inputs.defaultUnitQuantity.value}
            onChangeDropHandler={onCategoryDropHandler}
          />
        </View>
      </View>
      <SearchableDrop
        data={CATEGORY_LIST}
        label="Category"
        currentSearchValue={inputs.category.value}
        onChangeSearchHandler={onCategoryChangeHandler}
      />
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandller}>
          {label}
        </Button>
      </View>
    </View>
  );
}

export default ItemForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  unitContainer: {
    flexDirection: "row",
  },
  errorText: {
    alignItems: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  button: {
    marginVertical: 8,
    minWidth: 120,
    marginHorizontal: 8,
  },
});
