import { createContext, useState, useEffect } from "react";
import run from "../../database/gemini";

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
    setResultData("");
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
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.*?)\*/g, "<i>$1</i>")
        .replace(/\n/g, "<br>");

      setResultData(formattedResponse);
      setSelectedMessage({
        message: userPrompt,
        response: formattedResponse,
      });
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
        setResultData,
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
