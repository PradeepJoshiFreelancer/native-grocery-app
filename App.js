import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import CartList from "./screens/CartList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import ManageItem from "./screens/ManageItem";
import CategoryList from "./screens/CategoryList";
import { GlobalStyles } from "./data/GlobalStyles";
import { Provider } from "react-redux";
import store from "./store";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerTintColor: "white",
      }}
    >
      <BottomTab.Screen
        name="CategoryList"
        component={CategoryList}
        options={({ navigation }) => ({
          title: "Grossary List",
          headerRight: ({ tintColor }) => (
            <Pressable
              style={{ margin: 12 }}
              onPress={() => {
                navigation.navigate("ManageItems", {
                  groceryItemId: null,
                });
              }}
            >
              <Ionicons name="add" size={24} color={tintColor} />
            </Pressable>
          ),
          tabBarLabel: "Item List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="GroceryList"
              component={BottomNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManageItems" component={ManageItem} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
