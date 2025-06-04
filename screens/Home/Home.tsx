import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
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

// Get screen dimensions
const { width } = Dimensions.get("window");

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Animation values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  // Animation for individual product cards
  const [animatedValues] = useState(() =>
    products.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
    }))
  );

  useEffect(() => {
    // Animate title first
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();

    // Then animate list opacity
    Animated.timing(listOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      delay: 300,
    }).start();

    // Animate each product card with a staggered delay
    products.forEach((_, index) => {
      Animated.parallel([
        Animated.timing(animatedValues[index].opacity, {
          toValue: 1,
          duration: 500,
          delay: 400 + index * 100, // Stagger the animations
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(animatedValues[index].translateY, {
          toValue: 0,
          duration: 500,
          delay: 400 + index * 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    });
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleBackAction = () => {
    console.log("Back button pressed");
  };

  const handleProductPress = (productId: string) => {
    console.log("Product ID:", productId);

    // Add animation feedback for the pressed item
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      Animated.sequence([
        Animated.timing(animatedValues[index].translateY, {
          toValue: -5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[index].translateY, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navigate after animation completes
        navigation.navigate("ProductDetails", { productId });
      });
    } else {
      // Fallback if item not found
      navigation.navigate("ProductDetails", { productId });
    }
  };

  const categoryTitle = "Smartphones, Laptops & Accessories";
  const [firstPart, secondPart] = categoryTitle.split(" & ");

  // Calculate grid item width for consistent spacing
  const itemSpacing = 16;
  const numberOfColumns = 2;
  const cardWidth =
    (width - itemSpacing * (numberOfColumns + 1)) / numberOfColumns;

  // Custom render item with animation
  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof products)[0];
    index: number;
  }) => {
    return (
      <Animated.View
        style={{
          opacity: animatedValues[index].opacity,
          transform: [{ translateY: animatedValues[index].translateY }],
          margin: itemSpacing / 2,
          width: cardWidth,
        }}
      >
        <ProductCard
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          handlePress={() => handleProductPress(item.id)}
        />
      </Animated.View>
    );
  };

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
        {/* Animated Title */}
        <Animated.View
          style={[
            styles.categoryTitle,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          <Text style={styles.categoryTitleText}>
            {firstPart} &{"\n"}
            {secondPart}
          </Text>
        </Animated.View>

        {/* Products Grid with Animations */}
        <Animated.View
          style={[styles.productsContainer, { opacity: listOpacity }]}
        >
          <FlashList
            data={products}
            renderItem={renderItem}
            estimatedItemSize={240}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
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
