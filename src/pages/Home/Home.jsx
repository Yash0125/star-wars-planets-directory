import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/?format=json");
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Wars Planets Directory</h1>
      <div className="planets-container">
        {planets.map((planet, index) => (
          <div className="planet-card" key={index}>
            <h2 className="planet-title">{planet.name}</h2>
            <div className="planet-description-container">
              <div className="planet-description-line">
                <p className="planet-description-line-left">Climate : </p>
                <p className="planet-description-line-right">
                  {planet.climate}
                </p>
              </div>
              <div className="planet-description-line">
                <p className="planet-description-line-left">Population: </p>
                <p className="planet-description-line-right">
                  {planet.population}
                </p>
              </div>
              <div className="terrain-container">
                <p className="planet-description-line-terrain-left">
                  Terrain:{" "}
                </p>
                <p className="planet-description-line-terrain-right">
                  {planet.terrain.split(", ").map((terrain, index) => (
                    <span key={index} className="terrain">
                      {terrain}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            {/* <div className="residents-container">
              <h3 className="residents-title">Residents:</h3>
              <ResidentList residentUrls={planet.residents} fetchResidents={fetchResidents} />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
