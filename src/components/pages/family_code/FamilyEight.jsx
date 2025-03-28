import React, { useState, useEffect } from "react";
import "../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../HOC/index";
import familyEight from "../../laws/book_family_code/familyEight.json";
import { useDictionary } from "../../database/dictionaryAPI.js";

const FamilyEight = () => {
  const navigate = useNavigate();
  const { selectedWord, definition, tooltipPosition, handleTextSelection } = useDictionary();
  const [showScrollButton, setShowScrollButton] = useState(false);

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
    navigate("/familyTwo");
  };

  return (
    <div className="text-spacing-3 leading-relaxed tracking-wide">
      <ScrollWrapper>
        <div>
          <h4 className={`${styles.headText} mb-10`}>{familyEight.Chapter3.title}</h4>
          
          {familyEight.Chapter3.sections.map((section, sectionIndex) => {
            const sectionKey = Object.keys(section)[0];
            const sectionData = section[sectionKey];

            return (
              <div key={sectionIndex} className="my-5">
                <h5 className={styles.paragraphSubText}>{`${sectionKey}: ${sectionData.title}`}</h5>
                
                {sectionData.articles.map((article, index) => {
                  return Object.keys(article).map((articleKey, i) => {
                    const articleContent = article[articleKey];

                    return (
                      <div key={`${index}-${i}`} className="my-4">
                        <h6 className={styles.paragraphSubText}>{articleKey}</h6>
                        {typeof articleContent === "string" ? (
                          <p onMouseUp={handleTextSelection} className={styles.paragraphSubTextLower}>
                            {articleContent}
                          </p>
                        ) : (
                          <>
                            <p onMouseUp={handleTextSelection} className={styles.paragraphSubTextLower}>
                              {articleContent.text}
                            </p>
                            {articleContent.conditions && (
                              <ul className="list-disc pl-5">
                                {articleContent.conditions.map((condition, j) => (
                                  <li key={j}>{condition}</li>
                                ))}
                              </ul>
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
                <i className="fas fa-volume-up ml-5 text-gray-600"></i>
              </div>
              <hr className="border-2 mb-2" />
              <p>{definition}</p>
            </div>
          )}

          {/* Button Section */}
          <div className="mt-5 text-center">
            <button
              onClick={handleNextArticleClick}
              className="px-6 py-2 border text-white rounded-lg hover:bg-gray-500 flex ml-auto"
            >
              Next Chapter
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