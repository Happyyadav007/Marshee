import React, { useState } from "react";
import { registerWithEmailApi, sendOtpApi , verifyOtpApi } from "../../api/auth";

export default function Signup() {
  const [mode, setMode] = useState("email");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.phone) {
      alert("Please enter your phone number");
      return;
    }
    console.log("form before sending otp:-", form)
    const res = await sendOtpApi(form);
    if (res.success) {
      setOtpSent(true);
      alert("OTP sent successfully");
    } else {
      alert(res.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "email") {
        console.log("form:-", form);
      // Email signup
      const res = await registerWithEmailApi(form);
      console.log("res:-", res);
      if (res.success) {
        alert("Registered successfully!");
      } else {
        alert(res.message || "Signup failed");
      }
    } else {
      // Phone signup with OTP
      if (!otpSent) {
        await handleSendOtp();
      } else {
        const res = await verifyOtpApi(form);
        if (res.success) {
          alert("Phone number verified and registered!");
        } else {
          alert(res.message || "OTP verification failed");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>

        {/* toggle */}
        <div className="flex mb-6">
          <button
            onClick={() => setMode("email")}
            className={`flex-1 py-2 rounded-l-md font-medium ${
              mode === "email" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`flex-1 py-2 rounded-r-md font-medium ${
              mode === "phone" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {mode === "email" ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
              >
                Sign Up with Email
              </button>
            </>
          ) : (
            <>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              {otpSent && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
              >
                {otpSent ? "Verify & Sign Up" : "Send OTP"}
              </button>
            </>
          )}
        </form>
         <p className="text-center text-sm mt-4 text-white">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400">
            Login
          </a>
        </p>
      </div>

    </div>
  );
}
