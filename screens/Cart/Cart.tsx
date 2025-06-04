import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import CartCard from "../../components/CartCard";
import { AntDesign } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Determine if this cart is being shown as a stack screen
  const route = useRoute();
  const isStandaloneScreen = route.name === "CartStack";

  // Animation values
  const emptyCartOpacity = useRef(new Animated.Value(0)).current;
  const emptyCartScale = useRef(new Animated.Value(0.8)).current;
  const listItemAnimations = useRef(
    cartItems.map(() => new Animated.Value(50))
  ).current;
  const fadeAnimations = useRef(
    cartItems.map(() => new Animated.Value(0))
  ).current;

  // Run animations on component mount
  useEffect(() => {
    if (cartItems.length === 0) {
      // Empty cart animations
      Animated.parallel([
        Animated.timing(emptyCartOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(emptyCartScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        }),
      ]).start();
    } else {
      // Animate cart items one after another
      cartItems.forEach((_, index) => {
        Animated.parallel([
          Animated.timing(fadeAnimations[index], {
            toValue: 1,
            duration: 400,
            delay: 100 + index * 100,
            useNativeDriver: true,
          }),
          Animated.timing(listItemAnimations[index], {
            toValue: 0,
            duration: 400,
            delay: 100 + index * 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ]).start();
      });
    }
  }, [cartItems.length]);

  // Update animation references when cart items change
  useEffect(() => {
    // Reset animation values if needed
    if (listItemAnimations.length !== cartItems.length) {
      listItemAnimations.current = cartItems.map(() => new Animated.Value(50));
      fadeAnimations.current = cartItems.map(() => new Animated.Value(0));
    }
  }, [cartItems]);

  const handleBackAction = () => {
    if (isStandaloneScreen) {
      // If standalone, go back to previous screen
      navigation.goBack();
    } else {
      // If in tab, do something else or nothing
      (navigation as any).navigate("MainTabs", { screen: "Home" });
    }
  };

  const handleRemoveItem = (id: string) => {
    // Create a fade-out animation for the removed item
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      Animated.timing(fadeAnimations[itemIndex], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Once animation completes, remove from cart
        removeFromCart(id);
      });
    } else {
      // Fallback if animation cannot be created
      removeFromCart(id);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const renderEmptyCart = () => (
    <Animated.View
      style={[
        styles.emptyContainer,
        {
          opacity: emptyCartOpacity,
          transform: [{ scale: emptyCartScale }],
        },
      ]}
    >
      <Animated.View>
        <AntDesign name="shoppingcart" size={60} color={colors.gray3} />
      </Animated.View>

      <Animated.Text style={styles.emptyText}>Your cart is empty</Animated.Text>

      <Animated.Text style={styles.emptySubtext}>
        Items added to your cart will appear here
      </Animated.Text>
    </Animated.View>
  );

  const renderCartItem = ({ item, index }) => {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: listItemAnimations[index] }],
          opacity: fadeAnimations[index],
        }}
      >
        <CartCard
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          onRemove={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          quantity={item.quantity}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        searchBarShow={false}
        showActionContainer={true}
        onActionPress={handleBackAction}
        actionTitle="Your Cart"
      />

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingVertical: 12,
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
  text: {
    fontFamily: FONTFAMILY.medium,
  },
});

export default Cart;
