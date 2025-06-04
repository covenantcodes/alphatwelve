import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
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
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(-50))[0];

  // State to track if item is in cart
  const [isInCart, setIsInCart] = useState(false);

  // Use favorites context
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Use cart context
  const { addToCart, getCartItemById } = useCart();

  // Get the productId from route params
  const productId = route.params.productId;

  // Find the selected product from data
  const product = products.find((p) => p.id === productId) || products[0];

  // Check if this product is in favorites
  const [isFavorited, setIsFavorited] = useState(isFavorite(productId));

  // Update local state when component mounts and when cart changes
  useEffect(() => {
    // Check if item is already in cart
    const cartItem = getCartItemById(productId);
    setIsInCart(!!cartItem);

    // Check favorite status
    setIsFavorited(isFavorite(productId));
  }, [getCartItemById, productId, isFavorite]);

  // Handle back navigation
  const handleBackAction = () => {
    navigation.goBack();
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(productId);
      console.log(`Removed product ${productId} from favorites`);
    } else {
      addToFavorites({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        details: product.details,
      });
      console.log(`Added product ${productId} to favorites`);
    }
    setIsFavorited(!isFavorited);
  };

  // Dismiss toast manually
  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowToast(false);
    });
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    console.log(`Adding product ${productId} to cart`);

    // Add the product to cart using CartContext
    addToCart({
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
    });

    // Update the local state to indicate item is in cart
    setIsInCart(true);

    // Show the toast notification
    setShowToast(true);

    // Reset animation values
    fadeAnim.setValue(0);
    slideAnim.setValue(-50);

    // Animation for the toast
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after 3 seconds (changed from 4 seconds)
    setTimeout(() => {
      if (showToast) {
        dismissToast();
      }
    }, 3000); // Changed from 4000 to 3000 milliseconds
  };

  // Navigate to cart screen
  const handleViewCart = () => {
    (navigation as any).navigate("CartStack");
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
              isFavorited && styles.favoriteButtonActive,
            ]}
            onPress={toggleFavorite}
          >
            <AntDesign
              name={isFavorited ? "heart" : "hearto"}
              size={20}
              color={isFavorited ? colors.red : colors.gray2}
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

      {/* Add/View Cart Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.addToCartButton, isInCart && styles.viewCartButton]}
          onPress={isInCart ? handleViewCart : handleAddToCart}
        >
          <Text
            style={[
              styles.buttonText,
              isInCart && { color: colors.secondaryColor },
            ]}
          >
            {isInCart ? "View cart" : "Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Improved Toast Notification */}
      {showToast && (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.toastAccent} />
          <View style={styles.toastContent}>
            <View style={styles.toastIconContainer}>
              <AntDesign
                name="checkcircleo"
                size={22}
                color={colors.greenLight}
              />
            </View>
            <Text style={styles.toastText}>Item has been added to cart</Text>
            <TouchableOpacity style={styles.closeButton} onPress={dismissToast}>
              <AntDesign name="close" size={18} color={colors.gray2} />
            </TouchableOpacity>
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
  viewCartButton: {
    backgroundColor: colors.white,
    borderColor: colors.secondaryColor,
    borderWidth: 1.5,
  },
  buttonText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.white,
  },

  // Toast styles
  toast: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
    zIndex: 1000,
  },
  toastAccent: {
    width: 6,
    backgroundColor: colors.greenLight,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  toastContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  toastIconContainer: {
    marginRight: 12,
  },
  toastText: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
  },
  closeButton: {
    padding: 4,
  },
});

export default ProductDetails;
