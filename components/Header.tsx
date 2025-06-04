import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
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
  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const bellRotation = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  // Animate when component mounts
  useEffect(() => {
    // Fade in header
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Small bell shake animation
    const shakeAnimation = Animated.sequence([
      Animated.timing(bellRotation, {
        toValue: 0.1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: -0.1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]);

    // Play bell shake after a small delay
    setTimeout(() => {
      shakeAnimation.start();
    }, 1000);
  }, []);

  // Bell shake animation when tapped
  const shakeBell = () => {
    // Reset rotation value
    bellRotation.setValue(0);

    // Create shake animation sequence
    Animated.sequence([
      Animated.timing(bellRotation, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: -0.2,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: 0.15,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: -0.15,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(bellRotation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };

  // Logo animation when tapped
  const animateLogo = () => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
    ]).start();
  };

  // Bell rotation interpolation
  const bellRotationDeg = bellRotation.interpolate({
    inputRange: [-0.2, 0, 0.2],
    outputRange: ["-12deg", "0deg", "12deg"],
  });

  // Address
  const address = customAddress || userData.address.fullAddress;

  return (
    <Animated.View style={[styles.headerWrapper, { opacity: headerOpacity }]}>
      <View style={styles.headerContainer}>
        {/* Left Section - Logo */}
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={animateLogo}
          activeOpacity={0.8}
        >
          <Animated.Image
            source={images.logo}
            style={[styles.logo, { transform: [{ scale: logoScale }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Center Section - Delivery Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>

        {/* Right Section - Bell Icon */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={shakeBell}
          activeOpacity={0.6}
        >
          <Animated.View style={{ transform: [{ rotate: bellRotationDeg }] }}>
            <Bell width={24} height={24} color={colors.black} />
          </Animated.View>
        </TouchableOpacity>
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
            <TouchableOpacity
              onPress={onActionPress}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <CaretLeft width={15} height={15} color={colors.gray2} />
            </TouchableOpacity>
            <Text style={styles.actionTitle}>{actionTitle}</Text>
          </View>
        </View>
      )}
    </Animated.View>
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
    padding: 5, // Make the touch target larger
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
  backButton: {
    padding: 5, // Makes the touch target larger
  },
});

export default Header;
