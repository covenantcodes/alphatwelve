import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleBackAction = () => {
    // Handle back action here
    console.log("Back button pressed");
  };

  const categoryTitle = "Smartphones, Laptops & Accessories";
  const [firstPart, secondPart] = categoryTitle.split(" & ");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={true}
        onSearchChange={handleSearch}
        searchPlaceholder="Search..."
        showActionContainer={true}
        actionTitle="Technology"
        onActionPress={handleBackAction}
      />
      <View style={styles.container}>
        <View style={styles.categoryTitle}>
          <Text style={styles.categoryTitleText}>
            {firstPart} &{"\n"}
            {secondPart}
          </Text>
        </View>
      </View>
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
});

export default Home;
