import React from "react";
import { styles } from "../../../../styles.js";
import { SectionWrapper } from "../../../HOC";
import "../../../../index.css";
import { useNavigate } from "react-router-dom";

const TermsAndConditions_palmer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={`${styles.AiText} highlight-border`}>
        Terms and Conditions for Data Privacy
      </h1>
      <h2 className={`${styles.paragraphSubText} mt-4`}>
        Data Privacy & Security Policy
      </h2>
      <h3 className={`${styles.paragraphSubText} mt-4`}>
        1. Data Collection & Usage
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        We collect and process user data solely for the purpose of providing
        legal information, services, and communication. By using our website,
        you consent to the collection, use, and processing of your data as
        outlined in this policy.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        2. Data Protection & Security Measures
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        We implement industry-standard security measures to protect user data,
        including encryption, secure servers, and access control. However, no
        method of online transmission is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        3. Third-Party Sharing
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        We do not sell, rent, or share personal data with third parties except:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white `}>
          • When required by law.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white `}>
          • When necessary to provide requested services (e.g., legal
          consultations).
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white `}>
          • With user consent.
        </li>
      </ul>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        4. Data Breach Policy
      </h3>
      <p className={`${styles.dictionaryText} text-white`}>
        In the event of a data breach, we will:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white `}>
          • Notify affected users as soon as possible via email or website
          notice.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Provide details about the nature of the breach and the affected
          data.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Implement corrective measures to prevent future incidents.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Report the incident to relevant authorities if required by law.
        </li>
      </ul>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        5. User Rights & Responsibilities
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Users have the right to:
      </p>
      <ul>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Request access to their stored data.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Request corrections or deletions of personal information.
        </li>
        <li className={`${styles.paragraphSubTextLower} text-white`}>
          • Withdraw consent for data processing.
        </li>
      </ul>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        Users are responsible for keeping their login credentials confidential
        and reporting any suspicious activities.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        6. Disclaimer & Limitation of Liability
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        While we take reasonable steps to protect user data, we are not liable
        for any unauthorized access, hacking, or breaches beyond our control.
        Users acknowledge the inherent risks of sharing data online and agree
        that our liability is limited to the extent permitted by law.
      </p>

      <h3 className={`${styles.paragraphSubText} mt-4`}>
        7. Changes to This Policy
      </h3>
      <p className={`${styles.paragraphSubTextLower} text-white`}>
        We reserve the right to update this policy at any time. Users will be
        notified of significant changes via email or an announcement on the
        website.
      </p>

      <p className="mt-4">
        <strong>
          By using this website, you acknowledge and agree to these terms.
        </strong>
      </p>
      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate("/appointmentLawyer1")}
          className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-red-900"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SectionWrapper(TermsAndConditions_palmer);
