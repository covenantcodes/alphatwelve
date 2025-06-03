import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/Products/ProductDetails";
import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "../utils/types";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
