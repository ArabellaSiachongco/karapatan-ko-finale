// src/components/recaptcha.jsx
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCAPTCHAWrapper = ({ onChange }) => {
  const [verified, setVerified] = useState(false);

  const handleChange = (value) => {
    setVerified(true);
    onChange(value); // pass token to parent (login/signup)
  };

  return (
    <div className="mt-4">
      <ReCAPTCHA
        sitekey="6LewgwsrAAAAAGuhRwdUTiVmtmrMScDwoWFbBjMz"
        onChange={handleChange}
      />
      {!verified && <p className="text-xs text-gray-500 mt-1">Please verify that you're not a robot.</p>}
    </div>
  );
};

export default ReCAPTCHAWrapper;
