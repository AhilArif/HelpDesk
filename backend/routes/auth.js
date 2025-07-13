import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import LoginLog from "../models/LoginLog.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import VerificationCode from "../models/VerificationCode.js";
//import crypto from "crypto";
import nodemailer from "nodemailer";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Sign-in Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;  // Expect email not name

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });  // Find by email
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const newCode = await VerificationCode.create({
      email: user.email,
      code: verificationCode,
    });

    // Delete old codes
    await VerificationCode.deleteMany({
      email: user.email,
      _id: { $ne: newCode._id },
    });

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "helpdesk@example.com", // generated ethereal example user id
        pass: "Enter you password here", // generated ethereal example password
      },
    });

    await transporter.sendMail({
      from: "helpdesk@example.com",
      to: user.email,
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}.`,
      html: `<b>Your verification code is ${verificationCode}.</b>`,
    });

    res.status(200).json({ message: "Verification code sent to email." });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Verify Code Route
router.post("/verifycode", async (req, res) => {
  const { email, code } = req.body;

  try {
    const verificationCode = await VerificationCode.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
      code: code.trim(),
    });

    if (!verificationCode) {
      return res.status(400).json({ error: "Invalid or expired code." });
    }

    const user = await User.findOne({ email });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    await VerificationCode.deleteOne({ _id: verificationCode._id });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name },
    });
  } catch (error) {
    console.error("Error during code verification:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



// nodemailer FOR Ticket Submission
export const mailer  = async function mailer(recieveremail, ticket) {


    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "helpdesk@example.com", // generated ethereal example user id
            pass: "Enter you passowrd here", // generated ethereal example password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'sender@example.com', // sender address
        to: `${recieveremail}`, // list of receivers
        cc: '', // list of hidden receivers
        subject: "Complaint Received", // Subject line
        text: `We have Received your Complain. Your Complaint Ticked is ${ticket}.`, // plain text body
        html: `<b>We have Received your Complain. Your Complaint Ticked is ${ticket}.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Save login log
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];

    await LoginLog.create({
      userId: user._id,
      email: user.email,
      ipAddress: ip,
      userAgent: userAgent,
    });

    // Return token or login response
    const token = generateToken(user._id);  
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/login-logs", async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});


// User Profile
router.get("/profile", authMiddleware ,async (req, res) => {
  try {
    const user = req.user; // User is already attached by authMiddleware

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send user details
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
