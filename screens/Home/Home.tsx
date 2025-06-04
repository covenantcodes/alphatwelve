import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/data";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";

// Create a typed navigation prop
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleBackAction = () => {
    // Handle back action here
    console.log("Back button pressed");
  };

  // Fix: Create a function that accepts productId as a parameter
  const handleProductPress = (productId: string) => {
    console.log("Product ID:", productId);
    navigation.navigate("ProductDetails", { productId });
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
        {/* Products Grid using FlashList */}
        <View style={styles.productsContainer}>
          <FlashList
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                handlePress={() => handleProductPress(item.id)}
              />
            )}
            estimatedItemSize={240}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
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
  productsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default Home;
