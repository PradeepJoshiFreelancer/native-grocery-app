import { StyleSheet } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../../data/GlobalStyles";
import { ActivityIndicator } from "react-native";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}
export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
