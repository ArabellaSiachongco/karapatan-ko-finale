import React, { useState } from "react";
import "../layouts/signIn.css";
import { motion } from "framer-motion";
import { SectionWrapper } from "../HOC";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import Loader from "../utility/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Firebase
import { auth, db } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import ReCAPTCHAWrapper from "../HOC/ReCAPTCHAWrapper";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user"); // Pre-filled role

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validations
    if (!firstName || !lastName || !age || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (parseInt(age, 10) < 18 || parseInt(age, 10) > 80) {
      setError("You must be at least 18 years old to sign up.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    setError(""); // Clear errors
    setLoading(true); // Show loader

    // Convert email to lowercase before using it
    const normalizedEmail = email.toLowerCase();

    try {
      // Create user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        middleName,
        lastName,
        age: parseInt(age, 10),
        email: normalizedEmail,
        role,
        createdAt: new Date(),
      });

      console.log("User registered and data saved to Firestore!");
      navigate("/main"); // Redirect to user layout
    } catch (err) {
      console.error("Error signing up:", err.message);
      setError(
        err.message.includes("email-already-in-use")
          ? "This email is already registered. Log in instead."
          : "Failed to sign up. Please try again."
      );
    } finally {
      setLoading(false); // Hide loader
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
          <div id="register">
            <div id="wrapper">
              <div id="left">
                <div id="signin">
                  <div className="logo">
                    <h1 className={`${styles.paragraphHeadText}`}>
                      Create an account
                    </h1>
                    <p className={`${styles.paragraphSubText} text-center`}>
                      Connect with legal professionals
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="text-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="middleName">Middle Name</label>
                      <input
                        type="text"
                        id="middleName"
                        className="text-input"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="text-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        id="age"
                        className="text-input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="text-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="text-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {showPassword ? (
                          <FaRegEye
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <FaRegEyeSlash
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                    <div style={{ display: "none" }} value={role}>
                      <label htmlFor="role">Role</label>
                      <input type="text" id="role" className="text-input" />
                    </div>
                    <ReCAPTCHAWrapper
                      onChange={(token) => setRecaptchaToken(token)}
                    />
                    <br />
                    {error && (
                      <p className="error-message text-red-500">{error}</p>
                    )}
                    <button type="submit" className="primary-btn">
                      Sign Up
                    </button>
                  </form>
                  <button
                    onClick={() => navigate("/login")}
                    className="secondary-btn"
                  >
                    Already have an account? Login
                  </button>
                </div>
                <footer id="main-footer">
                  <p>Copyright &copy; 2024, KarapatanKo All Rights Reserved</p>
                  <div>
                    <a href="#">Terms of Use</a> |{" "}
                    <a href="#">Privacy Policy</a>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(SignUp);
