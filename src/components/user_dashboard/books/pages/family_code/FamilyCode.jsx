import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../../../styles.js";
import table_of_content from "../../laws/table_of_content.json";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import { fadeIn } from "../../../../utility/motion.js";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import "../../../../layouts/book.css";

const FamilyCode = () => {
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const { table_of_content_family_code } = table_of_content; // Extracting data properly

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
  return (
    <ScrollWrapper>
      <div
        id="family_ID"
        className="p-8 min-h-screen text-center image-border-table"
      >
        {/* Family Intro */}
        <div className="mb-16">
          <motion.p
            onMouseUp={handleTextSelection}
            variants={fadeIn("top", "tween", 0.1, 0.6)}
            initial="hidden"
            animate="show"
            className={`${styles.paragraphSubTextLower} text-white mb-2`}
          >
            <em>Principles</em>
          </motion.p>

          <motion.h3
            variants={fadeIn("top", "tween", 0.2, 0.8)}
            initial="hidden"
            animate="show"
            className={`${styles.paragraphSubText} text-white mb-4`}
          >
            <strong>THE 1987 CONSTITUTION</strong>
          </motion.h3>

          <motion.h1
            variants={fadeIn("top", "tween", 0.3, 1)}
            initial="hidden"
            animate="show"
            onMouseUp={handleTextSelection}
            className={`${styles.paragraphHeadText} text-white mb-6`}
          >
            <strong className="tracking-wide">
              THE FAMILY CODE OF THE PHILIPPINES
            </strong>
          </motion.h1>
        </div>

        {/* Table of Contents */}
        <div className="mb-12">
          <motion.h3
            variants={fadeIn("top", "tween", 0.5, 1.2)}
            initial="hidden"
            animate="show"
            className={`${styles.paragraphSubText} text-white text-2xl font-semibold`}
          >
            Table of Contents
          </motion.h3>

          <motion.hr
            variants={fadeIn("top", "tween", 0.6, 1.2)}
            initial="hidden"
            animate="show"
            className="w-20 mx-auto border-t-2 border-white my-4"
          />
        </div>

        {/* Links to Table of Contents */}
        <motion.div
          variants={fadeIn("bottom", "tween", 0.7, 1)}
          initial="hidden"
          animate="show"
          className="space-y-4 text-left max-w-3xl mx-auto"
        >
          {table_of_content_family_code.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
            >
              {item.topic}
            </Link>
          ))}
        </motion.div>

        {/* Word Selection and Definition Tooltip */}
        {selectedWord && (
          <div
            className="absolute text-left bg-white p-4 shadow-lg rounded-lg max-w-xs text-black"
            style={{
              left: tooltipPosition?.left || 0,
              top: tooltipPosition?.top || 0,
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
      </div>
    </ScrollWrapper>
  );
};

export default SectionWrapper(FamilyCode, "FamilyCode");
