import React from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`border-t-2 border-orange-800 text-white ${styles.paddingY} mt-16`}
    >
      <div
        className={`container mx-auto ${styles.paddingX} grid lg:grid-cols-4 md:grid-cols-2 gap-8`}
      >
        {/* About Section */}
        <div>
          <h4 className={`${styles.headSubText} highlight-border mb-4`}>
            About Us
          </h4>
          <hr className="title-with-line mb-3" />
          <p className="text-sm">
            KARAPATAN KO: A Digital Platform for Legal Rights and Resources
            Information System is designed to empower students with accessible
            legal rights information and resources, and connect them with
            trusted legal professionals.
          </p>
        </div>

        {/* Proposal Section */}
        <div>
          <h4 className={`${styles.headSubText} highlight-border mb-4`}>
            Our Mission
          </h4>
          <hr className="title-with-line mb-3" />
          <p className="text-sm">
            Our mission is to help all individuals, especially students to
            understand and exercise their rights. Through future AI-powered
            tools, users can receive real-time support to guide them through
            legal processes and understanding.
          </p>
        </div>

        {/* Partnership Section */}
        <div>
          <h4 className={`${styles.headSubText} highlight-border mb-4`}>
            Partnership
          </h4>
          <hr className="title-with-line mb-3" />
          <p className="text-sm mb-2">
            Our partnership is non government organization that includes
            professional lawyers.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className={`${styles.headSubText} highlight-border mb-4`}>
            Contact Us
          </h4>
          <hr className="title-with-line mb-3" />
          <p className="text-sm mb-2">
            Email: <span className="text-white">karapatanko@gmail.com</span>
          </p>
          <p className="text-sm mb-2">Phone: (+63) 966-630-6322</p>
          <p className="text-sm mb-2">Address: Legarda Government Pack Road</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`mt-10 text-center text-sm border-t border-orange-800 pt-6 ${styles.paddingX}`}
      >
        <p>© {new Date().getFullYear()} KARAPATAN KO. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
