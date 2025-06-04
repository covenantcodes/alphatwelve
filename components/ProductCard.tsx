import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";
import { ProductCardProps } from "../utils/types";

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  handlePress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginHorizontal: 8,
    flexDirection: "column",
  },
  imageContainer: {
    height: 140,
    width: "100%",
    padding: 10,
    backgroundColor: colors.gray5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.black,
    marginBottom: 4,
  },

  price: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.black,
  },
});

export default ProductCard;
