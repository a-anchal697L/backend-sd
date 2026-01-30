# Startup Benefits Platform - Backend

A RESTful API built with Node.js, Express, and MongoDB for managing startup deals, user authentication, and claim processing.

### Core Purpose
Enable startups to discover, claim, and track exclusive SaaS deals while maintaining security through JWT authentication and role-based access control.

## 🛠 Tech Stack

### Core Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: MongoDB 6.x
- **ODM**: Mongoose 7.x
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Express Validator / Joi
- **Password Hashing**: bcryptjs

### Additional Libraries
- **CORS**: cors middleware
- **Environment Variables**: dotenv
---


## 🛣 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response 201:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isVerified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isVerified": false
    }
  }
}
```

### Deal Endpoints

#### Get All Deals
```http
GET /api/deals
Optional Query Params:
  ?category=Cloud
  ?isLocked=false
  ?isActive=true

Response 200:
{
  "success": true,
  "count": 20,
  "data": [
    {
      "_id": "...",
      "title": "AWS Cloud Credits",
      "category": "Cloud",
      "discount": "₹50,000 credits",
      "description": "...",
      "partnerName": "Amazon Web Services",
      "isLocked": true,
      "isActive": true,
      "eligibility": ["Must be an early-stage startup"],
      "claimCount": 45
    },
    ...
  ]
}
```

#### Get Single Deal
```http
GET /api/deals/:id

Response 200:
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "AWS Cloud Credits",
    ...
  }
}

Response 404:
{
  "success": false,
  "message": "Deal not found"
}
```

### Claim Endpoints

#### Create Claim
```http
POST /api/claims
Authorization: Bearer <token>
Content-Type: application/json

{
  "dealId": "64abc123..."
}

Response 201:
{
  "success": true,
  "message": "Deal claimed successfully",
  "data": {
    "claim": {
      "_id": "...",
      "user": { ... },
      "deal": { ... },
      "status": "pending",
      "claimedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}

Response 400:
{
  "success": false,
  "message": "You have already claimed this deal"
}

Response 403:
{
  "success": false,
  "message": "This deal requires account verification"
}
```

#### Check Claim Status
```http
GET /api/claims/check/:dealId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "claimed": true,
  "data": {
    "claim": { ... }
  }
}

Response 200 (not claimed):
{
  "success": true,
  "claimed": false
}
```

#### Get User's Claims
```http
GET /api/claims/user
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "deal": {
        "title": "AWS Cloud Credits",
        "discount": "₹50,000 credits",
        "partnerName": "Amazon Web Services"
      },
      "status": "approved",
      "claimedAt": "...",
      "approvedAt": "..."
    },
    ...
  ]
}
```

#### Get All Claims (Admin Only)
```http
GET /api/claims
Authorization: Bearer <admin-token>
Optional Query Params:
  ?status=pending
  ?userId=64abc123...
  ?dealId=64xyz789...

Response 200:
{
  "success": true,
  "count": 150,
  "data": [ ... ]
}
```

#### Update Claim Status (Admin Only)
```http
PUT /api/claims/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "approved"
}

Response 200:
{
  "success": true,
  "message": "Claim status updated",
  "data": { ... }
}
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+ (local or Atlas)
- Git

### Installation Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example 

# 4. Configure environment variables
# Edit .env with your MongoDB URI, JWT secret, etc.

# 5. Start development server
npm run dev

# Server should be running on http://localhost:5000
```

##  Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/startup-deals
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/startup-deals

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

```
---

## 🔒 Security Considerations

### Implemented Security Measures

#### 1. Password Security
```javascript
// Bcrypt with 10 rounds (2^10 iterations)
// Secure against brute force attacks
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

#### 2. JWT Security
```javascript
// Token payload contains only user ID
// Short expiration time (7 days)
// Secret key stored in environment variable
const token = jwt.sign({ id: userId }, JWT_SECRET, {
  expiresIn: '7d'
});
```

#### 3. Input Validation
```javascript
// Validate all user inputs
// Sanitize data before database queries
// Use Mongoose schema validation
```

#### 4. CORS Configuration
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```
