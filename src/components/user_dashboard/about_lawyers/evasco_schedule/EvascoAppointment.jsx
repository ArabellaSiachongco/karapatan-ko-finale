import React, { useState } from "react";
import { styles } from "../../../../styles.js";
import { SectionWrapper } from "../../../HOC";
import { Link, useNavigate } from "react-router-dom";
import { lawyerProfiles } from "../../../constant/index.js";

const EvascoAppointment = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <p className={styles.paragraphSubText}>
        Instructions for booking an Appointment with
      </p>
      <h2 className={`${styles.headText} highlight-border`}>
        <span className="title-with-line"> {lawyerProfiles[2].nickname}</span>
      </h2>

      <table className="mt-5 w-full border-collapse border border-gray-200">
        <tbody>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              1. Securing an appointment is <b>FREE OF CHARGE</b> and
              Appointment Slip is <b>NON-TRANSFERABLE</b>.
            </td>
          </tr>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              2. The appointment must be named after the requester who will
              personally apply at the Magalgalit Law Office.
            </td>
          </tr>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              3. Be at the Magalgalit Law Office at least fifteen minutes before
              the appointment schedule.
            </td>
          </tr>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mr-2"
                />
                I agree to the collection and use of the data that I will
                provide through this form for the purpose of booking an
                appointment. I understand that the collection and use of this
                data, which may include personal and sensitive personal
                information, shall be in accordance with the Data Privacy Act of
                2021.
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-3 text-sm">
              <Link to="/terms-and-conditions">
                <button className="text-blue-300">
                  <i>View Terms and Conditions</i>
                </button>
              </Link>{" "}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate("/lawyer-status")}
          className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-red-900"
        >
          Back
        </button>
        <div className="w-1/4"></div>
        <Link
          to={isChecked ? "/appointmentTableLawyer3" : "#"}
          className={`px-6 py-2 border-2 text-white rounded-lg text-sm font-semibold flex items-center ${isChecked ? "hover:bg-teal-900" : "bg-red-950 cursor-not-allowed"}`}
          onClick={(e) => {
            if (!isChecked) e.preventDefault();
          }}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default SectionWrapper(EvascoAppointment);
