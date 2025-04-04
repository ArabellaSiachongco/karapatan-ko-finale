import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { styles } from "../../../../../styles.js";
import table_of_content from "../../laws/table_of_content.json";
import { SectionWrapper, ScrollWrapper } from "../../../../HOC/index.js";
import { fadeIn } from "../../../../utility/motion.js";
import { useDictionary } from "../../../../database/dictionaryAPI.js";
import "../../../../layouts/book.css";

const CivilLaw = () => {
  const { selectedWord, definition, tooltipPosition, handleTextSelection } = useDictionary();
  const { table_of_content_civil_law } = table_of_content; // Extracting data properly

  return (
    <ScrollWrapper>
      <div id="family_ID" className="p-8 min-h-screen text-center image-border-table">
        
        {/* Family Intro */}
        <div className="mb-16">
          <motion.p
            onMouseUp={handleTextSelection}
            variants={fadeIn("top", "tween", 0.1, 0.6)}
            initial="hidden"
            animate="show"
            className={`${styles.paragraphSubTextLower} text-white mb-2`}
          >
            <em>REPUBLIC ACT NO. 386</em>
          </motion.p>

          <motion.h3
            variants={fadeIn("top", "tween", 0.2, 0.8)}
            initial="hidden"
            animate="show"
            className={`${styles.paragraphSubText} text-white mb-4`}
          >
            <strong>AN ACT TO ORDAIN AND INSTITUTE THE CIVIL CODE OF THE PHILIPPINES</strong>
          </motion.h3>

          <motion.h1
            variants={fadeIn("top", "tween", 0.3, 1)}
            initial="hidden"
            animate="show"
            onMouseUp={handleTextSelection}
            className={`${styles.paragraphHeadText} text-white mb-6`}
          >
            <strong className="tracking-wide">THE FAMILY CODE OF THE PHILIPPINES</strong>
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
          {table_of_content_civil_law.map((item) => (
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
              <i className="fas fa-volume-up ml-5 text-gray-600"></i>
            </div>
            <hr className="border-2 mb-2" />
            <p>{definition}</p>
          </div>
        )}

      </div>
    </ScrollWrapper>
  );
};

export default SectionWrapper(CivilLaw, "CivilLaw");
