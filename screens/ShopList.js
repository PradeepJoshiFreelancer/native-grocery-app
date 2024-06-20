import { FlatList } from "react-native";
import ShopGrid from "../component/ShopGrid";
import { SHOPS } from "../data/dummy-data";

function ShopList({ navigation }) {
  const renderCategoryItem = (itemData) => {
    const onPressHandler = () => {
      navigation.navigate("GroceryList", {
        screen: "CategoryList",
        params: {
          shopId: itemData.item.id,
        },
      });
    };
    return (
      <ShopGrid
        name={itemData.item.name}
        color={itemData.item.color}
        onPress={onPressHandler}
      />
    );
  };

  return (
    <FlatList
      data={SHOPS}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}
export default ShopList;
