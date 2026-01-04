# ChatApp - Real-Time Chat Application

A simple real-time chat application built with the MERN stack and Socket.io.

## 🚀 Tech Stack

**Backend:**

-   Node.js + Express
-   MongoDB + Mongoose
-   Socket.io
-   JWT Authentication
-   bcrypt

**Frontend:**

-   React (Vite)
-   Tailwind CSS
-   Axios
-   Socket.io Client

## ✨ Features

-   User authentication (signup/login with JWT)
-   One-to-one real-time messaging
-   Chat history persistence
-   User list sidebar
-   Emoji picker
-   Responsive design (mobile + desktop)
-   Dark mode UI

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── socket/          # Socket.io setup
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/         # Axios config
    │   ├── components/  # React components
    │   ├── context/     # Auth context
    │   └── pages/       # Main pages
    └── ...
```

## 🛠️ Setup Instructions

### Prerequisites

-   Node.js 18+
-   MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication

-   `POST /api/auth/signup` - Create account
-   `POST /api/auth/login` - Login

### Messages (Protected)

-   `GET /api/messages/users` - Get all users
-   `GET /api/messages/:userId` - Get chat history
-   `POST /api/messages` - Send message

## 📡 Socket.io Events

-   `join-chat` - User joins their room
-   `send-message` - Send message to receiver
-   `receive-message` - Receive incoming message

## 🎯 How It Works

1. User sends message → API saves to MongoDB
2. Frontend emits `send-message` via Socket.io
3. Server emits `receive-message` to receiver's room
4. Receiver's UI updates instantly

## 📝 Environment Variables

**Backend (.env):**

-   `MONGODB_URI` - MongoDB connection string
-   `JWT_SECRET` - Secret key for JWT tokens
-   `PORT` - Server port
