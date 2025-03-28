import React, { useState } from 'react';
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../utility/motion";

// if alphabetically yung labas ng schedule niya 
const Books = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 id='admin_books' className={`${styles.headText} highlight-border`}>
          <span className="title-with-line">Law Books</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary text-[17px] max-w-3xl leading-[30px] tracking-wide mb-5"
      >
        You can Create, Update, and Delete a book.
      </motion.p>

    </>
  );
};

export default (Books);


