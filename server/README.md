# Server - E-commerce Backend API

RESTful API built with Node.js, Express, and MongoDB for the e-commerce application with JWT authentication, Google OAuth, and Razorpay payment integration.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js 4** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Google Auth Library** - Google OAuth verification
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests
- **Cookie Parser** - Cookie handling
- **Dotenv** - Environment variables

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │
│   ├── controllers/           # Route controllers
│   │   ├── addressController.js    # Address CRUD operations
│   │   ├── authController.js       # Authentication logic
│   │   ├── cartController.js       # Cart management
│   │   ├── orderController.js      # Order processing
│   │   ├── paymentController.js    # Payment handling
│   │   └── productController.js    # Product operations
│   │
│   ├── middlewares/
│   │   └── checkAuth.js       # JWT verification middleware
│   │
│   ├── models/                # Mongoose schemas
│   │   ├── Cart.js            # Cart schema
│   │   ├── Order.js           # Order schema
│   │   ├── Product.js         # Product schema
│   │   └── User.js            # User schema
│   │
│   ├── routes/                # API routes
│   │   ├── addressRoutes.js   # /api/address
│   │   ├── authRoutes.js      # /api/auth
│   │   ├── cartRoutes.js      # /api/cart
│   │   ├── index.js           # Route aggregator
│   │   ├── orderRoutes.js     # /api/orders
│   │   ├── paymentRoutes.js   # /api/payment
│   │   └── productRoutes.js   # /api/products
│   │
│   └── utils/                 # Utility functions
│       ├── mailer.js          # Email sending utility
│       └── Token.js           # JWT generation/verification
│
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
├── server.js                  # Entry point
└── README.md                  # This file
```

## 🗄️ Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed, optional for Google users),
  mobile: String,
  googleId: String (for Google OAuth),
  otp: String,
  otpExpiresAt: Date,
  isVerified: Boolean,
  addresses: [AddressSchema],
  orders: [ObjectId ref Order],
  timestamps: true
}
```

### Product Model

```javascript
{
  Title: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  brand: String (required),
  stock: Number,
  images: [String],
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  reviews: [ReviewSchema],
  timestamps: true
}
```

### Cart Model

```javascript
{
  user: ObjectId (ref User, required),
  items: [{
    product: ObjectId (ref Product),
    quantity: Number
  }],
  timestamps: true
}
```

### Order Model

