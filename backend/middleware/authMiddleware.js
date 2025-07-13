// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   // Get the token from the Authorization header
//   const token = req.header("Authorization")?.split(" ")[1]; // Expected format: "Bearer <token>"

//   if (!token) {
//     return res.status(403).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user info (e.g., ID) to the request
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid or expired token." });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const User = mongoose.model("User");

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in, token not provided." });
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(_id);

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Authentication error:", err.message);
        res.status(401).json({ error: "You must be logged in, token invalid or expired." });
    }
};

export default authMiddleware;
