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
        Use Legal Match to connect with qualified attorneys based on your
        specific legal needs, such as workplace discrimination, personal injury,
        or family law. Review profiles, contact potential lawyers, and choose
        the one that best fits your requirements for expert guidance.
      </p><br/>
      <i> <p className={` text-sm{styles.paragraphSubTextLower}`}>
        Gumamit ng Legal Match upang makipag-ugnay sa mga abogado. Batay sa iyong mga partikular na pangangailangan sa batas, tulad ng diskriminasyon sa lugar ng trabaho, personal, o mga usaping pampamilya. Makipag-ugnayan sa mga potensyal na abogado, at pumili ng pinaka-angkop para sa iyong mga pangangailangan upang makatanggap ng ekspertong gabay.
      </p></i>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lawyerProfiles.map((profile, index) => (
          <LawyerStatusCard key={index} LawyerProfile={profile} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Lawyer, "lawyer-section");