```javascript
{
  user: ObjectId (ref User, required),
  items: [{
    product: ObjectId (ref Product),
    quantity: Number
  }],
  address: AddressSchema (required),
  totalPrice: Number (required),
  paymentType: String (enum: ['COD', 'Razorpay']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  orderStatus: String (enum: ['processing', 'shipped', 'delivered']),
  timestamps: true
}
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint      | Description       | Request Body                | Response                   |
| ------ | ------------- | ----------------- | --------------------------- | -------------------------- |
| POST   | `/signup`     | Register new user | `{ name, email, password }` | `{ message, userId }`      |
| POST   | `/verify-otp` | Verify OTP        | `{ email, otp }`            | `{ message, user, token }` |
| POST   | `/login`      | Login             | `{ email, password }`       | `{ message, user, token }` |
| POST   | `/google`     | Google OAuth      | `{ credential }`            | `{ message, user, token }` |
| GET    | `/me`         | Get current user  | -                           | `{ user }`                 |
| PUT    | `/profile`    | Update profile    | `{ name, mobile }`          | `{ message, user }`        |
| POST   | `/logout`     | Logout            | -                           | `{ message }`              |

### Products (`/api/products`)

| Method | Endpoint | Description       | Request Body                                                    | Response      |
| ------ | -------- | ----------------- | --------------------------------------------------------------- | ------------- |
| GET    | `/`      | Get all products  | Query: `?search=&category=&brand=&priceRange=`                  | `[products]`  |
| POST   | `/`      | Create product    | `{ Title, description, price, category, brand, stock, images }` | `{ product }` |
| GET    | `/:id`   | Get product by ID | -                                                               | `{ product }` |

### Cart (`/api/cart`)

| Method | Endpoint      | Description     | Request Body              | Response                            |
| ------ | ------------- | --------------- | ------------------------- | ----------------------------------- |
| GET    | `/`           | Get user cart   | -                         | `{ items, totalItems, totalPrice }` |
| POST   | `/`           | Add to cart     | `{ productId, quantity }` | `{ message, cart }`                 |
| PUT    | `/:productId` | Update quantity | `{ quantity }`            | `{ message, cart }`                 |
| DELETE | `/:productId` | Remove item     | -                         | `{ message, cart }`                 |

### Address (`/api/address`)

| Method | Endpoint | Description    | Request Body                                       | Response                 |
| ------ | -------- | -------------- | -------------------------------------------------- | ------------------------ |
| POST   | `/`      | Add address    | `{ label, street, city, state, pincode, country }` | `{ message, addresses }` |
| PUT    | `/:id`   | Update address | `{ label, street, city, state, pincode, country }` | `{ message, addresses }` |
| DELETE | `/:id`   | Delete address | -                                                  | `{ message, addresses }` |

### Orders (`/api/orders`)

| Method | Endpoint | Description       | Request Body                      | Response                     |
| ------ | -------- | ----------------- | --------------------------------- | ---------------------------- |
| GET    | `/`      | Get user orders   | -                                 | `[orders]`                   |
| POST   | `/`      | Place order       | `{ items, address, paymentType }` | `{ order, razorpayOrderId }` |
| GET    | `/:id`   | Get order details | -                                 | `{ order }`                  |

### Payment (`/api/payment`)

| Method | Endpoint        | Description    | Request Body                                        | Response      |
| ------ | --------------- | -------------- | --------------------------------------------------- | ------------- |
| GET    | `/razorpay-key` | Get public key | -                                                   | `{ key }`     |
| POST   | `/verify`       | Verify payment | `{ orderId, razorpayPaymentId, razorpaySignature }` | `{ message }` |

## 🔐 Authentication & Authorization

### JWT Authentication

- Tokens generated on successful login/signup
- Stored in HTTP-only cookies
- Verified using middleware on protected routes

```javascript
// Middleware: checkAuth.js
export default (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

### Google OAuth Flow

1. Frontend receives Google credential token
2. Backend verifies token with Google Auth Library
3. Extracts user info (email, name, googleId)
4. Creates new user or links to existing account
5. Returns JWT token

```javascript
// authController.js - googleAuth()
const ticket = await client.verifyIdToken({
  idToken: credential,
  audience: process.env.GOOGLE_CLIENT_ID,
});
const payload = ticket.getPayload();
```

## 📧 Email Service

### Nodemailer Configuration

```javascript
// utils/mailer.js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp, subject) => {
  // Send email with HTML template
};
```

## 💳 Payment Integration

### Razorpay Setup

1. Create Razorpay order on backend
2. Return order ID to frontend
3. Frontend opens Razorpay checkout
4. Verify payment signature on backend

```javascript
// orderController.js
const razorpayOrder = await razorpay.orders.create({
  amount: totalPrice * 100, // paise
  currency: "INR",
  receipt: order._id.toString(),
});
```

## 🌍 CORS Configuration

```javascript
// server.js
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Gmail account (for SMTP)
- Razorpay account (for payments)
- Google Cloud project (for OAuth)

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file:

```env
# Server
PORT=5001
NODE_ENV=development

# Client
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5001`

### Production

```bash
npm start
```

## 🧪 Testing API

### Example: Register User

```bash
POST http://localhost:5001/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Example: Google OAuth

```bash
POST http://localhost:5001/api/auth/google
Content-Type: application/json

{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI..."
}
```

## 🔧 Middleware

### Authentication Middleware

- **checkAuth.js** - Verifies JWT token from cookies
- Attaches user info to `req.user`
- Used on protected routes

### Global Middleware

- `express.json()` - Parse JSON bodies
- `cookieParser()` - Parse cookies
- `cors(corsOptions)` - Enable CORS

## 📝 Error Handling

Consistent error responses:

```javascript
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 🌐 Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy as Web Service

Build Command: `npm install`
Start Command: `npm start`

---

**For more information, see the main project [README](../README.md)**
