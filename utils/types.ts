    
import { ImageSourcePropType } from 'react-native';
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  profileImage?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  CartStack: undefined;
};


export interface ProductCardProps {
  id: string;
  image: ImageSourcePropType;
  name: string;
  price: number;
  handlePress: () => void;
}
