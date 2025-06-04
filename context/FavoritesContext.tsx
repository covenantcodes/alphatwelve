import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage key for favorites
const FAVORITES_KEY = "user_favorites";

// Define the shape of a favorite item
export interface FavoriteItem {
  id: string;
  image: any; // We'll handle the image serialization carefully
  name: string;
  price: number;
  details: string;
}

// Define the context shape
interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAllFavorites: () => void;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  clearAllFavorites: () => {},
});

// Create a provider component
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from storage when component mounts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (savedFavorites) {
          // When loading from storage, we only store the product IDs
          // and then need to fetch the full product details
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage
  const saveFavorites = async (newFavorites: FavoriteItem[]) => {
    try {
      // For storage, we'll serialize the favorites array
      // Note: image references will be handled differently
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  // Add an item to favorites
  const addToFavorites = (item: FavoriteItem) => {
    const newFavorites = [...favorites, item];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  // Remove an item from favorites
  const removeFromFavorites = (id: string) => {
    const newFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  // Check if an item is in favorites
  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites([]);
    saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites context
export const useFavorites = () => useContext(FavoritesContext);
