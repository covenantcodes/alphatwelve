import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
