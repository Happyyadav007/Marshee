import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/sendMail.js";
import Otp from "../models/Otp.js";
import { sendSms } from "../utils/sendSMS.js";
import jwt from "jsonwebtoken";

//helper function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerWithEmail = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    //validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields." });
    }

    const isUserExist = await User.find({ email });
    if (isUserExist.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters",
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

     const html = `<h2Thanks for Registering with Marshee</h2>`;
    sendMail({to: email, subject: "Registering",html:html })

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while Registering with email",
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

//send otp on phone
const sendOtp = async (req, res) => {
  try {
    const { name='', phone } = req.body;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await sendSms(phone, otp);

    await Otp.create({
      name: name,
      phone: phone,
      otp: otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: "OTP sent successfully", otp });
    } else {
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to send OTP",
          error: result.error,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Phone and OTP are required" });
    }

    // Find OTP in DB
    const otpRecord = await Otp.findOne({ phone });

    console.log("otp details:-", otpRecord);

    if (!otpRecord) {
      return res
        .status(400)
        .json({ success: false, message: "OTP not found or expired" });
    }

    // Check if expired
    if (otpRecord.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    // Check if matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    //create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        name: otpRecord.name,
        phone: phone,
      });
    }

    // delete otp
    await Otp.deleteOne({ phone });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//send otp on email
// const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("email", email);
//     if (!email) return res.status(400).json({ success: false, message: "Email is required" });

//        const isUserExist = await User.find({email})
//             if(isUserExist.length > 0){
//                 return res.status(400).json({success:true, message: "Email already exists."});
//                 }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//     await Otp.create({email, otp,  expiresAt: Date.now() + 5 * 60 * 1000})

//     // Email template
//     const html = `
//       <h2>Your OTP Code</h2>
//       <p>Your OTP is: <b>${otp}</b></p>
//       <p>This code will expire in 5 minutes.</p>
//     `;

//     // Send email
//     await sendMail({to: email, subject: "Your OTP Code", html: html});

//     return res.status(200).json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

export { registerWithEmail, login, sendOtp, verifyOtp };
