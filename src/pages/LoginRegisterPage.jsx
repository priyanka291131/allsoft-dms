import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/bg.png";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === formData.email)) {
      alert("Email already registered!");
      return;
    }
    users.push({ username: formData.username, email: formData.email, password: formData.password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");
    setIsLogin(true);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (user) {
      setCurrentUser(user);
      setShowOTP(true);
      setFormData({ ...formData, password: "" });
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSendOTP = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }
    setOtpSent(true);
    alert(`OTP sent successfully to ${mobileNumber}`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpInput === "1234") {
      alert(`Login successful! Welcome ${currentUser.username}`);
      navigate("/dashboard");
    } else alert("Invalid OTP");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12">
        {/* Hero Section */}
<motion.div
  className="lg:w-1/2 text-white mb-12 lg:mb-0"
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h1 className="text-6xl lg:text-7xl font-extrabold drop-shadow-lg mb-4 font-sans">
    allsoft<sup className="text-2xl align-super">®</sup>
  </h1>

  <motion.p
    className="text-3xl lg:text-4xl font-semibold drop-shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    Welcome to <span className="text-blue-400 font-bold">allsoft</span>, 
    <br />your ultimate <span className="italic text-yellow-300">Document Management System</span>
  </motion.p>

  <motion.p
    className="mt-6 text-lg lg:text-xl opacity-80 font-serif"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    Effortlessly organize, secure, and access all your files anytime, anywhere.  
    Experience a smarter way to manage your documents with <span className="text-blue-400 font-medium">allSoft DMS</span>.
  </motion.p>
 
</motion.div>

        {/* Login/Register Card */}
        <motion.div
          className="lg:w-1/2 w-full max-w-md bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {!showOTP ? (
            <>
              <h2 className="text-4xl font-bold mb-6 text-center">{isLogin ? "Login" : "Register"}</h2>
              <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {isLogin ? "Login" : "Register"}
                </button>
              </form>
              <p className="mt-4 text-center text-gray-700">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span onClick={() => setIsLogin(!isLogin)} className="text-blue-600 cursor-pointer hover:underline">
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
              {!otpSent ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleSendOTP}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <p className="text-green-700 font-medium text-center">
                    OTP sent successfully to {mobileNumber}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Verify OTP
                  </button>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
