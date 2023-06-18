import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles } from "../../data/GlobalStyles";

const DropDownInput = ({
  data,
  label,
  currentDropValue,
  onChangeDropHandler,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return <Text style={[styles.label, { color: "white" }]}>{label}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={currentDropValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChangeDropHandler(item);
          // setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropDownInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  dropdown: {
    height: 40,
    borderBottomColorColor: "gray",
    backgroundColor: GlobalStyles.colors.primary100,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color: "white",
    marginBottom: 4,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
