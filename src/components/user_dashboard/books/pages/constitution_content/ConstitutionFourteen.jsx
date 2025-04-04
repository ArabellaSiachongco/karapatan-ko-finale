import React, { useState, useEffect } from "react";
import "../../../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import educationData from "../../laws/book_constitution/education.json";
import { useDictionary } from "../../../../database/dictionaryAPI.js";

const ArticleFourteen = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const sectionsData = [
    { key: "educations", data: educationData.educations },
    { key: "languages", data: educationData.languages },
    { key: "scienceAndTechnology", data: educationData.scienceAndTechnology },
    { key: "artsAndCulture", data: educationData.artsAndCulture },
    { key: "sports", data: educationData.sports },
  ];

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

  const handleNavigation = (path) => {
    navigate(path);
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
      if (voices.lenght === 0) {
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
  const renderSections = (data) => {
    return data?.map((item) => (
      <div key={item.id} className="my-5">
        <h5 className={styles.paragraphSubText}>
          {item.subtitle || item.title}
        </h5>
        {item.subtitle && (
          <h4 className={`${styles.headText} mb-10`}>{item.title}</h4>
        )}
        <div>
          {item.sections?.map((section, index) => (
            <div key={index} className="my-4">
              <h6 className={styles.paragraphSubText}>{section.name}</h6>
              <p
                onMouseUp={handleTextSelection}
                className={styles.paragraphSubTextLower}
              >
                {section.paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="text-spacing-3 leading-relaxed tracking-wide">
      <ScrollWrapper>
        <div>
          {sectionsData.map(({ key, data }) => (
            <React.Fragment key={key}>{renderSections(data)}</React.Fragment>
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
            </div>
          )}
          <div className="mt-10 text-center flex justify-between">
            <button
              onClick={() => handleNavigation("/constitutionThirteen")}
              className="px-6 py-2 border text-white rounded-lg hover:bg-gray-500"
            >
              Previous Article
            </button>
            <button
              onClick={() => handleNavigation("/constitutionFifteen")}
              className="px-6 py-2 border text-white rounded-lg hover:bg-gray-500"
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

export default SectionWrapper(ArticleFourteen);
