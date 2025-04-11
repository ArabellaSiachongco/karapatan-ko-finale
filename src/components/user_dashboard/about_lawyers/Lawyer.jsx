import { React, useEffect } from "react";
import { styles } from "../../../styles";
import { lawyerProfiles } from "../../constant/index";
import { SectionWrapper } from "../../HOC";
import LawyerStatusCard from "./LawyerStatusCard";

const Lawyer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <span className={styles.paragraphSubText}>Choose Your Lawyer</span>
      <h2 className={`${styles.headText} highlight-border`}>
        <span className="title-with-line mb-5">Legal Matching</span>
      </h2>
      <p className={styles.paragraphSubTextLower}>
        Finding the right lawyer is a crucial step in ensuring the best possible
        outcome for your legal case. Whether you're dealing with workplace
        discrimination, personal injury, or family law matters, we connect you
        with experienced professionals who specialize in your area of need.
        Legal match helps you find qualified attorneys and lawyers based on your
        specific legal concerns, ensuring you receive expert guidance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawyerProfiles.map((profile, index) => (
          <LawyerStatusCard key={index} LawyerProfile={profile} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Lawyer, "lawyer-section");
