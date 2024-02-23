import React, { useEffect, useState } from "react";
import "./Home.css";
import ResidentList from "../../components/ResidentList/ResidentList";

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

  const fetchResidents = async (residentUrls) => {
    try {
      const residents = await Promise.all(
        residentUrls.map((url) =>
          fetch(url).then((response) => response.json())
        )
      );
      return residents;
    } catch (error) {
      console.error("Error fetching residents:", error);
      return [];
    }
  };

  const fetchNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const fetchPrevPage = () => {
    if (prevPage) {
      fetchPlanets(prevPage);
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
            <ResidentList
              residentUrls={planet.residents}
              fetchResidents={fetchResidents}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
