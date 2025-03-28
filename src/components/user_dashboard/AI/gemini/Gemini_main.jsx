import React, { useContext, useEffect, useState } from "react";
import "./gemini.css";
import { Context } from "../context/Context.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Signout from "../Signout/Signout.jsx";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Gemini_main = () => {
  const {
    onSent,
    setRecentPrompt,
    showResult,
    loading,
    setLoading,
    resultData,
    setInput,
    input,
    selectedMessage,
    setSelectedMessage,
    darkMode,
  } = useContext(Context);

  const [userData, setUserData] = useState(null);
  const [showSignout, setShowSignout] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [responseSaved, setResponseSaved] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const db = getFirestore();

  /** Fetch user data */
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  /** Handle Speech Recognition */
  useEffect(() => {
    if (isListening) {
      mic.start();
    } else {
      mic.stop();
    }

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    mic.onerror = (event) => console.error(event.error);
  }, [isListening]);

  /** Handle Enter Key Press */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      handleSendMessage();
    }
  };

  /** Stop Listening & Send Message */
  const stopListeningAndSend = () => {
    setIsListening(false);
    mic.stop();

    setTimeout(() => {
      if (input.trim()) {
        handleSendMessage();
      }
    }, 500);
  };

  // Function to handle chatbot responses
  const handleUserInput = (userMessage) => {
    const keywords = [
      "appointment",
      "schedule",
      "lumapit sa lawyer",
      "get a lawyer",
      "consult",
    ];

    if (keywords.some((word) => userMessage.toLowerCase().includes(word))) {
      setSelectedMessage({
        message: userMessage,
        response: `Karapatan Ko can introduce you to our professional lawyers. <br/>
          You can book an appointment with our lawyer by clicking 
          <a href="/lawyer-status" style="color: #007bff; text-decoration: underline;">here</a> to fill out the form.<br/><br/>
          By proceeding, you agree to our 
          <a href="/privacy-policy" style="color: #007bff; text-decoration: underline;">Privacy Policy</a> and 
          <a href="/terms-of-service" style="color: #007bff; text-decoration: underline;">Terms of Service</a>.`,
      });
      showResult(true);
    } else {
      setLoading(true);
      onSent(); // Call AI response function if not about an appointment
    }
  };

  // Function to send a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        console.log("✉️ Sending message to AI:", input);

        const messageRef = await addDoc(collection(db, "Ai_Message"), {
          userId: user.uid,
          message: input,
          response: "", // Placeholder for AI response
          timestamp: serverTimestamp(),
        });

        const newMessageId = messageRef.id; // Get Message ID
        setMessageId(newMessageId);
        setResponseSaved(false);

        console.log("✅ Message saved with ID:", newMessageId);

        // Handle user input before sending to AI
        handleUserInput(input);
        setRecentPrompt(input);
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    }
  };

  /** Update Firestore with AI Response */
  useEffect(() => {
    if (!messageId || !resultData || responseSaved) return;

    const isResponseComplete = resultData.trim().length > 0 && !loading;
    if (isResponseComplete) {
      console.log("Updating AI response for messages: ", messageId);

      const updateFirestore = async () => {
        try {
          await updateDoc(doc(db, "Ai_Message", messageId), {
            response: resultData,
          });
          setResponseSaved(true);
          setSelectedMessage({
            message: input,
            response: resultData,
          });
          console.log("✅ Response updated in Firestore successfully");
        } catch (updateError) {
          console.error("❌ Error updating AI response:", updateError);
        }
      };
      updateFirestore();
    }
  }, [messageId, resultData, responseSaved, loading]);

  return (
    <div className={`Ai_layout ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar />
      <div className="Ai_main">
        <div className="Ai_nav">
          <p id="helena">Karapatan Ko</p>
          <img
            onClick={() => setShowSignout(!showSignout)}
            src="/user_icon.png"
            alt="user_icon"
          />
          {showSignout && (
            <div className="navbar-popup">
              <Signout />
            </div>
          )}
        </div>

        <div className="Ai_main-container">
          {selectedMessage &&
          typeof selectedMessage.response === "string" &&
          selectedMessage.response.trim() !== "" ? (
            <div className="Ai_result">
              <div className="Ai_result-title">
                <img src="/user_icon.png" alt="user_icon" />
                <p>{selectedMessage.message}</p>
              </div>
              <div className="result-data">
                {loading ? (
                  <div className="Ai_loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : selectedMessage?.response?.trim() !== "" ? (
                  <div className="typing-effect">
                  <p 
                    dangerouslySetInnerHTML={{
                      __html: resultData,
                    }}
                  ></p>
                  </div>
                ) : (
                  <p>Generating response...</p>
                )}
              </div>
            </div>
          ) : (
            <div className="Ai_greet">
              <p>
                <span>
                  Hello, {userData ? `${userData.firstName}` : "User"}
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
          )}

          <div className="Ai_main-bottom">
            <div className="Ai_search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
                onKeyDown={handleKeyDown}
              />
              <div>
                <img
                  src="/mic_icon.png"
                  alt="mic_icon"
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => setIsListening(true)}
                  onMouseUp={stopListeningAndSend}
                />
                {input && (
                  <img
                    onClick={handleSendMessage}
                    src="/send_icon.png"
                    alt="send_icon"
                  />
                )}
              </div>
            </div>

            {/* Microphone Indicator */}
            {isListening && (
              <div className="mic-container text-black">🎙️ Listening...</div>
            )}

            {/* Disclaimer */}
            <p className="Ai_bottom-info">
              ⚠️ This AI provides general legal information but does not offer
              legal advice, always consult a lawyer for specific legal concerns.
              ⚠️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gemini_main;
