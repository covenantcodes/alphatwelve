import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/Products/ProductDetails";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

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
