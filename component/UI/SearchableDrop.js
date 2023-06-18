import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../data/GlobalStyles";
import SearchableDropDown from "react-native-searchable-dropdown";

const SearchableDrop = ({
  data,
  label,
  currentSearchValue,
  onChangeSearchHandler,
}) => {
  const [items, setItems] = useState(data);

  const renderLabel = () => {
    return <Text style={[styles.label, { color: "white" }]}>{label}</Text>;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <SearchableDropDown
        onItemSelect={(item) => {
          setItems((prevState) => [...prevState, item]);
          onChangeSearchHandler({ id: item.id, name: item.name });
        }}
        selectedItems={currentSearchValue}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 8,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={items}
        resetValue={false}
        textInputProps={{
          placeholder: "Category",
          backgroundColor: GlobalStyles.colors.primary100,
          style: {
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            color: GlobalStyles.colors.primary700,
          },
          onTextChange: (text) => {
            onChangeSearchHandler({ id: 991, name: text });
          },
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
};

export default SearchableDrop;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    color: "white",
    marginBottom: 4,
    fontSize: 12,
  },
});
