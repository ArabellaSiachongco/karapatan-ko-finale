import React, { useState, useEffect } from "react";
import "../../layouts/book.css";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../styles.js";
import { SectionWrapper, ScrollWrapper } from "../../HOC/index";
import familySix from '../../laws/book_family_code/familySix.json';
import { useDictionary } from "../../database/dictionaryAPI.js";

const FamilySix = () => {
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
    navigate("/familySeven");
  };

  return (
    <div className="text-spacing-3 leading-relaxed tracking-wide">
      <ScrollWrapper>
        <div>
          <h4 className={`${styles.headText} mb-10`}>{familySix.TITLE.name}</h4>
          
          {Object.entries(familySix.TITLE).map(([key, chapter]) => (
            key !== "name" && (
              <div key={key} className="my-5">
                <h5 className={styles.paragraphSubText}>{`${key}: ${chapter.name}`}</h5>
                
                {Object.entries(chapter).map(([articleKey, article]) => (
                  articleKey !== "name" && (
                    <div key={articleKey} className="my-4">
                      <h6 className={styles.paragraphSubText}>{`${articleKey}`}</h6>
                      <p onMouseUp={handleTextSelection} className={styles.paragraphSubTextLower}>
                        {article.text}
                      </p>
                      {article.order && (
                        <ul className="list-disc ml-5">
                          {article.order.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {article.exceptions && (
                        <ul className="list-disc ml-5">
                          {article.exceptions.map((exception, index) => (
                            <li key={index}>{exception}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                ))}
              </div>
            )
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

export default SectionWrapper(FamilySix);
