import { styles } from "../../styles";
import { staggerContainer } from "../utility/motion";
import { motion } from 'framer-motion';

const SectionWrapper = (Component, idName) => {
  return function wrapper(props) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          {" "}
          &nbsp;{" "}
        </span>

        {/* Pass all props to the wrapped component */}
        <Component {...props} />
      </motion.section>
    );
  };
};

export default SectionWrapper;
