import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LawyerStatusCard = ({ LawyerProfile }) => {
  return (
    <div>
      <motion.div
        className="max-w-md p-6 mt-10 rounded-lg shadow-lg relative text-white image-border-lawyer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image and Title */}
        <div className="flex flex-col items-center">
          <img
            src={LawyerProfile.image}
            alt={LawyerProfile.name}
            className="rounded-lg border-2 bg-white shadow-md"
            width={96}
            height={96}
            loading="lazy"
          />
          <h2 className="text-md font-bold mt-2">{LawyerProfile.name}</h2>
          <p className="text-sm">{LawyerProfile.title}</p>
        </div>

        {/* Current Stats */}
        <div className="mt-5 text-sm">
          <p className="font-semibold">
            Consultation:{" "}
            <span className="text-orange-400">{LawyerProfile.currentSP}</span>
          </p>
          <p className="mt-1 font-semibold">
            Experience:{" "}
            <span className="text-orange-400">
              {LawyerProfile.currentPoints}
            </span>
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4 mt-6 border-white" />

        {/* Message */}
        {LawyerProfile.tagline && (
          <div className="text-center tracking-wide text-sm text-white mb-4">
            <b>{LawyerProfile.tagline}</b>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-1 text-xs">
          <div>
            <p className="font-semibold">TALENT</p>
            <p className="text-left tracking-wide text-sm text-white mb-2">
              {LawyerProfile.talent}
            </p>
          </div>
          <div>
            <p className="font-semibold">CONTACT NUMBER:</p>
            <p className="text-left tracking-wide text-sm text-white mb-2">
              {LawyerProfile.contact}
            </p>
          </div>
          <div>
            <p className="font-semibold">GMAIL:</p>
            <p className="text-left tracking-wide text-sm text-white mb-2">
              {LawyerProfile.gmail}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">ADDRESS:</p>
            <p className="text-left tracking-wide text-sm text-white mb-2">
              {LawyerProfile.address}
            </p>
          </div>
        </div>

        {LawyerProfile.btn && (
          <div className="mt-5 flex justify-center">
            <Link
              to={{
                pathname: LawyerProfile.btn,
                state: {
                  lawyerName: LawyerProfile.name,
                  lawyerProfile: LawyerProfile,
                },
              }}
              className="px-6 py-2 border-2 border-orange-500 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold flex items-center"
            >
              Get an Appointment
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Adding prop types for LawyerStatusCard
LawyerStatusCard.propTypes = {
  LawyerProfile: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    currentSP: PropTypes.string.isRequired,
    currentPoints: PropTypes.string.isRequired,
    talent: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    address: PropTypes.string.isRequired,
    btn: PropTypes.string.isRequired,
  }).isRequired,
};

export default LawyerStatusCard;
