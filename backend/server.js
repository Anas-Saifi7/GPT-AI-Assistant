const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes'); 

const passport = require("passport");
require("./config/passport");

const app = express();

ConnectDB();

//  Correct middleware order
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});