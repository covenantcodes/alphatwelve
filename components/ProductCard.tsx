import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";

interface ProductCardProps {
  image: ImageSourcePropType;
  name: string;
  details: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  details,
  price,
}) => {
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {/* <Text style={styles.details} numberOfLines={1}>{details}</Text> */}
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 240,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    marginHorizontal: 8,
    flexDirection: "column",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 140,
    width: "100%",
    padding: 10,
    backgroundColor: colors.gray5,
    alignItems: "center",
    justifyContent: "center",
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
    color: colors.gray2,
    marginBottom: 4,
  },
  details: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.xs,
    color: colors.gray4,
    marginBottom: 8,
  },
  price: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.black,
  },
});

export default ProductCard;
