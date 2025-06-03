import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTFAMILY } from "../../utils/font";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  text: {
    fontFamily: FONTFAMILY.medium,
  },
});

export default Profile;
