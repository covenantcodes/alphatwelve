import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import CartCard from "../../components/CartCard";
import { AntDesign } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <AntDesign name="shoppingcart" size={60} color={colors.gray3} />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Text style={styles.emptySubtext}>
        Items added to your cart will appear here
      </Text>
    </View>
  );

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
          renderItem={({ item }) => (
            <CartCard
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              quantity={item.quantity}
            />
          )}
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
