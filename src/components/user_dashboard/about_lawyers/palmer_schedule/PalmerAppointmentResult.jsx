import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { SectionWrapper } from "../../../HOC";
import { styles } from "../../../../styles.js";
import emailjs from "@emailjs/browser";
import { lawyerProfiles } from "../../../constant/index.js";
import { db } from "../../../database/firebase.js";
import { doc, setDoc } from "firebase/firestore";

const AppointmentModal = ({ formData, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate("/lawyer-status"); // Navigate to /lawyer-status when modal is closed
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-green-700">
          Appointment Confirmed!
        </h2>
        <p className="text-gray-700 text-center">
          You have successfully booked an appointment in{" "}
          <strong>Magalgalit Law Office</strong>, Baguio City on{" "}
          <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose} // Call handleClose on button click
            className="px-4 py-2 border-2 border-orange-700 text-black rounded hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

AppointmentModal.propTypes = {
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const PalmerAppointmentResult = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const handlePrevArticleClick = () => {
    navigate("/appointmentTableLawyer1");
  };

  const handleConfirmClick = async () => {
    if (!formData) {
      alert("No appointment details found.");
      return;
    }

    try {
      // Save appointment to Firestore
      const appointmentRef = doc(
        db,
        "appointments",
        `${formData.email}_${formData.date}_${formData.time}`
      );
      await setDoc(appointmentRef, {
        firstName: formData.firstName,
        middleName: formData.middleName || "",
        lastName: formData.lastName,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        reasons: formData.reasons || "No reason selected",
        lawyer: {
          name: lawyerProfiles[0].name,
          title: lawyerProfiles[0].title,
          address:
            "Insular Life Building, Legarda Street, corner Abanao extension, Baguio, 2600 Benguet",
        },
        timestamp: new Date(), // Add timestamp for reference
      });
      // Send the email using EmailJS
      await emailjs.send(
        "service_f8p4u88", //  service ID
        "template_rtaqjfs", //  template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          to_name: "ATTORNEY PALMER", // The recipient name
          from_email: formData.email,
          message: `Appointment confirmed for ${formData.firstName} ${formData.lastName} on ${formData.date} at ${formData.time}.`,
        },
        "Z-JlpUZqWVtTdl2mp" // public key
      );

      setIsModalOpen(true); // Open modal if email is sent successfully
    } catch (error) {
      console.error("Error saving appointment or sending email:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!formData) {
    return (
      <div className="text-center mt-10">
        <p className="text-white text-lg">No appointment details found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <p className={styles.paragraphSubText}>Appointment</p>
      <h2 className={`${styles.headText} highlight-border`}>
        <span className="title-with-line">Confirmation</span>
      </h2>
      <p className={styles.paragraphSubTextLower}>
        Please review the details of your appointment. Keep in mind that this
        appointment is non-transferable.
      </p>

      {/* Appointment Details */}
      <div className="mt-6 mb-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                First Name
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.firstName}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Middle Name
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.middleName || "N/A"}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Last Name
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.lastName}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Date of Appointment
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.date}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Time of Appointment
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.time}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Selected Reason
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.reasons || "No reason selected"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <p className={styles.paragraphSubText}>Contact Information</p>
      <div className="mt-6 mb-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Email
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {formData.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <p className={styles.paragraphSubText}>
        You've got an appointment with an attorney
      </p>
      <div className="mt-6 mb-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Name
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                {lawyerProfiles[0].name}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Title
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                Attorney at Law specializing in {lawyerProfiles[0].title}
              </td>
            </tr>
            <tr>
              <td className="w-1/3 px-4 py-3 text-right border border-gray-300 font-semibold">
                Address
              </td>
              <td className="w-2/3 px-4 py-3 border border-gray-300">
                Insular Life Building, Legarda Street, corner Abanao extension,
                Baguio, 2600 Benguet
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <img src="/map.png" />

      <div className="mt-10 text-center flex justify-between">
        <button
          onClick={handlePrevArticleClick}
          className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-red-900"
        >
          Go back
        </button>

        <button
          onClick={handleConfirmClick}
          className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-teal-900"
        >
          Confirm
        </button>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        formData={formData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

PalmerAppointmentResult.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default SectionWrapper(PalmerAppointmentResult);
