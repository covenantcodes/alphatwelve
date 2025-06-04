import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { FONTFAMILY } from "./utils/font";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import AppNavigator from "./navigation/AppNavigator";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    IBMPlexSansThin: require("./assets/fonts/IBMPlexSans-Thin.ttf"),
    IBMPlexSansThinItalic: require("./assets/fonts/IBMPlexSans-ThinItalic.ttf"),
    IBMPlexSansLight: require("./assets/fonts/IBMPlexSans-Light.ttf"),
    IBMPlexSansExtraLight: require("./assets/fonts/IBMPlexSans-ExtraLight.ttf"),
    IBMPlexSansMedium: require("./assets/fonts/IBMPlexSans-Medium.ttf"),
    IBMPlexSansMediumItalic: require("./assets/fonts/IBMPlexSans-MediumItalic.ttf"),
    IBMPlexSansRegular: require("./assets/fonts/IBMPlexSans-Regular.ttf"),
    IBMPlexSansSemiBold: require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
    IBMPlexSansBold: require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    IBMPlexMonoRegular: require("./assets/fonts/IBMPlexMono-Regular.ttf"),
    IBMPlexMonoMedium: require("./assets/fonts/IBMPlexMono-Medium.ttf"),
    IBMPlexMonoSemiBold: require("./assets/fonts/IBMPlexMono-SemiBold.ttf"),
    IBMPlexMonoBold: require("./assets/fonts/IBMPlexMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
