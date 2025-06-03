import { UserData } from "../utils/types";

export const userData: UserData = {
  id: "usr12345",
  name: "Covenant Ifeoluwa",
  email: "covenantcodes@gmail.com",
  phone: "+234 123 456 7890",
  address: {
    street: "Umuezike Road",
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
    fullAddress: "Umuezike Road, Oyo State"
  },
  profileImage: "https://example.com/profile.jpg"
};

export const products = [
    {
      id: '1',
      image: require('../assets/images/product1.png'), // Make sure to add these images
      name: "iPhone 14 Pro Max",
      details: "256GB - Deep Purple",
      price: 1299.99
    },
    {
      id: '2',
      image: require('../assets/images/product2.png'),
      name: "MacBook Pro 16-inch",
      details: "M2 Pro - 32GB - Space Gray",
      price: 2499.99
    },
    {
      id: '3',
      image: require('../assets/images/product3.png'),
      name: "AirPods Pro 2",
      details: "White - Noise Cancelling",
      price: 249.99
    },
    {
      id: '4',
      image: require('../assets/images/product4.png'),
      name: "Samsung Galaxy S23 Ultra",
      details: "512GB - Phantom Black",
      price: 1199.99
    },
  ];