//protected admin routes
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
    // req.user is available here
    res.json({ secret: "admin only content", user: req.user});
});

module.exports = router;