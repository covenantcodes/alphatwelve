import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";
import images from "../utils/images";
import Bell from "./svgs/bell";
import CaretLeft from "./svgs/caretLeft";
import { userData } from "../data/data";
import SearchBar from "./SearchBar";

interface HeaderProps {
  customAddress?: string;
  searchBarShow?: boolean;
  onSearchChange?: (text: string) => void;
  searchPlaceholder?: string;
  showActionContainer?: boolean;
  actionTitle?: string;
  onActionPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  customAddress,
  searchBarShow = false,
  onSearchChange,
  searchPlaceholder = "Search...",
  showActionContainer = false,
  actionTitle = "Action Title",
  onActionPress,
}) => {
  const address = userData.address.fullAddress;
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContainer}>
        {/* Left Section - Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Center Section - Delivery Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        {/* Right Section - Bell Icon */}
        <View style={styles.iconContainer}>
          <Bell width={24} height={24} color={colors.black} />
        </View>
      </View>

      {/* Optional SearchBar */}
      {searchBarShow && (
        <SearchBar
          placeholder={searchPlaceholder}
          onChangeText={onSearchChange}
        />
      )}

      {/* Action Container with caret and title */}
      {showActionContainer && (
        <View style={styles.actionContainerWrapper}>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={onActionPress}>
              <CaretLeft width={15} height={15} color={colors.gray2} />
            </TouchableOpacity>
            <Text style={styles.actionTitle}>{actionTitle}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  logo: {
    width: 60,
    height: 60,
  },
  addressContainer: {
    flex: 2,
    alignItems: "center",
  },
  addressLabel: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.xs,
    color: colors.gray2,
    textTransform: "uppercase",
  },
  addressText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  actionContainerWrapper: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  actionTitle: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginLeft: 10,
  },
});

export default Header;
