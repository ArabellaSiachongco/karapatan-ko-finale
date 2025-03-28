import React from "react";
import PropTypes from "prop-types"; 
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../HOC";
import { fadeIn, textVariant } from "../utility/motion";
import { testimonials } from "../constant/index";

const TestimonialCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="border-2 border-orange-800 opacity-1 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">&quot;</p>
    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]"> {testimonial} </p>
      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span>
            {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {" "}
            {designation} at {company}
          </p>
        </div>
        <img
          src={image}
          alt={`feedback-by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </motion.div>
);

TestimonialCard.propTypes = {
  index: PropTypes.number.isRequired, 
  testimonial: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired, 
  company: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired, 
};

const Testimonial = () => {
  return (
    <div className="mt-12 rounded-[20px]">
      <div className={`${styles.padding} rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.paragraphSubText}>What others say</p>
          <h2 className={`${styles.headText} highlight-border`}>
            <span className="title-with-line">Testimonial</span>
          </h2>
        </motion.div>
      </div>
      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name} 
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonial);
