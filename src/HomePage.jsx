import "./HomePage.css";
// import "./main.css";
import QuestItem from "./QuestItem.jsx";
import ChainItem from "./ChainItem.jsx";
import ZoneItem from "./ZoneItem.jsx";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [zoneData, setZoneData] = useState([]);
  const [questData, setQuestData] = useState([]);
  const [chainData, setChainData] = useState([]);

  // Get ZoneData
  useEffect(() => {
    axios
      .get("/zonesData")
      .then((res) => {
        setZoneData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get QuestData
  useEffect(() => {
    axios
      .get("/questsData")
      .then((res) => {
        setQuestData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get chainData
  useEffect(() => {
    axios
      .get("/chainsData")
      .then((res) => {
        setChainData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* TOP HEADER */}
      <h1 className="page-header">Quest Tracker</h1>

      {/* DASHBOARD */}
      <div className="dashboard-container">
        <h2>Dashboard</h2>
      </div>

      {/* CATEGORIES */}
      <div className="categories-container">
        {/* Zones */}
        <div id="zones-container" className="category">
          <h1>Zones</h1>
          <div className="category-list">
            {zoneData.map((zone) => {
              return (
                <ZoneItem
                  key={zone.id}
                  zoneId={zone.id}
                  name={zone.name}
                  requirements={zone.requirements}
                  map={zone.map}
                  image={zone.image}
                  loader={() => {
                    zoneData;
                  }}
                />
              );
            })}
          </div>
          <button className="btn-create-item">+</button>
        </div>

        {/* Quests */}
        <div id="quests-container" className="category">
          <h1>Quests</h1>
          <div className="category-list">
            {questData.map((quest) => {
              return (
                <QuestItem
                  key={quest.id}
                  itemId={quest.id}
                  name={quest.name}
                  type={quest.type}
                  description={quest.description}
                  zone={quest.zone}
                  reward={quest.reward}
                  chain={quest.chain}
                />
              );
            })}
          </div>
          <button className="btn-create-item">+</button>
        </div>
        {/* Chains */}
        <div id="chains-container" className="category">
          <h1>Quest Chains</h1>
          <div className="category-list">
            {chainData.map((chain) => {
              return (
                <ChainItem
                  key={chain.id}
                  chainId={chain.id}
                  name={chain.name}
                  quests={chain.quests}
                />
              );
            })}
          </div>
          <button className="btn-create-item">+</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
