import React, { useState, useEffect } from "react";
import "../../../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import chapterThree from "../../pages/book_peoples_right/chapterThree.json";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import translateText from "../../../../database/translate.js";

const ChapterThree = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [translatedWord, setTranslatedWord] = useState(""); // State to store the translated word

  // Handle Scroll Event to toggle visibility of the scroll-to-top button
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

  // Scroll to Top Functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextArticleClick = () => {
    navigate("/RA_8371_Four");
  };

  const handlePrevArticleClick = () => {
    navigate("/RA_8371_Two");
  };
  const speakText = (word, definition) => {
    try {
      if (!word) {
        throw new Error("No word provided for speech synthesis");
      }
      let textToSpeak = word;
      if (definition) {
        textToSpeak += `. Definition: ${definition}`;
      }
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "en-US";
      let voices = speechSynthesis.getVoices();
      let femaleVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Google UK English Female") ||
          voice.name.includes("Samantha")
      );
      utterance.voice = femaleVoice || voices[0] || null;
      if (voices.length  === 0) {
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          femaleVoice = voices.find(
            (voice) =>
              voice.name.includes("Female") ||
              voice.name.includes("Samanta") ||
              voice.name.includes("Google UK English Female")
          );
          utterance.voice = femaleVoice || voices[0] || null;
          speechSynthesis.speak(utterance);
        };
      } else {
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Speech error", error);
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
    <div className="text-spacing-3 leading-relaxed tracking-wide">
      <ScrollWrapper>
        <div>
          {chapterThree.chapterThree.map((item) => (
            <div key={item.id} className="my-5">
              {/* Chapter Title and Subtitle */}
              <h5 className={styles.paragraphSubText}>{item.subtitle}</h5>
              <h4 className={`${styles.headText} mb-10`}>{item.title}</h4>

              {/* Render Sections */}
              {item.sections.map((section, index) => (
                <div key={index} className="my-4">
                  <h6 className={styles.paragraphSubText}>{section.name}</h6>
                  <h5 className={styles.paragraphSubText}>
                    {section.subtitle}
                  </h5>

                  {/* Handle Paragraph Structure */}
                  {Array.isArray(section.paragraph) ? (
                    section.paragraph.map((para, idx) => (
                      <div key={idx} className="my-2">
                        <h6 className={styles.paragraphSubText}>{para.name}</h6>
                        {para.sub_paragraph && (
                          <p
                            onMouseUp={handleTextSelection}
                            className={styles.paragraphSubText}
                          >
                            <strong>{para.sub_paragraph}</strong>
                          </p>
                        )}
                        <p
                          onMouseUp={handleTextSelection}
                          className={styles.paragraphSubTextLower}
                        >
                          {para.paragraph}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p
                      onMouseUp={handleTextSelection}
                      className={styles.paragraphSubTextLower}
                    >
                      {section.paragraph}
                    </p>
                  )}
                </div>
              ))}
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
              {translatedWord && (
                <div className="mt-2">
                  <strong>In Tagalog:</strong>
                  <p>{translatedWord}</p>
                </div>
              )}
            </div>
          )}

          {/* Button Section */}
          <div className="mt-10 text-center flex justify-between">
            {/* Previous Article Button */}
            <button
              onClick={handlePrevArticleClick}
              className="px-6 py-2 border justify-end text-white rounded-lg hover:bg-gray-500"
            >
              Previous Article
            </button>

            {/* Next Article Button */}
            <button
              onClick={handleNextArticleClick}
              className="px-6 py-2 border justify-end text-white rounded-lg hover:bg-gray-500"
            >
              Next Article
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

export default SectionWrapper(ChapterThree);
