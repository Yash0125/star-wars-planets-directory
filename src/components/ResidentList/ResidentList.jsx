import React, { useEffect, useState } from "react";
import "./ResidentList.css";

const ResidentList = ({ residentUrls, fetchResidents }) => {
  const [residents, setResidents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (residentUrls.length > 0) {
      fetchResidents(residentUrls)
        .then((residentsData) => setResidents(residentsData))
        .catch((error) => console.error("Error fetching residents:", error));
    } else {
      setResidents(null); // Set residents to null when no resident URLs are available
    }
  }, [residentUrls]);

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === residents.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? residents.length - 1 : currentIndex - 1
    );
  };
  return (
    <div className="residentlist-container">
      <h3 className="residentlist-title">Residents:</h3>
      <div className="resident-list">
        {residents === null ? (
          <p className="resident-list-description">No residents available</p>
        ) : (
          <div className="resident-card">
            <div className="resident-description-line">
              <p className="resident-description-line-left">Name: </p>
              <p className="resident-description-line-right">
                {residents[currentIndex]?.name}
              </p>
            </div>
            <div className="resident-description-line">
              <p className="resident-description-line-left">Height: </p>
              <p className="resident-description-line-right">
                {residents[currentIndex]?.height}
              </p>
            </div>
            <div className="resident-description-line">
              <p className="resident-description-line-left">Mass: </p>
              <p className="resident-description-line-right">
                {residents[currentIndex]?.mass}
              </p>
            </div>
            <div className="resident-description-line">
              <p className="resident-description-line-left">Gender: </p>
              <p className="resident-description-line-right">
                {" "}
                {residents[currentIndex]?.gender}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="resident-navigation">
        {residents && (
          <>
            <button
              className="resident-navigation-left"
              onClick={handlePrevious}
              disabled={residents.length <= 1}
            >
              Left
            </button>
            <button disabled={residents.length <= 1} className="resident-navigation-right" onClick={handleNext}>
              Right
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResidentList;
