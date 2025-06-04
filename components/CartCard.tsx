import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";
import Delete from "./svgs/delete";
import Plus from "./svgs/plus";
import Minus from "./svgs/minus";

interface CartCardProps {
  id: string;
  image: any;
  name: string;
  price: number;
  quantity?: number; // Make it optional with a default value
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  id,
  image,
  name,
  price,
  quantity = 1, // Default to 1 if not provided
  onRemove,
  onUpdateQuantity,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  // Update local quantity when the prop changes
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleIncrement = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    onUpdateQuantity(id, newQuantity);
  };

  const handleDecrement = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        <Text style={styles.stockStatus}>In stock</Text>

        {/* Bottom Row - Quantity Controls and Delete Button */}
        <View style={styles.actionsRow}>
          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.decrementButton}
              onPress={handleDecrement}
              disabled={localQuantity <= 1}
            >
              <Minus
                width={16}
                height={16}
                color={localQuantity > 1 ? colors.gray1 : colors.gray1}
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{localQuantity}</Text>

            <TouchableOpacity
              style={styles.incrementButton}
              onPress={handleIncrement}
            >
              <Plus width={16} height={16} color={colors.gray2} />
            </TouchableOpacity>
          </View>

          {/* Delete Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
            <Delete width={18} height={18} color={colors.gray6} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.gray8,
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginVertical: 4,
  },
  stockStatus: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.xs,
    color: colors.greenLight,
    marginVertical: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  decrementButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
    paddingHorizontal: 12,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartCard;
