import images from "../utils/images";
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
      image: images.iphone, // Make sure to add these images
      name: "Apple iPhone 16 128GB|Teal",
      details: " This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers. There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length. This product will have a battery which exceeds 80% capacity relative to new.  Accessories will not be original, but will be compatible and fully functional. Product may come in generic Box. This product is eligible for a replacement or refund within 90 days of receipt if you are not satisfied.",
      price: 7000.00
    },
    {
      id: '2',
      image: images.macbook,
      name: "M4 Macbook Air 13” 256GB|Sky blue",
      details: "Apple M4 chip with 8-core CPU, 10-core GPU, and 16-core Neural Engine. ",
      price: 1000.00
    },
    {
      id: '3',
      image: images.airpod,
      name: "Apple Airpods 4 Active Noise Cancellation|Teal",
      details: "Active Noise Cancellation, Transparency mode, and Adaptive Transparency",
      price: 129.00
    },
    {
      id: '4',
      image: images.pixel,
      name: "Google Pixel 9A 128GB|Iris",
      details: "The Google Pixel 9A is a smartphone that combines cutting-edge technology with a sleek design. It features a stunning 6.2-inch OLED display, powered by the latest Google Tensor G3 chip for lightning-fast performance. With 128GB of storage, you'll have plenty of space for your apps, photos, and videos. The Pixel 9A also boasts an impressive camera system, including a 50MP main sensor and a 12MP ultra-wide lens, ensuring you capture every moment in stunning detail. Plus, with its long-lasting battery and fast charging capabilities, you can stay connected all day long.",
      price: 499.00
    },
  ];