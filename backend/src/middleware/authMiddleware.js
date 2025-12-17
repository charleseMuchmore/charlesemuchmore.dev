//protect any route by adding this
const jwt = require("jsonwebtoken");
const config = require("../config");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing token" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Innvalid token" });

    try {
        req.user = jwt.verify(token, config.jwt_secret);
        next(); // allows request to continue
    } catch (err) {
        res.status(403).json({ error: "Token invalid or expired" });
    }
}

module.exports = authMiddleware;