import React, { useState } from "react";
import { styles } from "../../../../styles.js";
import { SectionWrapper } from "../../../HOC";
import { Link, useNavigate } from "react-router-dom";
import { lawyerProfiles } from "../../../constant/index.js";

const MagalgalitAppointment = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <p className={styles.paragraphSubText}>
        Mga tagubilin para sa pag-book ng appointment kay
      </p>
      <h2 className={`${styles.headText} highlight-border`}>
        <span className="title-with-line"> {lawyerProfiles[0].nickname}</span>
      </h2>

      <table className="mt-5 w-full border-collapse border border-gray-200">
        <tbody>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              1. Ang pag-secure ng appointment ay <b>LIBRE</b> at ang
              Appointment Slip ay <b>HINDI MAILILIPAT</b>.
              <br />
              <i>
                Securing an appointment is <b>FREE OF CHARGE</b> and Appointment
                Slip is <b>NON-TRANSFERABLE</b>.
              </i>
            </td>
          </tr>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              2. Ang appointment ay dapat nakapangalan sa mismong mag-aapply
              nang personal sa Magalgalit Law Office.
              <br />
              <i>
                The appointment must be named after the requester who will
                personally apply at the Magalgalit Law Office.
              </i>
            </td>
          </tr>
          <tr>
            <td
              className={`${styles.appointmentSubTextLower} border border-gray-300 p-3`}
            >
              3. Dumating sa Magalgalit Law Office ng hindi bababa sa
              labinlimang minuto bago ang nakatakdang oras ng appointment.
              <br />
              <i>
                Be at the Magalgalit Law Office at least fifteen minutes before
                the appointment schedule.
              </i>
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
                Sumasang-ayon ako sa pagkolekta at paggamit ng impormasyon na
                aking ibibigay sa form na ito para sa layunin ng pag-book ng
                appointment. Nauunawaan ko na ang pagkolekta at paggamit ng
                impormasyon, na maaaring kasama ang personal at sensitibong
                personal na impormasyon, ay alinsunod sa Data Privacy Act of
                2021.
              </label>
            </td>
          </tr>
          <tr>
            <td className="p-3 text-sm">
              <Link to="/terms-and-conditions_magalgalit">
                <button className="text-blue-300">
                  <i>Tingnan ang Mga Tuntunin at Kundisyon</i>
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
          Go Back
        </button>
        <div className="w-1/4"></div>
        <Link
          to={isChecked ? "/appointmentTableLawyer2" : "#"}
          className={`px-6 py-2 border-2 text-white rounded-lg text-sm font-semibold flex items-center ${
            isChecked ? "bg-green-800" : "bg-red-950 cursor-not-allowed"
          }`}
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

export default SectionWrapper(MagalgalitAppointment);
