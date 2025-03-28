import React, { useState, useEffect } from "react";
import "../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../HOC/index";
import {
  chapterSeven,
  chapterPower,
  offices,
  chapterSevenII,
  chapterSevenIII,
} from "../../laws/book_peoples_right/chapterSeven.json";
import { useDictionary } from "../../database/dictionaryAPI.js";

const ChapterSeven = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } =
    useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  // Navigation handlers
  const handleNextArticleClick = () => navigate("/chapterEight");
  const handlePrevArticleClick = () => navigate("/ChapterSix");

  return (
    <div>
      <ScrollWrapper>
        <div>
          {chapterSeven.chapterSeven.map((item) => (
            <div key={item.id} className="my-5">
              <h5 className={styles.paragraphSubText}>{item.subtitle}</h5>
              <h4 className={`${styles.headText} mb-10`}>{item.title}</h4>
              <div>
                {item.sections.map((section, index) => (
                  <div key={index} className="my-4">
                    <h6 className={styles.paragraphSubText}>
                      {section.name} {section.subtitle}
                    </h6>
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
          ))}

          {chapterPower.chapterPower.map((item) => (
            <div key={item.name} className="my-5">
              <h5 className={styles.paragraphSubText}>
                {item.name} {item.subtitle}
              </h5>
              <div>
                <p
                  onMouseUp={handleTextSelection}
                  className={styles.paragraphSubTextLower}
                >
                  {item.sub_paragraphs}
                </p>
                <br />
                {item.section.paragraph.map((para, index) => (
                  <p
                    onMouseUp={handleTextSelection}
                    key={index}
                    className={styles.paragraphSubTextLower}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {chapterSevenII.chapterSevenII.map((item) => (
            <div key={item.name} className="my-5">
              <h6 className={styles.paragraphSubText}>
                {item.name} {item.subtitle}
              </h6>
              <p
                onMouseUp={handleTextSelection}
                className={styles.paragraphSubTextLower}
              >
                {item.paragraph}
              </p>
            </div>
          ))}

          {offices.offices.map((item) => (
            <div key={item.name} className="my-5">
              <h5 className={styles.paragraphSubText}>
                {item.name} {item.subtitle}
              </h5>
              <p
                onMouseUp={handleTextSelection}
                className={styles.paragraphSubTextLower}
              >
                {item.sub_paragraphs}
              </p>

              <div>
                {item.sections.map((section, index) => (
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
          ))}

          {chapterSevenIII.chapterSevenIII.map((item) => (
            <div key={item.name} className="my-5">
              <h5 className={styles.paragraphSubText}>
                {item.name} {item.subtitle}
              </h5>
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
                {/* Icon aligned to the right */}
                <i className="fas fa-volume-up ml-5 text-gray-600"></i>
              </div>
              <hr className="border-2 mb-2" />
              <p>{definition}</p>
            </div>
          )}

          <div className="mt-10 text-center flex justify-between">
            <button
              onClick={handlePrevArticleClick}
              className="px-6 py-2 border text-white rounded-lg hover:bg-gray-500"
            >
              Previous Article
            </button>
            <button
              onClick={handleNextArticleClick}
              className="px-6 py-2 border text-white rounded-lg hover:bg-gray-500"
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

export default SectionWrapper(ChapterSeven);
