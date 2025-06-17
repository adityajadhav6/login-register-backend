# Backend Authentication System

A secure and scalable backend authentication system built with Node.js, Express, and MongoDB. Features user registration, login with JWT authentication, password hashing, and comprehensive error handling.

## 🚀 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **CORS**: cors middleware

## 📋 Features

### Core Features
- ✅ User Registration with validation
- ✅ User Login with credential verification
- ✅ Password hashing using bcrypt (12 rounds)
- ✅ JWT-based authentication
- ✅ Input validation and sanitization
- ✅ Comprehensive error handling
- ✅ RESTful API design

### Security Features
- 🔒 Password hashing with salt
- 🔑 JWT token authentication
- 🛡️ Input validation and sanitization
- 🚫 Duplicate email prevention
- ⏱️ Token expiration (7 days)

### Additional Features
- 🌐 CORS enabled
- 📝 Detailed API responses
- 🔄 Environment-based configuration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Method 1: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityajadhav6/login-register-backend.git
   cd user-auth-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your configurations
   # Make sure to change JWT_SECRET in production
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or start MongoDB service
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify setup**
   Open your browser and navigate to `http://localhost:3000`


## 📡 API Endpoints

### Base URL: `http://localhost:3000`

### 1. Health Check
```http
GET /
```
**Response:**
```json
{
  "success": true,
  "message": "Authentication API is running",
  "endpoints": {
    "register": "POST /api/register",
    "login": "POST /api/login",
    "profile": "GET /api/profile (requires authentication)"
  }
}
```

### 2. User Registration
```http
POST /api/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f7b1c2e8f9a1b2c3d4e5f6",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2023-09-05T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f7b1c2e8f9a1b2c3d4e5f6",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2023-09-05T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 4. Get User Profile (Protected)
```http
GET /api/profile
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "64f7b1c2e8f9a1b2c3d4e5f6",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2023-09-05T10:30:00.000Z"
    }
  }
}
```

## 🧪 Sample Test Credentials

For testing purposes, you can use these sample credentials after registering:

```json
{
  "email": "test@example.com",
  "password": "testPassword123"
}
```

**Registration Test Data:**
```json
{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "testPassword123"
}
```

## 🔧 Testing the API

### Using cURL

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "testPassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testPassword123"
  }'
```

**Access protected route:**
```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and token
3. Test each endpoint with the sample data provided above

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/auth_system` |
| `JWT_SECRET` | JWT signing secret | `fallback_secret_key` |
| `BCRYPT_ROUNDS` | bcrypt salt rounds | `12` |

### Security Considerations

- Always change `JWT_SECRET` in production
- Use strong, unique passwords
- Enable MongoDB authentication in production
- Consider rate limiting for production use
- Use HTTPS in production
- Implement proper logging and monitoring

## 🚨 Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials or missing token
- **403 Forbidden**: Invalid or expired token
- **409 Conflict**: User already exists
- **500 Internal Server Error**: Server-side errors

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🔍 Validation Rules

### Registration
- **Full Name**: Required, minimum 2 characters, trimmed
- **Email**: Required, valid email format, unique, lowercase
- **Password**: Required, minimum 6 characters

### Login
- **Email**: Required, valid format
- **Password**: Required

## 📦 Production Deployment

### Manual Deployment

1. **Install dependencies:**
   ```bash
   npm ci --only=production
   ```

2. **Set environment variables:**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=your_production_mongodb_uri
   export JWT_SECRET=your_production_jwt_secret
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

**2. Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 PID
```

**3. JWT Token Invalid**
- Ensure the JWT_SECRET matches between registration and login
- Check token expiration (7 days by default)
- Verify the Authorization header format: `Bearer <token>`


## 📊 Performance Notes

- bcrypt salt rounds set to 12 for optimal security/performance balance
- JWT tokens expire after 7 days
- MongoDB indexes on email field for fast lookups
- Connection pooling enabled for database connections
- CORS enabled for cross-origin requests

---

**Built with ❤️ using Node.js and Express.js**
