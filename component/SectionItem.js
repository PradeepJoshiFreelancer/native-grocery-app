import { Pressable, StyleSheet, Text, View } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { GlobalStyles } from "../data/GlobalStyles";
import IconButton from "./IconButton";

function SectionItem({
  id,
  defaultQuantity,
  defaultUnitQuantity,
  itemName,
  amount,
  isFavourate,
  onItemUpdate,
  onStarPressed,
  onLongPress,
}) {
  const onUpdateHandler = (num) => {
    onItemUpdate(num, id);
  };
  const handleLongPress = () => {
    onLongPress(id);
  };
  const handleStarPress = () => {
    onStarPressed(id);
  };
  return (
    <Pressable
      style={[styles.itemContainer, amount > 0 && styles.filled]}
      android_ripple={{ color: "#ccc", borderless: false }}
      onLongPress={handleLongPress}
    >
      <View style={styles.lableContainer}>
        <IconButton
          name={isFavourate ? "star" : "star-outline"}
          size={24}
          color={GlobalStyles.colors.primary700}
          onPress={handleStarPress}
        />
        <View>
          <Text style={styles.item}>{itemName}</Text>
          <Text style={styles.quantity}>
            {defaultQuantity} {defaultUnitQuantity}
          </Text>
        </View>
      </View>
      <View>
        <InputSpinner
          min={0}
          max={10}
          step={1}
          colorMax={GlobalStyles.colors.maxColor}
          colorMin={GlobalStyles.colors.minColor}
          onChange={onUpdateHandler}
          value={amount}
          skin="modern"
        />
      </View>
    </Pressable>
  );
}

export default SectionItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 90,
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 4,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  filled: {
    backgroundColor: "#d5f5b5",
  },
  lableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
