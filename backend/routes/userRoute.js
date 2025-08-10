import express from 'express'
import { Router } from "express";
import { login, registerWithEmail, sendOtp, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post("/registerWithEmail", registerWithEmail);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;