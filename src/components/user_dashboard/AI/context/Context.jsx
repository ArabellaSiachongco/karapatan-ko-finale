import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
  };

  const onSent = async (prompt) => {
    setResultData(""); // Clear previous result
    setLoading(true);
    setShowResult(true);

    const userPrompt = prompt || input;
    if (!userPrompt.trim()) return;

    setRecentPrompt(userPrompt);
    setPrevPrompts((prev) => [...prev, userPrompt]);

    try {
      const response = await run(userPrompt);
      if (!response?.trim()) {
        console.error("No response received from AI!");
        return;
      }

      let formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold formatting
        .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics
        .replace(/\n/g, "<br>"); // Preserve line breaks

      const words = formattedResponse.split(" ");
      const chunkSize = 5; 

      let accumulatedResponse = "";

      words.forEach((word, i) => {
        setTimeout(() => { 
          accumulatedResponse += " " + word;
          setResultData(accumulatedResponse.trim()); 
        }, 50 * i); 
      });

      setTimeout(
        () => {
          setResultData(formattedResponse); 
        },
        50 * words.length + 500
      );

      setTimeout(
        () => {
          setSelectedMessage({
            message: userPrompt,
            response: formattedResponse,
          });
        },
        100 * (words.length / chunkSize)
      );
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        setLoading,
        resultData,
        input,
        setInput,
        newChat,
        selectedMessage,
        setSelectedMessage,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
