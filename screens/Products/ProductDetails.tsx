import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import Header from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { products } from "../../data/data";
import { RootStackParamList } from "../../utils/types";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;
type ProductDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

interface ProductDetailsProps {
  route: ProductDetailsRouteProp;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Get the productId from route params
  const productId = route.params.productId;

  // Find the selected product from data
  const product = products.find((p) => p.id === productId) || products[0];

  // Handle back navigation
  const handleBackAction = () => {
    navigation.goBack();
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // Here you would typically update your app's state or make an API call
    console.log(`Product ${productId} favorite status: ${!isFavorite}`);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    // Here you would typically update your cart state in a global state manager
    // like Redux or Context API. For this example, we'll just show a toast.
    console.log(`Adding product ${productId} to cart`);

    // Show the toast notification
    setShowToast(true);

    // Animation for the toast
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000), // Toast display duration
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowToast(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={false}
        showActionContainer={true}
        actionTitle="Go back"
        onActionPress={handleBackAction}
      />
      <ScrollView style={styles.container}>
        {/* Product Image Section with Favorite Icon */}
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && styles.favoriteButtonActive,
            ]}
            onPress={toggleFavorite}
          >
            {/* Use AntDesign heart icons that automatically fill */}
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={20}
              color={isFavorite ? colors.red : colors.gray2}
            />
          </TouchableOpacity>
        </View>

        {/* Product Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          {/* Description Section */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this item</Text>

            {/* Convert product details to bullet points */}
            {product.details.split(". ").map(
              (detail, index) =>
                detail.trim() && (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{detail.trim()}</Text>
                  </View>
                )
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Toast Notification */}
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <View style={styles.toastContent}>
            <AntDesign name="checkcircleo" size={20} color={colors.white} />
            <Text style={styles.toastText}>Added to cart!</Text>
          </View>
        </Animated.View>
      )}
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
  imageContainer: {
    height: 350,
    width: "100%",
    backgroundColor: colors.gray5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteButtonActive: {
    backgroundColor: colors.white,
    shadowOpacity: 0.2,
  },
  detailsContainer: {
    padding: 16,
  },
  productTitle: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.xl,
    color: colors.black,
    marginBottom: 15,
  },
  descriptionContainer: {
    marginBottom: 12,
  },
  descriptionTitle: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray6,
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 10,
    paddingRight: 8,
  },
  bulletDot: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.gray6,
    marginRight: 8,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray6,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  addToCartButton: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.white,
  },
  toast: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toastText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.sm,
    color: colors.white,
    marginLeft: 8,
  },
});

export default ProductDetails;
