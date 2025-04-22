import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { SectionWrapper } from "../../../HOC";
import { styles } from "../../../../styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
} from "firebase/firestore";

const MagalgalitAppointmentTable = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the state passed from the sign-up page
  const { name, email } = state || {}; // Destructure name and email

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    date: "",
    time: "", // Default time slot
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // List of unavailable dates in YYYY-MM-DD format (for 2024-2025)
  const unavailable = [
    "2024-12-24",
    "2024-12-25",
    "2024-12-30",
    "2025-01-01",
    "2025-04-09",
    "2025-04-17",
    "2025-04-19",
    "2025-05-01",
    "2025-06-12",
    "2025-08-21",
    "2025-08-25",
    "2025-11-01",
    "2025-11-30",
    "2025-12-08",
    "2025-12-24",
    "2025-12-25",
    "2025-12-30",
    "2025-12-31",
  ];

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid); // Reference Firestore document
        const userSnap = await getDoc(userRef); // Fetch document

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setFormData((prev) => ({
            ...prev,
            firstName: userData.firstName || "",
            middleName: userData.middleName || "",
            lastName: userData.lastName || "",
            email: userData.email || user.email, // Fallback to auth email
          }));
        }
      }
    });

    return () => unsubscribe();
  }, []);
  const handlePrevArticleClick = () => {
    navigate("/appointmentLawyer2");
  };

  // Handle changes to form fields
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Validate form before submitting
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields!");
      return false;
    }
    if (!formData.date || !formData.time) {
      alert("Please select a valid date and time slot!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const db = getFirestore();
    const appointmentsRef = collection(db, "appointments");

    // Query Firestore for existing appointments by email, date, and time
    const appointmentQuery = query(
      appointmentsRef,
      where("email", "==", formData.email),
      where("date", "==", formData.date),
      where("time", "==", formData.time)
    );

    const querySnapshot = await getDocs(appointmentQuery);

    if (!querySnapshot.empty) {
      alert(
        "You already have an appointment scheduled at this time. Please choose a different time."
      );
      return;
    }

    // If no existing appointment, proceed to confirm
    await addDoc(appointmentsRef, formData); // Save appointment
    navigate("/appointmentResultLawyer2", { state: { formData } });
  };

  // Helper functions to check date exclusions
  const isPastDate = (date) => date < new Date().setHours(0, 0, 0, 0);
  const isHoliday = (date) => unavailable.includes(formatDate(date));
  const isDateSelectable = (date) =>
    !isPastDate(date) &&
    date.getDay() !== 0 &&
    date.getDay() !== 6 &&
    !isHoliday(date);

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const renderCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Empty slots for days before the first day
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      days.push(date);
    }
    return days;
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    if (isDateSelectable(date)) {
      setSelectedDate(date);
      setFormData((prev) => ({
        ...prev,
        date: formatDate(date),
        time: "", // Reset time selection when a new date is clicked
      }));
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return newMonth < new Date(2024, 0, 1) ? prev : newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const timeSlots = [
    { id: 1, start: "8:00 am", end: "9:00 am" },
    { id: 2, start: "9:00 am", end: "10:00 am" },
    { id: 3, start: "10:00 am", end: "11:00 am" },
  ];

  const isPastTime = (startTime) => {
    const now = new Date();
    const today = new Date().setHours(0, 0, 0, 0); // Today's start

    const [time, modifier] = startTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) {
      hours += 12;
    } else if (modifier === "am" && hours === 12) {
      hours = 0;
    }

    const slotTime = new Date(today).setHours(hours, minutes, 0, 0);

    return slotTime < now; // True if the time slot is in the past
  };

  const handleTimeSelect = (start, end) => {
    if (
      selectedDate &&
      selectedDate.toDateString() !== new Date().toDateString()
    ) {
      // If the selected date is not today, allow all slots
    } else if (isPastTime(start)) {
      return; // Prevent past time selection
    }

    const selectedTime = `${start} - ${end}`;
    setFormData((prev) => ({
      ...prev,
      time: prev.time === selectedTime ? "" : selectedTime,
    }));
  };

  // Example usage
  timeSlots.forEach((slot) => {
    console.log(
      `Time Slot: ${slot.start} - Disabled: ${isPastTime(slot.start)}`
    );
  });

  const getCalendarDayClass = (date) => {
    if (!date) return "bg-dark"; // Empty slots
    if (isHoliday(date) || date.getDay() === 0 || date.getDay() === 6)
      return "bg-gray-800"; // Weekend or holiday
    if (isPastDate(date)) return "bg-gray-800"; // Past date
    if (selectedDate?.toDateString() === date?.toDateString())
      return "bg-green-800"; // Selected date
    if (new Date().toDateString() === date.toDateString()) return "border"; // Today
    return "hover:bg-green-900 cursor-pointer"; // Default class
  };

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "Legal consultation for personal matters",
    "Business-related legal advice",
    "Assistance with document preparation",
    "Representation in a court case",
    "Other reasons",
  ];
  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setFormData((prev) => ({
      ...prev,
      reasons: reason === "Other reasons" ? otherReason : reason,
    }));
  };

  const handleOtherReasonChange = (value) => {
    setOtherReason(value);
    if (selectedReason === "Other reasons") {
      setFormData((prev) => ({
        ...prev,
        reasons: value,
      }));
    }
  };

  return (
    <>
      <p className={styles.paragraphSubText}>Schedule a</p>
      <h2 className={`${styles.headText} highlight-border`}>
        <span className="title-with-line">Consultation</span>
      </h2>

      <div className="p-6 border-2 border-orange-700 shadow-lg rounded-lg mt-10">
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex space-x-4 mb-4">
            {/* First Name */}
            <div className="w-1/3">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                placeholder="First name"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="w-1/3">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="middleName"
              >
                Initial
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                placeholder="Middle name"
              />
            </div>

            {/* Last Name */}
            <div className="w-1/3">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          {/* Email */}
          <div className="w-full mb-4">
            <label className="text-white font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
              placeholder="sample@gmail.com"
              required
            />
          </div>
          <br />
          {/* Reasons */}
          <label className="text-white font-medium mb-2" htmlFor="reason">
            Select a Reason
          </label>
          <div className="space-y-3">
            <table className="min-w-full border rounded-lg border-gray-300">
              <tbody>
                {reasons.map((reason, index) => (
                  <tr key={index} className="rounded-lg">
                    <td className="border border-gray-300 p-3 rounded-lg">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="reason"
                          value={reason}
                          checked={selectedReason === reason}
                          onChange={(e) => handleReasonChange(e.target.value)}
                          className="w-4 h-4"
                          required
                        />
                        <span className="text-white">{reason}</span>
                      </label>
                    </td>
                  </tr>
                ))}

                {selectedReason === "Other reasons" && (
                  <textarea
                    placeholder="Please specify your reason"
                    value={otherReason}
                    onChange={(e) => handleOtherReasonChange(e.target.value)}
                    className="w-full mt-2 p-6 focus:ring-2 focus:ring-orange-700"
                    required
                  />
                )}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          {/* Calendar */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="text-white font-medium py-2 px-4 rounded-lg hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
              >
                <GoTriangleLeft size={30} />
              </button>
              <p className="text-white font-medium">
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                {currentMonth.getFullYear()}
              </p>
              <button
                type="button"
                onClick={goToNextMonth}
                className="text-white font-medium py-2 px-4 rounded-lg hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700"
              >
                <GoTriangleRight size={30} />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-white mb-2">
              {[
                "S",
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
              ].map((day, index) => (
                <div key={index} className="py-2 bg-gray-500 rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {renderCalendarDays().map((date, index) => (
                <div
                  key={index}
                  className={`py-2 px-4 rounded-lg cursor-pointer ${getCalendarDayClass(
                    date
                  )}`}
                  onClick={() => date && handleDateClick(date)}
                >
                  {date ? date.getDate() : ""}
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
          {/* Time Slots */}
          <div className="mb-4">
            <h3 className="text-white font-medium mb-4">
              These are the available time slots:
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleTimeSelect(slot.start, slot.end)}
                  className={`w-full py-2 text-white rounded-lg border ${
                    formData.time === `${slot.start} - ${slot.end}`
                      ? "bg-green-900"
                      : "bg-gray-800"
                  }`}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
            </div>
          </div>
          <br /> <br />
          {/* Submit */}
          <div className="text-center flex justify-between">
            <button
              onClick={handlePrevArticleClick}
              className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-red-900"
            >
              Go back
            </button>

            <button
              type="submit"
              className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-teal-900"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SectionWrapper(MagalgalitAppointmentTable);
