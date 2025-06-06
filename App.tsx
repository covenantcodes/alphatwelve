import React, { useState, useCallback, useEffect } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./navigation/AppNavigator";
import CustomSplashScreen from "./components/SplashScreen";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

import colors from "./utils/colors";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

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

  // Function to hide the splash screen when ready
  const onFinishSplash = useCallback(async () => {
    try {
      // Hide the splash screen
      await SplashScreen.hideAsync();
      // Now show your app
      setShowSplash(false);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Load any resources or data needed for your app
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Artificially delay for a smoother startup experience
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  if (showSplash) {
    return <CustomSplashScreen onFinish={onFinishSplash} />;
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loader} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <FavoritesProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </FavoritesProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.gray3,
    borderTopColor: colors.secondaryColor,
  },
});
