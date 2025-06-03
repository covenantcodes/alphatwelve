import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FONTFAMILY } from "../utils/font";
import colors from "../utils/colors";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={false}
        onSearchChange={handleSearch}
        searchPlaceholder="Search..."
      />
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: FONTFAMILY.medium,
  },
});

export default Home;
