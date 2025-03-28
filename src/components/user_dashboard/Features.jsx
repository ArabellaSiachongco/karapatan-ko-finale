// src/components/Features.jsx
import React from 'react';
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { features } from "../constant";
import { SectionWrapper, ScrollWrapper } from "../HOC/index";
import { textVariant } from "../utility/motion";
import { VerticalTimeline } from 'react-vertical-timeline-component';
import FeaturesCard from '../canvas/FeaturesCard';

const Features = () => {
  return (
    <ScrollWrapper>
    <>
      <motion.div variants={textVariant()}>
        <p id="features" className={`${styles.paragraphSubText} `}>
          Explore Our
        </p>
        <h2 className={`${styles.headText} highlight-border`}>
          <span className="title-with-line">Features</span>
        </h2>
      </motion.div>
      
      <motion.div variants={textVariant()}
        className="text-secondary text-[17px] max-w-3xl leading-[30px] tracking-wide"
      >
        <p className={styles.paragraphSubTextLower}>
        Access AI Helena for expert help, Legal Match for connections, and a Law Books Library with a tooltip dictionary.
        </p>
      </motion.div>
      
      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {features.map((feature, index) => (
            <FeaturesCard
              key={index} 
              feature={feature} 
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
    </ScrollWrapper>
  );
};

export default SectionWrapper (Features);
