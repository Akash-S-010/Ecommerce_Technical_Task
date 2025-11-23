# E-commerce Technical Task

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application with modern features including Google OAuth authentication, product filtering, shopping cart, and payment integration.

## 🚀 Live Demo

- **Frontend:** [https://ecommerce-technical-task.vercel.app](https://ecommerce-technical-task.vercel.app)
- **Backend:** [https://ecommerce-technical-task.onrender.com](https://ecommerce-technical-task.onrender.com)

## 📋 Table of Contents

- [Technologies Used](#technologies-used)
- [Features & Functionalities](#features--functionalities)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

---

## 🛠️ Technologies Used

### Frontend (Client)

| Technology              | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| **React 19**            | UI library for building interactive user interfaces |
| **Vite**                | Fast build tool and development server              |
| **React Router DOM**    | Client-side routing and navigation                  |
| **Zustand**             | Lightweight state management                        |
| **Tailwind CSS 4**      | Utility-first CSS framework for styling             |
| **Axios**               | HTTP client for API requests                        |
| **React Hot Toast**     | Toast notifications for user feedback               |
| **@react-oauth/google** | Google OAuth 2.0 authentication                     |
| **Lucide React**        | Modern icon library                                 |
| **Razorpay**            | For Payment Gateway                                 |

### Backend (Server)

| Technology              | Purpose                               |
| ----------------------- | ------------------------------------- |
| **Node.js**             | JavaScript runtime environment        |
| **Express.js**          | Web application framework             |
| **MongoDB**             | NoSQL database                        |
| **Mongoose**            | MongoDB object modeling               |
| **JWT**                 | JSON Web Tokens for authentication    |
| **bcryptjs**            | Password hashing                      |
| **Google Auth Library** | Server-side Google OAuth verification |
| **Razorpay**            | Payment gateway integration           |
| **Nodemailer**          | Email service for OTP verification    |
| **CORS**                | Cross-Origin Resource Sharing         |
| **Cookie Parser**       | HTTP cookie parsing                   |
| **Dotenv**              | Environment variable management       |

---

## ✨ Features & Functionalities

### 1. Authentication & Authorization

#### Email/Password Authentication

- User registration with email verification via OTP send to mail
- Secure login with JWT-based authentication
- Password hashing using bcrypt
- Protected routes with authentication middleware
- Session management with HTTP-only cookies

#### Google OAuth 2.0

- One-click signup/login with Google
- Automatic account creation for new Google users
- Account linking for existing email users
- Client-side OAuth flow using `@react-oauth/google`
- Server-side token verification

### 2. Product Management

#### Product Listing

- Grid view with responsive design (1-4 columns based on screen size)
- Product cards with images, pricing, ratings, and delivery info
- Loading states and error handling

#### Advanced Filtering

- **Search:** Real-time search by product title, brand, or category
- **Category Filter:** Filter by Electronics, Fashion, etc.
- **Brand Filter:** Multi-select brand filtering
- **Price Range:** Predefined price range filters
- **Sorting:** Featured, Price (Low to High), Price (High to Low), Newest

### 3. Shopping Cart

- Add/remove products
- Update quantities (1-9 items)
- Real-time subtotal calculation
- Cart persistence using Zustand
- Cart badge on header showing item count
- Empty cart state with "Continue Shopping" CTA

### 4. Checkout & Payment

#### Checkout Flow

- Address selection from saved addresses
- Payment method selection (COD / Razorpay)
- Order summary with item details
- Order review before placement

#### Payment Integration

- **Cash on Delivery (COD):** Direct order placement
- **Razorpay:** Secure online payments
  - UPI, Credit/Debit Cards, NetBanking
  - Payment verification and status tracking

### 5. User Profile & Address Management

- Profile information update (name, mobile)
- Multiple address management (Add, Edit, Delete)
- Address labels (Home, Office, Other)
- Default address selection

### 6. Order Management

- Order history with order details
- Order status tracking
- View ordered products with quantities
- Order date and total amount display

---

## 📁 Project Structure

**Client Directory:**

- public/ - Static assets
- src/api/ - API service layer
- src/components/ - Reusable React components
- src/config/ - Configuration files (axios)
- src/data/ - Static data
- src/pages/ - Page components
- src/store/ - Zustand state management
- App.jsx - Main App component
- main.jsx - Entry point

**Server Directory:**

- src/config/ - Database and configuration
- src/controllers/ - Route controllers
- src/middlewares/ - Custom middlewares
- src/models/ - Mongoose schemas
- src/routes/ - API routes
- src/utils/ - Utility functions
- server.js - Entry point

---

## 🗺️ Pages & Routes

### Frontend Routes

| Route                | Page Component          | Description                                | Auth Required |
| -------------------- | ----------------------- | ------------------------------------------ | ------------- |
| `/`                  | `Home.jsx`              | Homepage with hero slider, product scrolls | No            |
| `/login`             | `Login.jsx`             | Login with email/password or Google OAuth  | No            |
| `/signup`            | `Signup.jsx`            | User registration with OTP verification    | No            |
| `/verify-otp`        | `VerifyOtp.jsx`         | OTP verification page                      | No            |
| `/products`          | `Products.jsx`          | Product listing with filters and sorting   | No            |
| `/product/:id`       | `ProductDetails.jsx`    | Individual product details                 | No            |
| `/cart`              | `CartPage.jsx`          | Shopping cart with items and subtotal      | No            |
| `/checkout`          | `CheckoutPage.jsx`      | Checkout with address and payment          | **Yes**       |
| `/order-success/:id` | `OrderSuccess.jsx`      | Order confirmation page                    | **Yes**       |
| `/orders`            | `OrderHistoryPage.jsx`  | User's order history                       | **Yes**       |
| `/manage-address`    | `AddressManagement.jsx` | Manage delivery addresses                  | **Yes**       |
| `/add-product`       | `AddProductPage.jsx`    | Add new product (admin/seller)             | **Yes**       |

### Backend API Endpoints

#### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| GET    | `/test`            | Server health check         | No            |
| POST   | `/auth/signup`     | Register new user           | No            |
| POST   | `/auth/verify-otp` | Verify OTP for email        | No            |
| POST   | `/auth/login`      | Login with email/password   | No            |
| POST   | `/auth/google`     | Google OAuth authentication | No            |
| GET    | `/auth/me`         | Get current user            | **Yes**       |
| PUT    | `/auth/profile`    | Update user profile         | **Yes**       |
| POST   | `/auth/logout`     | Logout user                 | **Yes**       |

#### Product Routes (`/api/products`)

| Method | Endpoint        | Description                   | Auth Required |
| ------ | --------------- | ----------------------------- | ------------- |
| GET    | `/products`     | Get all products with filters | No            |
| POST   | `/products`     | Create new product            | **Yes**       |
| GET    | `/products/:id` | Get product by ID             | No            |

#### Cart Routes (`/api/cart`)

| Method | Endpoint           | Description               | Auth Required |
| ------ | ------------------ | ------------------------- | ------------- |
| GET    | `/cart`            | Get user's cart           | **Yes**       |
| POST   | `/cart`            | Add item to cart          | **Yes**       |
| PUT    | `/cart/:productId` | Update cart item quantity | **Yes**       |
| DELETE | `/cart/:productId` | Remove item from cart     | **Yes**       |

#### Address Routes (`/api/address`)

| Method | Endpoint       | Description     | Auth Required |
| ------ | -------------- | --------------- | ------------- |
| POST   | `/address`     | Add new address | **Yes**       |
| PUT    | `/address/:id` | Update address  | **Yes**       |
| DELETE | `/address/:id` | Delete address  | **Yes**       |

#### Order Routes (`/api/orders`)

| Method | Endpoint      | Description       | Auth Required |
| ------ | ------------- | ----------------- | ------------- |
| GET    | `/orders`     | Get user's orders | **Yes**       |
| POST   | `/orders`     | Place new order   | **Yes**       |
| GET    | `/orders/:id` | Get order details | **Yes**       |

#### Payment Routes (`/api/payment`)

| Method | Endpoint                | Description             | Auth Required |
| ------ | ----------------------- | ----------------------- | ------------- |
| GET    | `/payment/razorpay-key` | Get Razorpay public key | **Yes**       |
| POST   | `/payment/verify`       | Verify Razorpay payment | **Yes**       |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Cloud Console account (for OAuth)
- Razorpay account (for payments)

### Local Development Setup

#### 1. Clone the Repository

Clone the repository:

- git clone https://github.com/Akash-S-010/Ecommerce_Technical_Task.git
- cd Ecommerce_Technical_Task

#### 2. Setup Backend

Navigate to server directory and install dependencies:

- cd server
- npm install

Create `.env` file in `server/` directory with the following variables:

**Server Configuration:**

- PORT=5001
- NODE_ENV=development

**Client URL:**

- CLIENT_URL=http://localhost:5173

**Database:**

- MONGO_URI=your_mongodb_connection_string

**JWT Secret:**

- JWT_SECRET=your_jwt_secret_key

**Google OAuth:**

- GOOGLE_CLIENT_ID=your_google_client_id

**Email Configuration:**

- EMAIL_USER=your_email@gmail.com
- EMAIL_PASS=your_email_app_password

**Razorpay:**

- RAZORPAY_KEY_ID=your_razorpay_key_id
- RAZORPAY_KEY_SECRET=your_razorpay_key_secret

Start the server:

- npm run dev

Server runs on `http://localhost:5001`

#### 3. Setup Frontend

Navigate to client directory and install dependencies:

- cd client
- npm install

Create `.env` file in `client/` directory with:

- VITE_API_URL=http://localhost:5001/api
- VITE_GOOGLE_CLIENT_ID=your_google_client_id

Start the client:

- npm run dev

Client runs on `http://localhost:5173`

#### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add Authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `https://your-vercel-app.vercel.app` (production)
6. Copy Client ID and add to both `.env` files

---

## 🌍 Deployment

### Frontend (Vercel)

Build the client:

- cd client
- npm run build

Deploy to Vercel and set environment variables:

- VITE_API_URL
- VITE_GOOGLE_CLIENT_ID

### Backend (Render)

Deploy to Render and set environment variables:

- MONGO_URI
- JWT_SECRET
- GOOGLE_CLIENT_ID
- CLIENT_URL
- EMAIL_USER, EMAIL_PASS
- RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

---

## 📝 Key Implementation Details

### State Management

- **Zustand stores:** `useAuthStore`, `useCartStore`
- Persistent cart data across sessions
- Global authentication state

### Authentication Flow

1. User enters email/password → Server validates → Sends OTP via email
2. User enters OTP → Server verifies → Creates JWT token → Sets HTTP-only cookie
3. Protected routes check for valid JWT token via middleware

### Google OAuth Flow

1. User clicks "Login with Google" → Google consent screen
2. Google returns credential token → Sent to backend
3. Backend verifies token with Google → Creates/finds user → Returns JWT

### Cart Management

- Cart stored in MongoDB per user
- Real-time updates on add/remove/quantity change
- Cart count displayed in header badge

---

## 🤝 Contributing

This is a technical task project. For any issues or suggestions, please create an issue in the repository.

---

## 📄 License

This project is created as a technical assessment task.

---

## 👨‍💻 Author

**Akash S**

- GitHub: [@Akash-S-010](https://github.com/Akash-S-010)
- Project: [Ecommerce Technical Task](https://github.com/Akash-S-010/Ecommerce_Technical_Task)

---

## 📸 Screenshots

### Homepage

![Homepage](docs/screenshots/home.png)

### Product Listing with Filters

![Products](docs/screenshots/products.png)

### Shopping Cart

![Cart](docs/screenshots/cart.png)

### Checkout

![Checkout](docs/screenshots/checkout.png)

---

**Built with ❤️ using MERN Stack**
