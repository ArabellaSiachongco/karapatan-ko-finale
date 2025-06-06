import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../../../styles.js";
import { table_of_content_RA12066 } from "../../pages/table_of_content.json";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import { fadeIn } from "../../../../utility/motion.js";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import "../../../../layouts/book.css";
import translateText from "../../../../database/translate.js";

const RA_12066 = () => {
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const [translatedWord, setTranslatedWord] = useState(""); // State to store the translated word

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
  }; // Automatically translate the word when selected
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
    <div>
      <ScrollWrapper>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("top", "spring", 0.5, 1)}
          id="RA_8371_ID"
          className="p-8 min-h-screen text-center image-border-table"
        >
          <motion.div
            variants={fadeIn("top", "spring", 0.5, 1)}
            className="mb-16"
          >
            <motion.p
              variants={fadeIn("top", "spring", 0.5, 1.5)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-2`}
            >
              <em>Republic of the Philippines</em>
            </motion.p>
            <motion.p
              variants={fadeIn("top", "spring", 0.5, 2)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubText} text-white mb-2`}
            >
              <strong>Congress of the Philippines</strong>
            </motion.p>
            <br />
            <motion.p
              variants={fadeIn("top", "spring", 0.5, 3)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-2`}
            >
              Metro Manila
            </motion.p>
            <br />
            <br />

            <motion.p
              variants={fadeIn("top", "spring", 0.5, 4)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-2`}
            >
              Nineteenth Congress
            </motion.p>
            <br />
            <br />

            <motion.p
              variants={fadeIn("top", "spring", 0.5, 6)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-2`}
            >
              Third Regular Session
            </motion.p>
            <br />
            <br />

            <motion.p
              variants={fadeIn("top", "spring", 0.5, 5)}
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-2`}
            >
              Begun and held in Metro Manila, on Monday, the twenty-second{" "}
              <br /> day of July, two thousand twenty-four.
            </motion.p>

            <motion.hr
              variants={fadeIn("top", "tween", 0.5, 4)}
              initial="hidden"
              animate="show"
              className="w-20 mx-auto border-t-2 border-white my-4"
            />
          </motion.div>

          <motion.div
            variants={fadeIn("top", "spring", 0.5, 7)}
            className="mb-6"
          >
            <h3
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubText} text-white mb-4 font-semibold`}
            >
              This Act shall be known as “The Indigenous Peoples’ Rights Act of
              1997″.
            </h3>

            <p
              onMouseUp={handleTextSelection}
              className={`${styles.paragraphSubTextLower} text-white mb-12`}
            >
              AN ACT AMENDING SECTIONS 27, 28, 32, 34, 57, 106, 108, 109, 112,
              135, 237, 237-A, 269, 292, 293, 294, 295, 296, 297, 300, 301, 308,
              309, 310, AND 311, AND ADDING NEW SECTIONS 135-A, 295-A, 296-A,
              AND 297-A OF THE NATIONAL INTERNAL REVENUE CODE OF 1997, AS
              AMENDED, AND FOR OTHER PURPOSES
            </p>
          </motion.div>

          {/* Table of Contents Header */}
          <motion.div
            variants={fadeIn("top", "spring", 0.6, 8)}
            className="mb-12"
          >
            <h3
              className={`${styles.paragraphSubText} text-white text-2xl font-semibold`}
            >
              Table of Contents
            </h3>
            <hr className="w-20 mx-auto border-t-2 border-white my-4" />
          </motion.div>

          {/* Links to Table of Contents */}
          <motion.div
            variants={fadeIn("bottom", "tween", 0.7, 1)}
            className="space-y-4 text-left max-w-3xl mx-auto"
          >
            {table_of_content_RA12066.map((item, index) => (
              <motion.div
                key={item.href}
                variants={fadeIn("bottom", "spring", index * 0.2, 0.9)}
              >
                <Link
                  to={item.href}
                  className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg`}
                >
                  {item.topic}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </ScrollWrapper>

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
    </div>
  );
};

export default SectionWrapper(RA_12066, "");
