# 🔌 SportsHub API Documentation

## 📋 Table of Contents
- [Base URL & Authentication](#base-url--authentication)
- [User Management](#user-management)
- [Club Management](#club-management)
- [AI Services](#ai-services)
- [Match & Challenge System](#match--challenge-system)
- [Quiz System](#quiz-system)
- [Real-time Features](#real-time-features)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🌐 Base URL & Authentication

### **Base URL**
```
Production: https://sportshub-backend.render.com
Development: http://localhost:3000
```

### **Authentication**
SportsHub uses JWT (JSON Web Tokens) for authentication. Include the token in cookies for authenticated requests.

```javascript
// Cookie-based authentication
credentials: 'include'

// Headers for file uploads
headers: {
  'Content-Type': 'multipart/form-data'
}
```

---

## 👤 User Management

### **Register User**
```http
POST /users/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "userType": "player"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "player"
  }
}
```

### **Login User**
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "player"
  }
}
```

### **Get User Profile**
```http
GET /users/profile
```

**Headers:**
```
Cookie: token=jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "player",
    "profile": {
      "age": 25,
      "height": 175,
      "weight": 70,
      "sports": ["Football", "Basketball"]
    }
  }
}
```

### **Logout User**
```http
POST /users/logout
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🏟️ Club Management

### **Get All Clubs**
```http
GET /clubs
```

**Response:**
```json
{
  "success": true,
  "clubs": [
    {
      "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "name": "Neon Blaze FC",
      "description": "Professional football club",
      "logo": "https://cloudinary.com/image.jpg",
      "owner": "64f8a1b2c3d4e5f6g7h8i9j1",
      "players": ["64f8a1b2c3d4e5f6g7h8i9j2"],
      "approved": true,
      "location": "Mumbai, India",
      "sports": ["Football"],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### **Register New Club**
```http
POST /clubs/register
```

**Request Body (multipart/form-data):**
```
name: "New Sports Club"
description: "A new sports club for athletes"
location: "Delhi, India"
sports: "Football,Basketball"
logo: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Club registered successfully",
  "club": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "New Sports Club",
    "approved": false
  }
}
```

### **Get Club Details**
```http
GET /club/:name
```

**Parameters:**
- `name`: Club name (URL encoded)

**Response:**
```json
{
  "success": true,
  "club": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "Neon Blaze FC",
    "description": "Professional football club",
    "logo": "https://cloudinary.com/image.jpg",
    "players": [
      {
        "_id": "64f8a1b2c3d4e5f6g7h8i9j2",
        "name": "Player Name",
        "position": "Forward"
      }
    ],
    "matchHistory": [],
    "achievements": ["League Winner 2023"]
  }
}
```

### **Update Club Profile**
```http
PUT /club-profile/:id
```

**Request Body:**
```json
{
  "description": "Updated club description",
  "location": "New Location",
  "socialLinks": {
    "website": "https://club.com",
    "instagram": "@clubhandle"
  }
}
```

---

## 🤖 AI Services

### **AI Guru Chat**
```http
POST /api/ai-guru-chat
```

**Request Body:**
```json
{
  "chat": [
    {
      "type": "user",
      "message": "How can I improve my football shooting?",
      "time": "Just now"
    }
  ],
  "userDetails": {
    "name": "John Doe",
    "age": 25,
    "sport": "Football",
    "height": 175,
    "weight": 70
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "To improve your football shooting accuracy, focus on these key techniques:\n\n1. **Body Position**: Keep your head up and body over the ball\n2. **Follow Through**: Ensure your kicking foot follows through toward the target\n3. **Practice**: Regular shooting drills from different angles..."
}
```

### **Posture Analysis**
```http
POST /api/ai-system/analyze-posture
```

**Request Body:**
```json
{
  "profile": {
    "name": "John Doe",
    "age": 25,
    "sport": "cricket",
    "height": 175,
    "weight": 70
  },
  "mediaType": "video",
  "landmarks": [
    {
      "name": "nose",
      "x": 320,
      "y": 240,
      "z": 0.1,
      "score": 0.95
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "overallScore": 85,
    "assessment": "Good batting stance with room for improvement",
    "metrics": {
      "posturalAlignment": {
        "score": 8,
        "notes": "Well-balanced stance"
      },
      "jointStability": {
        "score": 7,
        "notes": "Slight knee bend needed"
      }
    },
    "recommendations": [
      "Adjust your front foot position",
      "Keep your head still during the shot"
    ],
    "safetyNotes": "Ensure proper warm-up before practice"
  }
}
```

### **Generate Training Plan**
```http
POST /api/training-plans/generate
```

**Request Body:**
```json
{
  "userInfo": {
    "name": "John Doe",
    "age": 25,
    "details": "Want to improve endurance"
  },
  "sport": "Football",
  "difficulty": "Intermediate",
  "duration": "4 weeks",
  "sessions": 12
}
```

**Response:**
```json
{
  "success": true,
  "trainingPlan": {
    "planTitle": "Intermediate Football Training Plan",
    "overview": "A comprehensive 4-week training program...",
    "weeklyStructure": {
      "sessionsPerWeek": 3,
      "totalWeeks": 4,
      "restDays": 2
    },
    "sessionDetails": [
      {
        "sessionNumber": 1,
        "title": "Endurance and Ball Control",
        "duration": "60 minutes",
        "warmUp": ["10-minute light jogging"],
        "mainWorkout": ["Ball control drills", "Passing exercises"],
        "coolDown": ["Stretching routine"]
      }
    ]
  }
}
```

### **Create Custom Training Plan**
```http
POST /api/custom-training-plans/create
```

**Request Body:**
```json
{
  "planName": "My Custom Plan",
  "sport": "Football",
  "difficulty": "Beginner",
  "weeks": 4,
  "sessionsPerWeek": 3,
  "sessionDuration": 60,
  "goals": ["Improve fitness", "Learn basics"],
  "focusAreas": ["Strength", "Endurance"],
  "equipment": [
    {
      "name": "Football",
      "required": true
    }
  ],
  "isPublic": false
}
```

---

## ⚔️ Match & Challenge System

### **Create Challenge**
```http
POST /challenges/create
```

**Request Body:**
```json
{
  "targetClubId": "64f8a1b2c3d4e5f6g7h8i9j0",
  "sport": "Football",
  "proposedDate": "2024-02-15T15:00:00Z",
  "venue": "City Stadium",
  "message": "Looking forward to a great match!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Challenge sent successfully",
  "challenge": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "challengingClub": "64f8a1b2c3d4e5f6g7h8i9j1",
    "targetClub": "64f8a1b2c3d4e5f6g7h8i9j0",
    "status": "pending"
  }
}
```

### **Get My Club**
```http
GET /challenges/my-club
```

**Response:**
```json
{
  "success": true,
  "club": {
    "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "name": "My Club",
    "owner": "64f8a1b2c3d4e5f6g7h8i9j1"
  }
}
```

### **Create Match**
```http
POST /match/create
```

**Request Body:**
```json
{
  "clubA": "64f8a1b2c3d4e5f6g7h8i9j0",
  "clubB": "64f8a1b2c3d4e5f6g7h8i9j1",
  "sport": "Football",
  "scheduledFor": "2024-02-15T15:00:00Z",
  "venue": "City Stadium"
}
```

### **Update Live Score**
```http
PUT /match/:id/score
```

**Request Body:**
```json
{
  "clubAScore": 2,
  "clubBScore": 1,
  "event": "Goal scored by Player Name"
}
```

---

## 🧠 Quiz System

### **Get Quiz Questions**
```http
GET /api/quiz/questions?sport=Football&difficulty=medium&count=10
```

**Query Parameters:**
- `sport`: Sport category
- `difficulty`: easy, medium, hard
- `count`: Number of questions (default: 10)

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "_id": "64f8a1b2c3d4e5f6g7h8i9j0",
      "question": "How many players are on a football team?",
      "options": ["10", "11", "12", "9"],
      "correctAnswer": 1,
      "difficulty": "easy",
      "sport": "Football"
    }
  ]
}
```

### **Submit Quiz Answers**
```http
POST /api/quiz/submit
```

**Request Body:**
```json
{
  "playerName": "John Doe",
  "sport": "Football",
  "difficulty": "medium",
  "answers": [
    {
      "questionId": "64f8a1b2c3d4e5f6g7h8i9j0",
      "selectedAnswer": 1,
      "timeSpent": 15
    }
  ],
  "totalTime": 300
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "rank": "Good",
    "correctAnswers": 8,
    "incorrectAnswers": 2
  }
}
```

### **Get Leaderboard**
```http
GET /api/quiz/leaderboard?sport=Football&limit=10
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "playerName": "Top Player",
      "score": 95,
      "sport": "Football",
      "difficulty": "hard",
      "date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 🔴 Real-time Features (Socket.io)

### **Connection**
```javascript
const socket = io('https://sportshub-backend.render.com', {
  withCredentials: true
});
```

### **Live Match Events**

#### **Join Match Room**
```javascript
socket.emit('joinMatchRoom', {
  matchId: '64f8a1b2c3d4e5f6g7h8i9j0',
  userType: 'spectator'
});
```

#### **Live Score Update**
```javascript
// Emit (Admin only)
socket.emit('updateLiveScore', {
  matchId: '64f8a1b2c3d4e5f6g7h8i9j0',
  clubAScore: 2,
  clubBScore: 1,
  event: 'Goal by Player Name'
});

// Listen
socket.on('liveScoreUpdate', (data) => {
  console.log('Score updated:', data);
});
```

#### **Match Chat**
```javascript
// Send message
socket.emit('matchChatMessage', {
  matchId: '64f8a1b2c3d4e5f6g7h8i9j0',
  message: 'Great goal!',
  userName: 'John Doe'
});

// Receive message
socket.on('newChatMessage', (data) => {
  console.log('New message:', data);
});
```

### **Notification Events**
```javascript
// Listen for notifications
socket.on('notification', (data) => {
  console.log('New notification:', data);
});

// Listen for reminders
socket.on('reminder', (data) => {
  console.log('Match reminder:', data);
});
```

---

## ❌ Error Handling

### **Standard Error Response**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### **HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

### **Common Error Codes**
```json
{
  "INVALID_CREDENTIALS": "Invalid email or password",
  "USER_NOT_FOUND": "User not found",
  "CLUB_NOT_FOUND": "Club not found",
  "UNAUTHORIZED_ACCESS": "Access denied",
  "VALIDATION_ERROR": "Input validation failed",
  "FILE_UPLOAD_ERROR": "File upload failed",
  "AI_SERVICE_ERROR": "AI service temporarily unavailable"
}
```

---

## 🚦 Rate Limiting

### **Rate Limits**
- **General API**: 100 requests per minute
- **AI Services**: 20 requests per minute
- **File Upload**: 10 requests per minute
- **Authentication**: 5 requests per minute

### **Rate Limit Headers**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## 📝 Request Examples

### **JavaScript/Fetch**
```javascript
// GET request
const response = await fetch('/api/clubs', {
  credentials: 'include'
});
const data = await response.json();

// POST request with JSON
const response = await fetch('/api/ai-guru-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    chat: chatHistory,
    userDetails: userInfo
  })
});

// File upload
const formData = new FormData();
formData.append('logo', file);
formData.append('name', clubName);

const response = await fetch('/clubs/register', {
  method: 'POST',
  credentials: 'include',
  body: formData
});
```

### **cURL Examples**
```bash
# Login
curl -X POST https://sportshub-backend.render.com/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  -c cookies.txt

# Get clubs (with cookies)
curl -X GET https://sportshub-backend.render.com/clubs \
  -b cookies.txt

# AI Chat
curl -X POST https://sportshub-backend.render.com/api/ai-guru-chat \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"chat":[{"type":"user","message":"How to improve shooting?"}],"userDetails":{"name":"John","sport":"Football"}}'
```

---

This API documentation provides comprehensive information for integrating with the SportsHub platform. For additional support or questions, please refer to the main documentation or contact the development team.