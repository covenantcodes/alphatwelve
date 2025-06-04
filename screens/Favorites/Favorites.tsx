import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { useFavorites } from "../../context/FavoritesContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types";
import { AntDesign } from "@expo/vector-icons";

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

const Favorites = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const handleProductPress = (productId: string) => {
    navigation.navigate("ProductDetails", { productId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header searchBarShow={false} showActionContainer={false} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Favorites</Text>
        </View>

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AntDesign name="hearto" size={50} color={colors.gray3} />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>
              Items added to your favorites will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                handlePress={() => handleProductPress(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.xl,
    color: colors.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.gray2,
    marginTop: 16,
  },
  emptySubtext: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray4,
    textAlign: "center",
    marginTop: 8,
  },
  listContent: {
    padding: 8,
  },
});

export default Favorites;
