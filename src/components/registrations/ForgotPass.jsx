import React, { useState } from "react";
import "../layouts/signIn.css";
import { motion } from "framer-motion";
import { SectionWrapper } from "../HOC";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";

// Firebase
import { auth } from "../database/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email for a password reset link.");
      navigate("/signin"); // Redirect to sign-in page after sending email
    } catch (error) {
      setError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
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
              <h1 className={`${styles.paragraphHeadText}`}>
                Forgot Your Password?
              </h1>
              <p className={`${styles.paragraphSubText} text-center`}>
                Send your gmail to change password
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
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
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <button
                type="submit"
                className="primary-btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none"
              >
                Submit
              </button>
            </form>
            <div className="button-grid">
              <button
                onClick={() => navigate("/signup")}
                className="pass"
              >
                Sign Up &nbsp; |
              </button>
              <button
                onClick={() => navigate("/login")}
                className="pass"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(ForgotPass);