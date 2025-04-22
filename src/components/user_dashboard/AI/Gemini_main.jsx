import React, { useContext, useEffect, useState } from "react";
import "../../layouts/gemini.css";
import { Context } from "./Context.jsx";
import Sidebar from "./Sidebar.jsx";
import { styles } from "../../../styles.js";
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
import run from "../../database/gemini.js";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const GeminiMain = () => {
  const {
    setRecentPrompt,
    setInput,
    input,
    selectedMessage,
    setSelectedMessage,
    darkMode,
    setResultData,
  } = useContext(Context);

  const [userData, setUserData] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const db = getFirestore();

  /** Fetch user data */
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUserData(userSnap.data());
      }
    };
    fetchUserData();
  }, []);

  /** Handle Speech Recognition */
  useEffect(() => {
    if (isListening) mic.start();
    else mic.stop();

    mic.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
      if (transcript.trim()) handleSendMessage();
    };

    mic.onerror = (event) => console.error(event.error);
  }, [isListening]);

  /** Handle Enter Key Press */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) handleSendMessage();
  };

  /** Stop Listening & Send Message */
  const stopListeningAndSend = () => {
    setIsListening(false);
    mic.stop();
    if (input.trim()) handleSendMessage();
  };
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const messageRef = await addDoc(collection(db, "Ai_Message"), {
          userId: user.uid,
          message: input,
          response: "", // Placeholder for AI response
          timestamp: serverTimestamp(),
        });

        setRecentPrompt(input);
        setThinking(true); // Start "Thinking..." loader

        setTimeout(async () => {
          // Fetch AI response after 1 sec
          const response = await run(input);
          setThinking(false); // Stop loader

          if (response?.trim()) {
            let formattedResponse = response
              .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
              .replace(/\*(.*?)\*/g, "<i>$1</i>")
              .replace(/\n/g, "<br>");

            setResultData(formattedResponse);
            setSelectedMessage({
              message: input,
              response: formattedResponse,
            });

            // Update Firestore with AI response
            await updateDoc(doc(db, "Ai_Message", messageRef.id), {
              response: formattedResponse,
            });
          } else {
            console.error("No response received from AI!");
          }
        }, 1000); // Delay AI response by 1 sec
      } catch (error) {
        console.error("Error saving message:", error);
      } finally {
        setInput(""); // Clear input
      }
    }
  };

  return (
    <div className={`Ai_layout ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar />
      <div className="Ai_main">
        <div className="Ai_main-container bg-gray-300 rounded-lg">
          {thinking ? (
            <div className="Ai_thinking">
              <p className="text-black mt-40">Thinking...</p>
            </div>
          ) : selectedMessage?.response ? (
            <div className="Ai_result">
              <div className="Ai_result-title">
                <img src="/user_icon.png" alt="user_icon" />
                <p>{selectedMessage?.message}</p>
              </div>
              <div className="result-data">
                <p
                  dangerouslySetInnerHTML={{ __html: selectedMessage.response }}
                ></p>
              </div>
            </div>
          ) : (
            <div className="Ai_greet text-orange-800 px-4 sm:px-8 md:px-12 lg:px-20 py-6 text-center">
              <p className="mt-14 text-lg sm:text-xl md:text-2xl font-semibold">
                Hello, {userData ? userData.firstName : "User"}
              </p>
              <p className="text-[18px] sm:text-[20px] md:text-[24px] mt-2">
                Paano kita matutulungan ngayon
              </p>
              <i>
                <p className="text-base sm:text-lg md:text-xl mt-2">
                  How can I help you today?
                </p>
              </i>
            </div>
          )}

          <div className="Ai_main-bottom">
            <div className="Ai_search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Message"
                onKeyDown={handleKeyDown}
              />
              <div>
                <img
                  src="/mic_icon.png"
                  alt="mic_icon"
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
            {isListening && (
              <div className="mic-container">🎙️ Listening...</div>
            )}
            <p className="Ai_bottom-info">
              ⚠️ This AI provides general legal information but does not offer
              legal advice. Always consult a lawyer for specific legal concerns.
              ⚠️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiMain;
