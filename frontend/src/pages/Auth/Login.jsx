import React, { useState } from "react";
import { loginApi, sendOtpApi, verifyOtpApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.phone) {
      alert("Please enter your phone number");
      return;
    }
    const res = await sendOtpApi(form);
    if (res.success) {
      setOtpSent(true);
      alert("OTP sent successfully");
    } else {
      alert(res.message || "Failed to send OTP");
    }
  };

  const handleLogin = async () => {
    if (method === "email") {
      if (!form.email || !form.password) {
        alert("Please enter email and password");
        return;
      }

      console.log("form:-", form);
      const res = await loginApi(form);
      if (res.success) {
        alert("Logged in successfully!");
        navigate("/");
      } else {
        alert(res.message || "Login failed");
      }
    } else {
      // phone method
      if (!otpSent) {
        await handleSendOtp();
      } else {
        if (!form.otp) {
          alert("Please enter OTP");
          return;
        }
        const res = await verifyOtpApi({ phone: form.phone, otp: form.otp });
        if (res.success) {
          alert("Phone number verified and logged in!");
          navigate("/");
        } else {
          alert(res.message || "OTP verification failed");
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Toggle buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-full ${
              method === "email"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => {
              setMethod("email");
              setOtpSent(false);
              setForm({ email: "", password: "", phone: "", otp: "" });
            }}
          >
            Email
          </button>
          <button
            className={`px-4 py-2 rounded-r-full ${
              method === "phone"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => {
              setMethod("phone");
              setOtpSent(false);
              setForm({ email: "", password: "", phone: "", otp: "" });
            }}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {method === "email" ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Login
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
                className="w-full p-2 border rounded"
              />

              {otpSent && (
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                {otpSent ? "Verify & Login" : "Send OTP"}
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
