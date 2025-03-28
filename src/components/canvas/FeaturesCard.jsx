import React from "react";
import PropTypes from "prop-types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FeaturesCard = ({ feature }) => {
  const navigate = useNavigate();

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "black",
        border: "4px solid",
        borderImage: "linear-gradient(to top, #f12711, #f5af19) 1",
        borderRadius: "12px",
        boxShadow:
          "0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      contentArrowStyle={{ borderRight: "15px solid #f5af19" }}
      iconStyle={{ background: feature.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={feature.icon}
            alt={feature.title}
            className="w-[90%] h-[90%] object-contain"
            loading="lazy"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{feature.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {feature.subtitle}
        </p>
      </div>

      {feature.points && (
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {feature.points.map((point, index) => (
            <li
              key={`features-point-${index}`}
              className="text-gray-100 text-[14px] pl-1 tracking-wider cursor-pointer hover:underline"
              onClick={() => navigate(`${point.li}#${point.id}`)}
            >
              {point.text}
            </li>
          ))}
        </ul>
      )}

      {feature.image && (
        <div className="flex justify-center mt-3">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-[50%] h-[50%] rounded-lg"
          />
        </div>
      )}

      {feature.span && (
        <p className="flex flex-col justify-between items-center mt-3">
          <em>{feature.span}</em>
        </p>
      )}

      {feature.tags && (
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {feature.tags.map((tag, index) => (
            <span
              key={index}
              className={`text-[12px] px-2 py-1 rounded-lg ${tag.color}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* turn this to tags the tags will have lines */}
      {feature.btn && (
        <div className="mt-5 flex justify-center">
          <Link
            to={feature.btn}
            className="px-6 py-2 text-white rounded-lg text-sm font-semibold flex items-center"
          >
            <i>
              See More&nbsp;
              <i className="fa-solid fa-arrow-right ml-1"></i>
            </i>
          </Link>
        </div>
      )}
    </VerticalTimelineElement>
  );
};

// Define PropTypes for the feature object
FeaturesCard.propTypes = {
  feature: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconBg: PropTypes.string.isRequired,
    overview: PropTypes.string,
    update: PropTypes.string,
    born: PropTypes.string,
    color: PropTypes.string.isRequired,
    btn: PropTypes.string,
    points: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        li: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    span: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ),
    image: PropTypes.string,
  }).isRequired,
};

export default FeaturesCard;
