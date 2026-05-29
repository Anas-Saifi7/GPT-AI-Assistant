const express = require("express");
const { register, login, forgotPassword, resetPassword, getProfile, updateProfile } = require("../controllers/authController");
const authmiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const passport = require("passport");

router.post("/signup",register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Step 1: Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
       { expiresIn: "7d" }
    );
       const user = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };

    // redirect to frontend with token
      res.redirect(
      `${process.env.CLIENT_URL}/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  }
);

router.get("/profile", authmiddleware, getProfile);
router.put("/profile", authmiddleware, updateProfile);

module.exports = router;