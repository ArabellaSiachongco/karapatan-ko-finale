import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { styles } from "../../styles.js";
import { fadeIn } from "../utility/motion.js";
import { ScrollWrapper, SectionWrapper } from "../HOC";
import "../layouts/book.css";

const Forms = () => {
  const [formData, setFormData] = useState({
    affiantName: "",
    affiantStatus: "Single",
    affiantAddress: "",
    affiantPostal: "",
    attorneyName: "",
    attorneyStatus: "Single",
    attorneyAddress: "",
    attorneyPostal: "",
    collectionSource: "",
    location: "",
    date: "",
    witness1: "",
    witness2: "",
  });

  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    const pdf = new jsPDF("p", "mm", "letter");
    const margin = 20;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("SPECIAL POWER OF ATTORNEY", 105, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    let y = margin + 20;
    pdf.setFont("helvetica", "bold");
    pdf.text("KNOW ALL MEN BY THESE PRESENTS:", margin, y);
    y += 10;

    pdf.setFont("helvetica", "normal");
    // Text formatted as a paragraph
    const text = `I, ${formData.affiantName}, of legal age, ${formData.affiantStatus}, residing at ${formData.affiantAddress} Baguio City, ${formData.attorneyPostal}, do hereby appoint, name and constitute ${formData.attorneyName}, likewise of legal age, ${formData.attorneyStatus}, residing at ${formData.attorneyAddress} Baguio City, ${formData.attorneyPostal}, to be my true and lawful attorney, for me and in my name, place, and stead, to do and perform the following acts, deeds, and things to wit:`;

    // Handle text overflow dynamically
    const lineHeight = 5;
    const pageHeight = 270; // Define your page height here
    let currentText = text.split(" ");
    let lines = [];
    let line = "";

    currentText.forEach((word) => {
      if (pdf.getTextWidth(line + word) < pdf.internal.pageSize.width - 20) {
        line += word + " ";
      } else {
        lines.push(line);
        line = word + " ";
      }
    });
    lines.push(line); // Push remaining line

    // Add the text line by line, with dynamic page break
    lines.forEach((line) => {
      if (y > pageHeight) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, 10, y);
      y += lineHeight;
    });

    y += 10;
    pdf.text(
      `To ask, demand, collect, and receive all sums of money from ${formData.collectionSource}.`,
      20,
      y
    );
    y += 10;

    pdf.text(
      "To endorse and encash the aforementioned check(s), if any, with any banking and financial",
      20,
      y
    );
    y += 5;
    pdf.text(
      "institution duly authorized by the Banko Sentral ng Pilipinas.",
      20,
      y
    );

    y += 10;
    pdf.text(
      "To sign and execute any and all papers related to the above-given powers.",
      20,
      y
    );

    y += 10;
    pdf.text(
      "To do and perform on my behalf acts which are related to the above powers.",
      20,
      y
    );

    y += 20;
    pdf.text(
      "HEREBY GIVING AND GRANTING unto my said attorney full power and authority to do whatsoever",
      20,
      y
    );
    y += 5;
    pdf.text(
      "requisite or necessary or proper to be done in or about the premises, or necessary or proper to be done",
      10,
      y
    );
    y += 5;
    pdf.text(
      "in or about the premises, as fully to all intents and purpose as I might or could lawfully do if personally",
      10,
      y
    );
    y += 5;
    pdf.text(
      "present, and hereby ratifying and confirming all that my said attorney shall do or cause to be done under",
      10,
      y
    );
    y += 5;
    pdf.text("and by virtue of these presents.", 10, y);
    y += 5;

    y += 20;
    pdf.text(
      `IN WITNESS WHEREOF, I have hereunto set my hand on this ${formData.date} at ${formData.location}, Philippines.`,
      20,
      y
    );

    y += 30;
    pdf.text("_______________________", 180, y, { align: "center" });
    y += 5;
    pdf.text("(Affiant)", 180, y, { align: "center" });

    y += 20;
    pdf.text(
      `SIGNED IN THE PRESENCE OF:                 ${formData.witness1}                   ${formData.witness2} `,
      10,
      y
    );
    y += 5;
    pdf.text(
      "At the Philippine Consulate General, Baguio City, Benguet, Philippines",
      10,
      y
    );

    pdf.save("Special_Power_of_Attorney.pdf");
  };

  return (
    <ScrollWrapper>
      <div className="p-8 min-h-screen text-center text-black image-border-table">
        <motion.h1
          variants={fadeIn("top", "tween", 0.3, 1)}
          initial="hidden"
          animate="show"
          className={`${styles.paragraphHeadText} text-black mb-6`}
        >
          <strong className="tracking-wide">Special Power of Attorney</strong>
        </motion.h1>

        {/* Editable SPA Form */}
        <motion.div
          ref={formRef}
          variants={fadeIn("bottom", "tween", 0.5, 1)}
          initial="hidden"
          animate="show"
          className="bg-gray-300 p-6 rounded-lg shadow-md max-w-3xl mx-auto text-left border"
        >
          <h2 className="text-lg font-bold text-black mb-4 text-center">
            SPECIAL POWER OF ATTORNEY
          </h2>
          <p className="text-black mb-4">KNOW ALL MEN BY THESE PRESENTS:</p>
          <p className="mb-2">
            I,{" "}
            <input
              type="text"
              name="affiantName"
              value={formData.affiantName}
              onChange={handleChange}
              className="w-2/3 border-b border-black bg-transparent text-black focus:outline-none"
            />
            , legal age, {""}
            <select
              name="affiantStatus"
              value={formData.affiantStatus}
              onChange={handleChange}
              className="border-b border-black bg-transparent text-black focus:outline-none "
            >
              <option>Single</option>
              <option>Married</option>
              <option>Widow</option>
            </select>
            , and with residence at{" "}
            <input
              type="text"
              name="affiantAddress"
              value={formData.affiantAddress}
              onChange={handleChange}
              className="border-b w-2/3 border-black bg-transparent text-black focus:outline-none"
            />
            Baguio City, do hereby APPOINT, NAME AND CONSTITUTE{" "}
            <input
              type="text"
              name="attorneyName"
              value={formData.attorneyName}
              onChange={handleChange}
              className="border-b w-1/2 border-black bg-transparent text-black focus:outline-none"
            />
            , likewise of legal age,{" "}
            <select
              name="attornetStatus"
              value={formData.attorneyStatus}
              onChange={handleChange}
              className="border-b border-black bg-transparent text-black focus:outline-none"
            >
              <option>Single</option>
              <option>Married</option>
              <option>Widow</option>
            </select>
            , and with residence {""}
            <input
              type="text"
              name="attorneyAddress"
              value={formData.attorneyAddress}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
            />
            , postal address at {""}
            <input
              type="text"
              name="attorneyPostal"
              value={formData.attorneyPostal}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
              maxLength="7"
            />
            , to be my true and lawful attorney, for me and in my name, place
            and stead, to do and perform the following acts, deeds, and things
            to wit: {""}
          </p>
          <p className="mb-5 mt-5">
            To ask, demand, collect, and receive all sums of money either in
            cash or check(s) payable or owing to me from {""}
            <input
              type="text"
              name="collectionSource"
              value={formData.collectionSource}
              onChange={handleChange}
              className="border-b w-1/2 border-black bg-transparent text-black focus:outline-none"
            />
            .
          </p>
          <p className="mb-5">
            To endorse and encash the aforementioned check(s), if any, with any
            banking and financial institution duly authorized by the Banko
            Sentral ng Pilipinas.
          </p>
          <p className="mb-5">
            To sign and execute any and all papers with all and any third
            persons, concerns and entities in connection with the above-given
            powers; and
          </p>
          <p className="mb-5">
            To do and perform on my behalf acts which are related to the above
            powers.
          </p>
          <p className="mb-5">
            HEREBY GIVING AND GRANTING unto my said attorney full power and
            authority to do whatsoever requisite or necessary or proper to be
            done in or about the premises, as fully to all intents and purpose
            as I might or could lawfully do if personally present, and hereby
            ratifying and confirming all that my said attorney shall do or cause
            to be done under and by virtue of these presents.
          </p>
          <br />
          <p className="mb-2">
            IN WITNESS WHEREOF, I have hereunto set my hand this{" "}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
            />
            , at{" "}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
            />
            .
          </p>
          <br />
          <p className="mb-2">
            SIGNED IN THE PRESENCE OF:{" "}
            <input
              type="text"
              name="witness1"
              value={formData.witness1}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="witness2"
              value={formData.witness2}
              onChange={handleChange}
              className="border-b w-1/3 border-black bg-transparent text-black focus:outline-none"
            />
          </p>{" "}
          <br />
          <p className="mb-2">
            At the Philippine Consulate General, Baguio City, Benguet,
            Philippines.
          </p>
          <button
            className="btn__filled px-10 py-2 mt-8 text-white bg-green-800 hover:bg-green-600"
            onClick={handleDownload}
          >
            Download
          </button>
        </motion.div>
      </div>
    </ScrollWrapper>
  );
};

export default SectionWrapper(Forms);
