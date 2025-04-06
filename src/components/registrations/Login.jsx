import React, { useState } from "react";
import "../layouts/signIn.css";
import { motion } from "framer-motion";
import { SectionWrapper } from "../HOC";
import { useNavigate } from "react-router-dom";
import Loader from "../utility/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ReCAPTCHAWrapper from "../HOC/ReCAPTCHAWrapper";

// Firebase
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Function to check user's role from Firebase Database
import checkUserRole from "../database/admin_dashboard_auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User logged in:", user);

      checkUserRole((role) => {
        if (role === "admin") {
          if (user.email === "jess.evasco2615@gmail.com") {
            navigate("/admin_evasco");
          } else if (user.email === "nbmagalgalit@gmail.com") {
            navigate("/admin_magalgalit");
          } else if (user.email === "amorsolo960@gmail.com") {
            navigate("/admin_palmer");
          } else {
            navigate("/admin");
          }
        } else if (role === "user") {
          navigate("/main");
        } else {
          setError("Unknown role. Please contact support.");
        }
      });
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError(
        err.message.includes("wrong-password")
          ? "Incorrect password. Please try again."
          : "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div id="wrapper">
            <div id="left">
              <div id="signin">
                <div className="logo">
                  <img src="/logoLandscape.png" alt="Karapatan ko" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="text-input border-gray-300 focus:ring-slate-500 focus:border-slate-500 block w-full sm:text-sm border rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="text-input border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {showPassword ? (
                        <FaRegEye
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaRegEyeSlash
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    <a
                      onClick={() => navigate("/forgotPass")}
                      className="text-sm cursor-pointer text-slate-600 hover:text-slate-500 mt-2 block"
                    >
                      Forgot my password
                    </a>
                  </div>

                  <ReCAPTCHAWrapper
                    onChange={(token) => setRecaptchaToken(token)}
                  />
                  <br />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="primary-btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none"
                  >
                    Login
                  </button>
                </form>
                <button
                  onClick={() => navigate("/signup")}
                  className="secondary-btn"
                >
                  Don't have an account? SignUp
                </button>
              </div>
              <footer id="main-footer" className="text-sm text-gray-500 mt-4">
                <p>Copyright &copy; 2024, KarapatanKo All Rights Reserved</p>
                <div>
                  <a href="#" className="hover:underline">
                    Terms of Use
                  </a>{" "}
                  |{" "}
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(Login);
