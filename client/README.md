# Client - E-commerce Frontend

React-based frontend for the e-commerce application with modern UI/UX, built using Vite, Tailwind CSS, and Zustand for state management.

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Zustand 5** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **@react-oauth/google** - Google OAuth integration
- **Lucide React** - Icon library

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service layer
│   │   ├── addressApi.js  # Address CRUD operations
│   │   ├── authApi.js     # Authentication APIs
│   │   ├── cartApi.js     # Cart management
│   │   ├── orderApi.js    # Order operations
│   │   └── productApi.js  # Product APIs
│   │
│   ├── components/        # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── cart/         # Cart components
│   │   ├── detailspage/  # Product details components
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── products/     # Product listing components
│   │   └── ui/           # Reusable UI components
│   │
│   ├── config/
│   │   └── axios.js      # Axios instance configuration
│   │
│   ├── data/             # Static data
│   │   └── ...           # Product data, categories, etc.
│   │
│   ├── pages/            # Page components
│   │   ├── AddProductPage.jsx
│   │   ├── AddressManagement.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Signup.jsx
│   │   └── VerifyOtp.jsx
│   │
│   ├── store/            # Zustand stores
│   │   ├── useAuthStore.js   # Authentication state
│   │   └── useCartStore.js   # Cart state
│   │
│   ├── App.jsx           # Main App component with routing
│   ├── index.css         # Global styles and Tailwind config
│   └── main.jsx          # Entry point with GoogleOAuthProvider
│
├── .env                  # Environment variables
├── .env.example          # Environment variables template
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🎨 Key Components

### Layout Components

- **Header.jsx** - Navigation bar with search, cart, account menu
- **Footer.jsx** - Footer with links and information
- **CategoryNav.jsx** - Category navigation bar

### Product Components

- **ProductCard.jsx** - Product card with image, price, rating
- **ProductFilters.jsx** - Filtering sidebar (categories, brands, price)
- **ProductBuyBox.jsx** - Add to cart, buy now, quantity selector
- **ProductReviews.jsx** - Product reviews and ratings

### Cart Components

- **CartItem.jsx** - Individual cart item
- **CartSubtotal.jsx** - Cart summary with proceed button

### Authentication Components

- **AuthLayout.jsx** - Layout wrapper for auth pages
- **AuthCard.jsx** - Card component for auth forms
- **GoogleButton.jsx** - Custom Google sign-in button (deprecated)

### UI Components

- **Button.jsx** - Reusable button with variants (primary, secondary, link)
- **Input.jsx** - Styled input field

## 🔄 State Management (Zustand)

### useAuthStore

```javascript
{
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Methods
  signup(userData)
  verifyOtp(otpData)
  login(credentials)
  checkAuth()
  logout()
  updateProfile(profileData)
  setUser(user)  // For Google OAuth
  addAddress(addressData)
  updateAddress(addressId, addressData)
  deleteAddress(addressId)
}
```

### useCartStore

```javascript
{
  cart: { items: [], totalItems: 0, totalPrice: 0 },
  isLoading: false,
  error: null,

  // Methods
  fetchCart()
  addToCart(productId, quantity)
  updateCartItem(productId, quantity)
  removeFromCart(productId)
}
```

## 🌐 Routes

| Path                 | Component         | Description        | Protected |
| -------------------- | ----------------- | ------------------ | --------- |
| `/`                  | Home              | Homepage           | No        |
| `/login`             | Login             | Login page         | No        |
| `/signup`            | Signup            | Registration page  | No        |
| `/verify-otp`        | VerifyOtp         | OTP verification   | No        |
| `/products`          | Products          | Product listing    | No        |
| `/product/:id`       | ProductDetails    | Product details    | No        |
| `/cart`              | CartPage          | Shopping cart      | No        |
| `/checkout`          | CheckoutPage      | Checkout           | **Yes**   |
| `/order-success/:id` | OrderSuccess      | Order confirmation | **Yes**   |
| `/orders`            | OrderHistoryPage  | Order history      | **Yes**   |
| `/manage-address`    | AddressManagement | Address CRUD       | **Yes**   |
| `/add-product`       | AddProductPage    | Add product        | **Yes**   |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Development

```bash
npm run dev
```

App runs on `http://localhost:5173`

### Build

```bash
npm run build
```

Output in `dist/` folder

### Preview Production Build

```bash
npm run preview
```

## 📦 API Integration

All API calls are centralized in the `src/api/` directory using Axios instance with:

- Base URL from environment variable
- Credentials included for cookies
- Consistent error handling

Example:

```javascript
// src/config/axios.js
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  withCredentials: true,
});
```

## 🎨 Styling System

### Tailwind CSS Configuration

- Custom color palette:
  - `--color-amazon-orange`: #FFD814
  - `--color-amazon-navbar`: #131921
  - `--color-amazon-link`: #007185
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Custom animations: `fadeInUp`, `checkmark-circle`

### Reusable Button Component

```jsx
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="link">Learn More</Button>
```

## 🔒 Authentication Flow

1. **Email/Password:**

   - Signup → OTP Email → Verify OTP → Login
   - Login → Credentials Check → JWT Cookie

2. **Google OAuth:**
   - Google Sign-In → Credential Token → Backend Verification → JWT Cookie

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Hamburger menu for mobile navigation
- Collapsible filters on mobile

## 🔧 Configuration Files

- **vite.config.js** - Vite build configuration with React plugin
- **vercel.json** - SPA routing configuration for Vercel deployment
- **index.css** - Tailwind directives and custom CSS

## 📝 Code Quality

- ESLint for code linting
- Component-based architecture
- Separation of concerns (components, pages, api, store)
- Consistent naming conventions

## 🌐 Deployment (Vercel)

```bash
npm run build
```

Deploy to Vercel with environment variables:

- `VITE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`

---

**For more information, see the main project [README](../README.md)**
