import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { FONTFAMILY, FONTSIZE } from "../../utils/font";
import colors from "../../utils/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  // Animation values
  const bannerAnimation = useRef(new Animated.Value(0)).current;
  const avatarScale = useRef(new Animated.Value(0.5)).current;
  const avatarOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const toolAnimation = useRef(new Animated.Value(0)).current;
  const featuresAnimation = useRef(new Animated.Value(0)).current;

  // Feature items animations
  const featureAnimations = useRef([
    new Animated.Value(20),
    new Animated.Value(20),
    new Animated.Value(20),
    new Animated.Value(20),
  ]).current;

  useEffect(() => {
    // Banner slide down
    Animated.timing(bannerAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Avatar zoom in and fade in
    Animated.parallel([
      Animated.timing(avatarScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(avatarOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Content fade in
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Tool icon rotate and fade in
    Animated.timing(toolAnimation, {
      toValue: 1,
      duration: 1200,
      delay: 600,
      useNativeDriver: true,
      easing: Easing.elastic(1.2),
    }).start();

    // Features container slide up
    Animated.timing(featuresAnimation, {
      toValue: 1,
      duration: 800,
      delay: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Staggered features animations
    featureAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        delay: 1000 + index * 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    });
  }, []);

  // Derived animated values
  const bannerTranslateY = bannerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const toolRotate = toolAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const featuresTranslateY = featuresAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header with Development Badge */}
      <Animated.View
        style={[
          styles.devBannerContainer,
          {
            transform: [{ translateY: bannerTranslateY }],
            opacity: bannerAnimation,
          },
        ]}
      >
        <Text style={styles.devBannerText}>IN DEVELOPMENT</Text>
      </Animated.View>

      {/* Profile Content Mockup */}
      <Animated.View
        style={[styles.profileContainer, { opacity: contentOpacity }]}
      >
        <Animated.View
          style={[
            styles.avatarContainer,
            {
              opacity: avatarOpacity,
              transform: [{ scale: avatarScale }],
            },
          ]}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
          <View style={styles.cameraIconContainer}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                // Add a quick scale animation when pressed
                Animated.sequence([
                  Animated.timing(avatarScale, {
                    toValue: 1.1,
                    duration: 150,
                    useNativeDriver: true,
                  }),
                  Animated.timing(avatarScale, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                  }),
                ]).start();
              }}
            >
              <Ionicons name="camera" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.Text style={[styles.userName, { opacity: contentOpacity }]}>
          Covenant Ifeoluwa
        </Animated.Text>

        <Animated.Text style={[styles.userEmail, { opacity: contentOpacity }]}>
          covenantcodes@gmail.com
        </Animated.Text>
      </Animated.View>

      {/* Under Construction Message */}
      <Animated.View
        style={[styles.underConstructionContainer, { opacity: contentOpacity }]}
      >
        <Animated.View
          style={{
            transform: [{ rotate: toolRotate }],
          }}
        >
          <AntDesign name="tool" size={50} color={colors.gray2} />
        </Animated.View>

        <Animated.Text
          style={[styles.underConstructionText, { opacity: contentOpacity }]}
        >
          Profile functionality is under development
        </Animated.Text>

        <Animated.Text
          style={[styles.underConstructionSubtext, { opacity: contentOpacity }]}
        >
          We're working hard to bring you a great profile experience soon!
        </Animated.Text>
      </Animated.View>

      {/* Coming Soon Features */}
      <Animated.View
        style={[
          styles.comingSoonContainer,
          {
            opacity: featuresAnimation,
            transform: [{ translateY: featuresTranslateY }],
          },
        ]}
      >
        <Text style={styles.comingSoonTitle}>Coming Soon:</Text>

        {/* Feature items with staggered animations */}
        <Animated.View
          style={[
            styles.featureItem,
            { transform: [{ translateX: featureAnimations[0] }] },
          ]}
        >
          <AntDesign name="checkcircleo" size={18} color={colors.gray2} />
          <Text style={styles.featureText}>User Profile Management</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.featureItem,
            { transform: [{ translateX: featureAnimations[1] }] },
          ]}
        >
          <AntDesign name="checkcircleo" size={18} color={colors.gray2} />
          <Text style={styles.featureText}>Order History</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.featureItem,
            { transform: [{ translateX: featureAnimations[2] }] },
          ]}
        >
          <AntDesign name="checkcircleo" size={18} color={colors.gray2} />
          <Text style={styles.featureText}>Shipping Address Management</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.featureItem,
            { transform: [{ translateX: featureAnimations[3] }] },
          ]}
        >
          <AntDesign name="checkcircleo" size={18} color={colors.gray2} />
          <Text style={styles.featureText}>Payment Methods</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  devBannerContainer: {
    backgroundColor: colors.secondaryColor,
    paddingVertical: 8,
    alignItems: "center",
  },
  devBannerText: {
    fontFamily: FONTFAMILY.bold,
    color: colors.white,
    fontSize: FONTSIZE.sm,
    letterSpacing: 1,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.gray5,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cameraButton: {
    backgroundColor: colors.secondaryColor,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.white,
  },
  userName: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginBottom: 5,
  },
  userEmail: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
  },
  underConstructionContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  underConstructionText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    color: colors.gray2,
    marginTop: 15,
    textAlign: "center",
  },
  underConstructionSubtext: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray4,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  comingSoonContainer: {
    padding: 20,
    backgroundColor: colors.gray5,
    margin: 20,
    borderRadius: 12,
  },
  comingSoonTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    color: colors.gray2,
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
    marginLeft: 10,
  },
});

export default Profile;
