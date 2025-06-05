# AlphaTwelve - E-commerce App

A modern and intuitive React Native e-commerce application with elegant animations, seamless navigation, and a responsive UI design.

## 📱 Features

- Smooth Animation System: Engaging micro-interactions and transitions across all screens
- Product Catalog: Browse products with responsive grid layout
- Product Details: Comprehensive product information with images and specifications
- Shopping Cart: Add/remove items with quantity management
- Favorites: Save and organize items for later

## 🛠 Technology Stack

- React Native: Cross-platform mobile application development
- Expo: Streamlined development workflow
- **TypeScript: : Type safety for robust development**
- React Navigation: Tab and stack navigation system
- Animated API: Native animations with performance optimizations
- Context API: State management for cart and favorites
- FlashList: High-performance lists with optimized rendering

## 📦 Few Custom Components and Usage Examples

### ProductCard

A reusable component for displaying product information.

```tsx
<ProductCard
  id="1"
  image={productImage}
  name="Product Name"
  price={199.99}
  handlePress={() => handleProductPress("1")}
/>
```

### Header

A versatile header component with customizable options.

```tsx
<Header
  searchBarShow={true}
  onSearchChange={handleSearch}
  searchPlaceholder="Search..."
  showActionContainer={true}
  actionTitle="Technology"
  onActionPress={handleBackAction}
/>
```

### CartCard

Displays cart items with quantity controls.

```tsx
<CartCard
  id="1"
  image={productImage}
  name="Product Name"
  price={199.99}
  onRemove={handleRemoveItem}
  onUpdateQuantity={handleUpdateQuantity}
  quantity={2}
/>
```

### SVG Components

Several custom SVG components for icons:

- Home
- Cart
- Favourites
- Profile
- Bell
- Minus
- Plus
- Search

Usage example:

```tsx
<Cart width={24} height={24} color={colors.gray2} />
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/covenantcodes/alphatwelve.git
```

2. Install dependencies:

```bash
cd alphatwelve
npm install
```

3. Start the development server:

```bash
npx expo start
```

## 📁 Project Structure

```
alphatwelve/
├── assets/
│   └── images/
├── components/
│   ├── ProductCard.tsx
│   ├── CartCard.tsx
    ├── Header.tsx
│   └── svgs/
├── screens/
│   ├── Home/
│   ├── Products/
    ├── Cart/
    ├── Favorites/
│   └── Profile/
├── utils/
│   ├── colors.ts
│   └── fonts.ts
├── context/
│   ├── CartContext.tsx
│   └── FavoritesContext.tsx
└── data/
    └── data.ts
```

## 🎨 Styling

The app uses a consistent design system with:

- Custom color palette (`utils/colors.ts`)
- Custom font families and sizes (`utils/fonts.ts`)
- Consistent spacing and border radius
- Smooth animations and transitions

## 📱 Screen Components

### Home Screen

Main product browsing screen with:

- Featured products grid
- Category title
- Search functionality
- Animated product cards

### Product Details Screen

Displays product information:

- Product Images
- Price and Description
- Add to cart functionality
- Add to favorites option

### Cart Screen

Shopping cart management:

- List of added products
- Quantity adjustment
- Remove items
- Empty cart state with animations

### Favorites Screen

Shopping cart management:

Saved products display:

- Grid layout of favorited items
- Quick navigation to product details
- Empty state with animations

### Profile Screen (in development)

User profile interface:

- User information
- Coming soon features
- Under development indicators

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Covenant Ifeoluwa

### Built with ❤️ using React Native and Expo
