import React, { useState, useEffect } from "react";
import "../../../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import national from "../../pages/book_constitution/national.json";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import translateText from "../../../../database/translate.js";

const ArticleOne = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [translatedWord, setTranslatedWord] = useState(""); // State to store the translated word

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextArticleClick = () => {
    navigate(national.national[0].btn);
  };

  const speakText = (word, definition) => {
    try {
      if (!word) {
        throw new Error("No word provided for speech synthesis.");
      }

      let textToSpeak = word; // Start with the selected word
      if (definition) {
        textToSpeak += `. Definition: ${definition}`; // Add definition
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";

      // Get available voices
      let voices = speechSynthesis.getVoices();

      // Find a female voice
      let femaleVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Google UK English Female")
      );

      // Set the voice (fallback to first available if no female voice is found)
      utterance.voice = femaleVoice || voices[0] || null;

      // If no voices are available, wait for them to load
      if (voices.length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          femaleVoice = voices.find(
            (voice) =>
              voice.name.includes("Female") ||
              voice.name.includes("Samantha") ||
              voice.name.includes("Google UK English Female")
          );
          utterance.voice = femaleVoice || voices[0] || null;
          speechSynthesis.speak(utterance);
        };
      } else {
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Speech synthesis error:", error);
    }
  };

  // Automatically translate the word when selected
  useEffect(() => {
    const translateSelectedWord = async () => {
      if (selectedWord) {
        try {
          const translated = await translateText(selectedWord, "tl"); // Automatically translate selected word to Tagalog
          setTranslatedWord(translated); // Set the translated word
        } catch (error) {
          console.error("Translation error:", error);
        }
      }
    };

    translateSelectedWord(); // Call translation when a word is selected
  }, [selectedWord]); // This effect runs when `selectedWord` changes

  return (
    <div
      className="text-spacing-3 leading-relaxed tracking-wide"
      onMouseUp={handleTextSelection}
    >
      <ScrollWrapper>
        <div>
          {national.national.map((item) => (
            <div key={item.id} className="my-5">
              <h5 className={styles.paragraphSubText}>{item.subtitle}</h5>
              <h4 className={`${styles.headText} mb-10`}>{item.title}</h4>
              <p
                onMouseUp={handleTextSelection}
                className={styles.paragraphSubTextLower}
              >
                {item.paragraph}
              </p>
            </div>
          ))}

          {selectedWord && (
            <div
              className="absolute text-left bg-white p-4 shadow-lg rounded-lg max-w-xs text-black"
              style={{
                left: tooltipPosition.left,
                top: tooltipPosition.top,
                zIndex: 100,
              }}
            >
              <div className="flex items-center justify-between">
                <p className={styles.dictionaryText}>{selectedWord}</p>
                <button
                  onClick={() => {
                    console.log(
                      "🔍 Volume icon clicked! Word:",
                      selectedWord,
                      "| Definition:",
                      definition
                    );
                    speakText(selectedWord, definition);
                  }}
                  className="bg-transparent border-none p-0 m-0 cursor-pointer"
                >
                  <i className="fas fa-volume-up ml-5 text-gray-600 cursor-pointer"></i>
                </button>
              </div>
              <hr className="border-2 mb-2" />
              <p>{definition}</p>
              <br />
              {translatedWord && (
                <div className="mt-2">
                  <strong>In Tagalog:</strong>
                  <p>{translatedWord}</p>
                </div>
              )}
            </div>
          )}

          {/* Button Section */}
          <div className="mt-5 text-center">
            <hr />
            <br />
            <button
              onClick={handleNextArticleClick}
              className="px-6 py-2 border justify-end text-white rounded-lg hover:bg-gray-500 flex ml-auto"
            >
              <span className="text-xs">ARTICLE II</span>
            </button>
          </div>
        </div>
      </ScrollWrapper>

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default SectionWrapper(ArticleOne);
