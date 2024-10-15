import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/navigation/TabNavigator";
import EditProduct from "./src/screens/EditProduct";
import AddProductScreen from "./src/screens/AddProductScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{ title: "Sửa sản phẩm" }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ title: "Thêm sản phẩm mới" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
