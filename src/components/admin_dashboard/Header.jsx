import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../utility/motion";
import { SectionWrapper } from "../HOC/SectionWrapper";
import { db } from "../database/firebase";
import { Timestamp, collection, onSnapshot, getDocs } from "firebase/firestore";

const lawyers = {
  "Noel Magalgalit": {
    name: "Noel Magalgalit",
    title: "Civil Law",
    address: "Insular Life Building, Legarda Street, corner Abanao extension, Baguio, 2600 Benguet",
  },
  "Palmer Fagyan Bugtong": {
    name: "Palmer Fagyan Bugtong",
    title: "Criminal Law",
    address: "Insular Life Building, Legarda Street, corner Abanao extension, Baguio, 2600 Benguet",
  },
  "Jess B. Evasco": {
    name: "Jess B. Evasco",
    title: "Criminal Law",
    address: "Insular Life Building, Legarda Street, corner Abanao extension, Baguio, 2600 Benguet",
  },
};

const Header = () => {
  const [appointments, setAppointments] = useState({});
  const [pastAppointments, setPastAppointments] = useState({});
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [showArchivedAppointments, setShowArchivedAppointments] = useState(false);
  const [archivedAppointments, setArchivedAppointments] = useState([]);

  useEffect(() => {
    const appointmentsRef = collection(db, "appointments");
    const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
      const currentAppointments = {};
      const pastAppointments = {};
      const currentDate = new Date();

      snapshot.forEach((doc) => {
        const appointment = doc.data();
        const lawyerName = appointment.lawyer?.name || "Unknown Lawyer";
        if (!lawyers[lawyerName]) return;

        if (!currentAppointments[lawyerName]) currentAppointments[lawyerName] = [];
        if (!pastAppointments[lawyerName]) pastAppointments[lawyerName] = [];

        const appointmentDate = appointment.date instanceof Timestamp ? appointment.date.toDate() : new Date(appointment.date);
        const formattedAppointment = {
          id: doc.id,
          date: appointmentDate.toLocaleDateString(),
          time: appointment.time || "No time provided",
          reasons: appointment.reasons || "No reasons provided",
          client: `${appointment.firstName || ""} ${appointment.lastName || ""}`.trim() || "Unknown Client",
        };

        if (appointmentDate >= currentDate) {
          currentAppointments[lawyerName].push(formattedAppointment);
        } else {
          pastAppointments[lawyerName].push(formattedAppointment);
        }
      });

      setAppointments(currentAppointments);
      setPastAppointments(pastAppointments);
    });

    return () => unsubscribe();
  }, []);

  const fetchArchivedAppointments = async () => {
    if (showArchivedAppointments) {
      setShowArchivedAppointments(false);
      return;
    }

    try {
      const archivedRef = collection(db, "archived_appointments");
      const snapshot = await getDocs(archivedRef);
      const archives = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArchivedAppointments(archives);
      setShowArchivedAppointments(true);
      setShowPastAppointments(false); // Hide past appointments
    } catch (error) {
      console.error("Error fetching archived appointments:", error);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div variants={textVariant()}>
        <h2 id="admin_appointment" className={`${styles.headText} highlight-border`}>
          <span className="title-with-line">Appointments</span>
        </h2>
      </motion.div>

      <motion.p variants={fadeIn("", "", 0.1, 1)} className="text-secondary text-[17px] max-w-3xl leading-[30px] tracking-wide mb-5 mt-2">
        Manage appointments, send messages, and delete bookings.
      </motion.p>

      <div className="flex">
        <div className={`${styles.paragraphSubTextLower} mt-3 p-4 border-r`}> {/* Sidebar */}
          <table>
            <thead>
              <tr><th>Lawyer Name</th></tr>
            </thead>
            <tbody>
              {Object.keys(appointments).map((lawyer, index) => (
                <tr key={lawyer} onClick={() => setSelectedLawyer(lawyer)}>
                  <td className="cursor-pointer mb-1 hover:text-orange-700 p-2">{index + 1}. {lawyer}</td>
                </tr>
              ))}
              <br /><br /><hr /><br />
              <button
                className="cursor-pointer mb-1 text-orange-400 rounded hover:text-orange-900"
                onClick={fetchArchivedAppointments}
              >
                {showArchivedAppointments ? "Hide Archived" : "Show Archived"}
              </button>
            </tbody>
          </table>
        </div>

        <div className="w-3/4 p-4">
          {selectedLawyer && (
            <>
              <h3 className="text-lg font-bold">Appointments for {selectedLawyer}</h3>

              {/* Toggle Past Appointments */}
              <button
                className="px-4 py-2 text-orange-400 rounded hover:text-orange-900 ml-2"
                onClick={() => {
                  setShowPastAppointments(!showPastAppointments);
                  setShowArchivedAppointments(false); // Hide archived when showing past appointments
                }}
              >
                {showPastAppointments ? "Show Current Appointments" : "Show Past Appointments"}
              </button>

              {/* Title for Current Appointments */}
              {!showPastAppointments && !showArchivedAppointments && (
                <h3 className="mt-4 text-lg font-bold">Current Appointments</h3>
              )}

              {/* Show Regular Appointments (Only if archives are hidden) */}
              {!showPastAppointments && !showArchivedAppointments &&
                appointments[selectedLawyer]?.map((appointment, index) => (
                  <div key={index} className="border p-2 mt-2 rounded shadow-md">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Client:</strong> {appointment.client}</p>
                    <p><strong>Reason:</strong> {appointment.reasons}</p>
                    <button className="text-red-600 hover:text-red-800" onClick={() => setArchivedAppointments(appointment.id, selectedLawyer)}>Archive</button>
                  </div>
                ))
              }

              {/* Title for Past Appointments */}
              {showPastAppointments && <h3 className="mt-4 text-lg font-bold">Past Appointments</h3>}

              {/* Show Past Appointments */}
              {showPastAppointments && pastAppointments[selectedLawyer]?.map((appointment, index) => (
                <div key={index} className="border p-2 mt-2 rounded shadow-md">
                  <p><strong>Date:</strong> {appointment.date}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Client:</strong> {appointment.client}</p>
                  <p><strong>Reason:</strong> {appointment.reasons}</p>
                </div>
              ))}

              {/* Show Archived Appointments */}
              {showArchivedAppointments && archivedAppointments.length > 0 ? (
                <div className="mt-2 p-2 shadow-md">
                  <h3 className="text-lg font-bold">Archived Appointments</h3>
                  {archivedAppointments.map((appointment, index) => (
                    <div key={index} className="border p-2 mt-2 rounded shadow-md">
                      <p><strong>Date:</strong> {appointment.date}</p>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      <p><strong>Client:</strong> {appointment.client}</p>
                      <p><strong>Reason:</strong> {appointment.reasons}</p>
                    </div>
                  ))}
                </div>
              ) : (
                showArchivedAppointments && <p>No archived appointments found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Header, "header");
