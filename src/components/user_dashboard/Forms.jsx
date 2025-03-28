import React from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles.js";
import { fadeIn } from "../utility/motion.js";
import { ScrollWrapper, SectionWrapper } from "../HOC";
import "../layouts/book.css";

const Forms = () => {
  return (
    <ScrollWrapper>
      <div className="p-8 min-h-screen text-center image-border-table">
        <motion.h1
          variants={fadeIn("top", "tween", 0.3, 1)}
          initial="hidden"
          animate="show"
          className={`${styles.paragraphHeadText} text-white mb-6`} //highlight-border
        >
          <strong className="tracking-wide">Downloadable Forms</strong>
        </motion.h1>

        <motion.div
          variants={fadeIn("bottom", "tween", 0.5, 1)}
          initial="hidden"
          animate="show"
          className="space-y-4 text-left max-w-3xl mx-auto"
        >
          <a
            href="https://drive.google.com/uc?export=download&id=1jdzxucX36YlkKL-rJB8UDOlZ5CZvIPDZ"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Marriage Certificate
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1hitsTZ_Yj-AwnweI2ZKyBlhKBST4KMw1"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Death Certificate
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1xmqJj_XmO65MFW7zcmat7Uak6OSDiT1G"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Issuance of Community Tax
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1I_5ZEKMqfJgkuSQGh4-au1JJJ8iW6TJu"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Business Permit Complaint
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1vM8IWP0zcbz5_SslxrLB-vderQQJ1W16"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Bussiness Partial Full Retirement
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1BuS2SrAhoLUWuSgw6sxupz633nWBX9Dj"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Certificate of Live Birth
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=184L-oYwO08jo-RQm2A_hUTKKVvlRl0H5"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Application for Real Estate Broker
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1KefJnizLDKb34NoQa8q5bc9anXxlGUFd"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Application for Real Estate Salesperson
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1KefJnizLDKb34NoQa8q5bc9anXxlGUFd"
            download
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Application for Business Firms
          </a>
        </motion.div>
        <motion.div
          variants={fadeIn("bottom", "tween", 0.5, 1)}
          initial="hidden"
          animate="show"
          className="space-y-4 text-left max-w-3xl mx-auto"
        >
       <br/> <hr/><br/>
          <a
            href="https://formsphilippines.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.paragraphSubText} text-white hover:underline hover:text-purple-400 block py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md`}
          >
            Access More Downloadable Forms
          </a>
        </motion.div>
      </div>
    </ScrollWrapper>
  );
};

export default SectionWrapper(Forms);
