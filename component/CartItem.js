import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

function CartItem({
  id,
  isChecked,
  itemName,
  defaultQuantity,
  defaultUnitQuantity,
  amount,
  onChecked,
}) {
  const headerButtonPressHandller = () => {
    onChecked(id);
  };
  return (
    <View style={styles.itemContainer}>
      <IconButton
        name={isChecked ? "checkbox" : "square-outline"}
        color="black"
        size={24}
        onPress={headerButtonPressHandller}
      />
      <View>
        <Text style={styles.item}>
          {itemName}
          {" - "}
          {defaultQuantity * amount}
          {" * "}
          {defaultUnitQuantity}
        </Text>
      </View>
    </View>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 90,
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    flex: 1,
  },
  lableContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 150,
  },

  item: {
    fontSize: 18,
    color: "black",
    paddingHorizontal: 8,
    maxHeight: 50,
  },
  quantity: {
    fontSize: 18,
    color: "black",
    paddingHorizontal: 8,
  },
});
