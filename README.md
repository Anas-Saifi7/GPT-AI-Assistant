# 🚀 GPT AI Assistant

A full-stack AI-powered chatbot inspired by ChatGPT, built using React, Node.js, Express, MongoDB Atlas, JWT Authentication, Google OAuth, and Cloudflare AI.

## 🌐 Live Demo

**Frontend:** https://gpt-ai-assistant-vert-one-87.vercel.app/

**Backend API:** https://gpt-ai-assistant-6xnk.onrender.com/api

---

## 📌 Features

* 🔐 User Authentication (Signup/Login)
* 🔑 Google OAuth Login
* 🛡 JWT Authentication & Protected Routes
* 🤖 AI-Powered Chat Assistant
* 💬 Chat History Management
* 🗑 Delete Chat Conversations
* 👤 User Profile Management
* 🔒 Forgot Password & Reset Password
* ☁ MongoDB Atlas Database
* 🚀 Deployed on Vercel & Render
* 📱 Responsive UI

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* Passport.js
* JWT Authentication
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

### AI Integration

* Cloudflare AI (Llama 3.1 8B Instruct)

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```bash
GPT-AI-Assistant/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## ⚙️ Environment Variables

### Backend (.env)

```env
MONGO_URI=
JWT_SECRET=

CLIENT_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

EMAIL_USER=
EMAIL_PASS=

CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
```

### Frontend (.env)

```env
VITE_API_URL=
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Anas-Saifi7/GPT-AI-Assistant.git
cd GPT-AI-Assistant
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 👨‍💻 Author

**Anas **

* Full Stack Developer
* B.Tech CSE (AI & ML)

GitHub:
https://github.com/Anas-Saifi7

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
