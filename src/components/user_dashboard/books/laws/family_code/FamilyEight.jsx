import React, { useState, useEffect } from "react";
import "../../../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import familyEight from "../../pages/book_family_code/familyEight.json";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import translateText from "../../../../database/translate.js";

const FamilyEight = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } = useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [translatedWord, setTranslatedWord] = useState(""); // State to store the translated word

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextArticleClick = () => {
    navigate("/familyNine");
  };
  const handlePrevArticleClick = () => {
    navigate("/familySeven");
  };
  const speakText = (word, definition) => {
    try {
      if (!word) throw new Error("No word provided for speech synthesis.");

      let textToSpeak = word;
      if (definition) textToSpeak += `. Definition: ${definition}`;

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
      console.error("Speech error", error);
    }
  };
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
          <h4 className={`${styles.headText} mb-10`}>
            {familyEight.Chapter3.title}
          </h4>

          {familyEight.Chapter3.sections.map((section, sectionIndex) => {
            const sectionKey = Object.keys(section)[0];
            const sectionData = section[sectionKey];

            return (
              <div key={sectionIndex} className="my-5">
                <h5 className={styles.paragraphSubText}>
                  {`${sectionKey}: ${sectionData.title}`}
                </h5>

                {sectionData.articles.map((article, index) => {
                  return Object.keys(article).map((articleKey, i) => {
                    const articleContent = article[articleKey];

                    return (
                      <div key={`${index}-${i}`} className="my-4">
                        <h6 className={styles.paragraphSubText}>
                          {articleKey}
                        </h6>

                        {typeof articleContent === "string" ? (
                          <p
                            onMouseUp={handleTextSelection}
                            className={styles.paragraphSubTextLower}
                          >
                            {articleContent}
                          </p>
                        ) : (
                          <>
                            {articleContent.text && (
                              <p
                                onMouseUp={handleTextSelection}
                                className={styles.paragraphSubTextLower}
                              >
                                {articleContent.text}
                              </p>
                            )}

                            {articleContent.description && (
                              <p
                                onMouseUp={handleTextSelection}
                                className={styles.paragraphSubTextLower}
                              >
                                {articleContent.description}
                              </p>
                            )}

                            {articleContent.title && (
                              <p
                                onMouseUp={handleTextSelection}
                                className={styles.paragraphSubTextLower}
                              >
                                {articleContent.title}
                              </p>
                            )}

                            {/* Render possible list sections */}
                            {["conditions", "exclusions", "liabilities", "steps", "provisions"].map(
                              (key) =>
                                articleContent[key] && (
                                  <ul className="list-disc pl-5" key={key}>
                                    {articleContent[key].map((item, j) => (
                                      <li key={j}>{item}</li>
                                    ))}
                                  </ul>
                                )
                            )}

                            {articleContent.solidary_liability && (
                              <p className={styles.paragraphSubTextLower}>
                                <strong>Note:</strong>{" "}
                                {articleContent.solidary_liability}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    );
                  });
                })}
              </div>
            );
          })}

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
                  onClick={() => speakText(selectedWord, definition)}
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

          <div className="mt-10 text-center flex justify-between">
            <button
              onClick={handlePrevArticleClick}
              className="px-6 py-2 border justify-end text-white rounded-lg hover:bg-gray-500"
            >
              Previous Article
            </button>

            <button
              onClick={handleNextArticleClick}
              className="px-6 py-2 border justify-end text-white rounded-lg hover:bg-gray-500"
            >
              Next Article
            </button>
          </div>
        </div>
      </ScrollWrapper>

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

export default SectionWrapper(FamilyEight);
