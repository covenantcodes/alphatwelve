import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTFAMILY } from "../../utils/font";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const Cart = () => {
  const navigation = useNavigation();
  const handleBackAction = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={false}
        showActionContainer={true}
        onActionPress={handleBackAction}
        actionTitle="Your Cart"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: FONTFAMILY.medium,
  },
});

export default Cart;
