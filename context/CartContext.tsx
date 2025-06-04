import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage key for cart
const CART_KEY = "user_cart";

// Define the shape of a cart item
export interface CartItem {
  id: string;
  image: any; // We'll handle the image serialization carefully
  name: string;
  price: number;
  quantity: number;
}

// Define the context shape
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getCartItemById: (id: string) => CartItem | undefined;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getItemCount: () => 0,
  getTotalPrice: () => 0,
  getCartItemById: () => undefined,
});

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from storage when component mounts
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage
  const saveCart = async (newCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Add an item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If item already exists, increment quantity
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      setCartItems(updatedCart);
      saveCart(updatedCart);
    } else {
      // Otherwise add new item with quantity 1
      const newCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newCart);
      saveCart(newCart);
    }
  };

  // Remove an item from cart
  const removeFromCart = (id: string) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    saveCart(newCart);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  // Get total number of items in cart
  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of items in cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get a specific cart item by ID
  const getCartItemById = (id: string) => {
    return cartItems.find((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotalPrice,
        getCartItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
