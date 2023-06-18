import { StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../../data/GlobalStyles";

function Input({ label, textInputConfig, style, invalid }) {
  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline)
    inputStyles.push(styles.multiLineInput);

  if (invalid) inputStyles.push(styles.invalidText);
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    color: "white",
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    borderBottomColor: "blue",
    borderBottomWidth: 0.5,
  },
  multiLineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidText: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
