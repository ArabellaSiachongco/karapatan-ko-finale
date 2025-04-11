import React, { useContext, useEffect, useState } from "react";
import "../../layouts/Sidebar.css";
import { Context } from "./Context";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const Sidebar = ({ children }) => {
  const [extended, setExtended] = useState(false);
  const { newChat, darkMode, setDarkMode } = useContext(Context);
  const [recentMessages, setRecentMessages] = useState([]);
  const { setSelectedMessage } = useContext(Context);

  const db = getFirestore();

  const loadPrompt = (message, response) => {
    setSelectedMessage({ message, response });
  };
  useEffect(() => {
    const q = query(
      collection(db, "Ai_Message"),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecentMessages(messages);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className={`Ai_sidebar-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Sidebar Section */}
      <div className={`Ai_sidebar ${extended ? "extended" : ""}`}>
        <div className="top">
          <div className="Ai_menu">
            <img
              onClick={() => setExtended((prev) => !prev)}
              src="/menu_icon.png"
              alt="menu_icon"
            />
            {extended && (
              <p onClick={() => setExtended((prev) => !prev)}>Menu</p>
            )}
          </div>
          <div onClick={() => newChat()} className="Ai_new-chat">
            <img src="/plus_icon.png" alt="plus_icon" />
            {extended && <p>New chat</p>}
          </div>

          {extended && (
            <div className="Ai_recent">
              <p className="Ai_recent-title">Recent Messages</p>
              {recentMessages.map((item) => (
                <div
                  key={item.id}
                  className="Ai_recent-entry"
                  onClick={() => loadPrompt(item.message, item.response)}
                >
                  <img src="/message_icon.png" alt="message_icon" />
                  <p>{item.message.substring(0, 18)}...</p>
                </div>
              ))}
            </div>
          )}

          {/* Sidebar Bottom Section */}
          <div className="Ai_bottom">
            <div className="Ai_bottom-item Ai_recent-entry">
              <img
                onClick={() =>
                  window.open("https://gemini.google.com/faq", "_blank")
                }
                src="/question_icon.png"
                alt="question_icon"
              />
              {extended && (
                <p
                  onClick={() =>
                    window.open("https://gemini.google.com/faq", "_blank")
                  }
                >
                  Help
                </p>
              )}
            </div>
            <div className="Ai_bottom-item Ai_recent-entry">
              <img src="/setting_icon.png" alt="setting_icon" />
              {extended && (
                <div className="settings">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                  </label>
                  <p>{darkMode ? "Lights On" : "Lights Off"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
