import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

import HomeScreen from "../screens/Home/Home";
import CartScreen from "../screens/Cart/Cart";
import FavoritesScreen from "../screens/Favorites/Favorites";
import ProfileScreen from "../screens/Profile/Profile";

import Home from "../components/svgs/home";
import Cart from "../components/svgs/cart";
import Favorites from "../components/svgs/favorites";
import Profile from "../components/svgs/profile";

import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import { useFavorites } from "../context/FavoritesContext";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // Get favorites using the context
  const { favorites } = useFavorites();

  // Badge should be visible when favorites array has items
  const favoritesCount = favorites.length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                focused && styles.activeTabBackground,
              ]}
            >
              <Home
                width={24}
                height={24}
                color={focused ? colors.white : colors.gray2}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.tabBarLabel, focused && styles.activeTabLabel]}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                focused && styles.activeTabBackground,
              ]}
            >
              <Cart
                width={24}
                height={24}
                color={focused ? colors.white : colors.gray2}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.tabBarLabel, focused && styles.activeTabLabel]}
            >
              Cart
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                focused && styles.activeTabBackground,
              ]}
            >
              <Favorites
                width={24}
                height={24}
                color={focused ? colors.white : colors.gray2}
              />
              {/* Display badge if there are favorites */}
              {favoritesCount > 0 && !focused && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {favoritesCount > 9 ? "9+" : favoritesCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.tabBarLabel, focused && styles.activeTabLabel]}
            >
              Favorites
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                focused && styles.activeTabBackground,
              ]}
            >
              <Profile
                width={24}
                height={24}
                color={focused ? colors.white : colors.gray2}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.tabBarLabel, focused && styles.activeTabLabel]}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    height: 100,
    borderTopWidth: 0,
    elevation: 8,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    paddingTop: 10,
  },
  tabIconContainer: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeTabBackground: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 20,
  },
  tabBarLabel: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.xs,
    marginBottom: 5,
    paddingTop: 10,
  },
  activeTabLabel: {
    color: colors.secondaryColor,
    fontFamily: FONTFAMILY.semibold,
  },
  // New styles for the badge
  badgeContainer: {
    position: "absolute",
    top: 5,
    right: 15,
    backgroundColor: colors.gray7,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: FONTFAMILY.bold,
  },
});

export default BottomTabNavigator;
