import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import Header from "../../components/Header";

const ProductDetails = () => {
  const handleBackAction = () => {
    // Handle back action here
    console.log("Back button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={false}
        showActionContainer={true}
        actionTitle="Go back"
        onActionPress={handleBackAction}
      />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  divider: {
    height: 1,
    backgroundColor: colors.gray,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryTitle: {
    padding: 10,
  },
  categoryTitleText: {
    fontFamily: FONTFAMILY.special,
    fontSize: FONTSIZE.lg,
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default ProductDetails;
