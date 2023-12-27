import "./HomePage.css";
// import "./main.css";
import QuestItem from "../Items/QuestItem.jsx";
import ChainItem from "../Items/ChainItem.jsx";
import ZoneItem from "../Items/ZoneItem.jsx";
import QuestForm from "../Forms/QuestForm.jsx";
import ChainForm from "../Forms/ChainForm.jsx";
import ZoneForm from "../Forms/ZoneForm.jsx";
import DeleteQuestForm from "../Forms/DeleteQuestForm.jsx";
import DeleteChainForm from "../Forms/DeleteChainForm.jsx";
import DeleteZoneForm from "../Forms/DeleteZoneForm.jsx";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [zoneData, setZoneData] = useState([]);
  const [questData, setQuestData] = useState([]);
  const [chainData, setChainData] = useState([]);
  const [displayForm, setDisplayForm] = useState("none");

  const [currentQuest, setCurrentQuest] = useState({});
  const [currentChain, setCurrentChain] = useState({});
  const [currentZone, setCurrentZone] = useState({});

  const formDisplay = () => {
    switch (displayForm) {
      case "none":
        return <></>;

      case "quest":
        return (
          <QuestForm
            setDisplayForm={setDisplayForm}
            setQuestData={setQuestData}
            currentQuest={currentQuest}
          />
        );

      case "zone":
        return (
          <ZoneForm
            setDisplayForm={setDisplayForm}
            setZoneData={setZoneData}
            currentZone={currentZone}
          />
        );

      case "chain":
        return (
          <ChainForm
            setDisplayForm={setDisplayForm}
            setChainData={setChainData}
            currentChain={currentChain}
          />
        );

      case "deleteQuest":
        // console.log("delete form rendering");
        return (
          <DeleteQuestForm
            setDisplayForm={setDisplayForm}
            deleteQuest={currentQuest}
            setQuestData={setQuestData}
          />
        );

      case "deleteChain":
        // console.log("delete form rendering");
        return (
          <DeleteChainForm
            setDisplayForm={setDisplayForm}
            deleteChain={currentChain}
            setChainData={setChainData}
          />
        );

      case "deleteZone":
        // console.log("delete form rendering");
        return (
          <DeleteZoneForm
            setDisplayForm={setDisplayForm}
            deleteZone={currentZone}
            setZoneData={setZoneData}
          />
        );

      default:
        return <></>;
    }
  };

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
                  id={zone.id}
                  name={zone.name}
                  requirements={zone.requirements}
                  map={zone.map}
                  image={zone.image}
                  setCurrentZone={setCurrentZone}
                  setDisplayForm={setDisplayForm}
                  loader={() => {
                    zoneData;
                  }}
                />
              );
            })}
          </div>
          <button
            className="button button--green"
            onClick={() => {
              setCurrentZone({
                id: "",
                name: "",
                map: "",
                image: "",
                requirements: {
                  quests: "",
                  npcs: "",
                  dungeons: "",
                  bosses: "",
                  minibosses: "",
                  pointsOfInterest: "",
                },
              });
              setDisplayForm("zone");
            }}
          >
            Create New Zone
          </button>
        </div>
        {/* Chains */}
        <div id="chains-container" className="category">
          <h1>Quest Chains</h1>
          <div className="category-list">
            {chainData.map((chain) => {
              return (
                <ChainItem
                  key={chain.id}
                  id={chain.id}
                  name={chain.name}
                  quests={chain.quests}
                  setCurrentChain={setCurrentChain}
                  setDisplayForm={setDisplayForm}
                />
              );
            })}
          </div>
          <button
            className="button button--green"
            onClick={() => {
              setCurrentChain({
                id: "",
                name: "",
                quests: [],
              });
              setDisplayForm("chain");
            }}
          >
            Create New Chain
          </button>
        </div>
        {/* Quests */}
        <div id="quests-container" className="category">
          <h1>Quests</h1>
          <div className="category-list">
            {questData.length > 0 ? (
              questData.map((quest) => {
                return (
                  <QuestItem
                    key={quest.id}
                    id={quest.id}
                    name={quest.name}
                    type={quest.type}
                    description={quest.description}
                    zone={quest.zone}
                    reward={quest.reward}
                    chain={quest.chain}
                    setCurrentQuest={setCurrentQuest}
                    setDisplayForm={setDisplayForm}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <button
            className="button button--green"
            onClick={() => {
              setCurrentQuest({
                id: "",
                name: "",
                type: "",
                description: "",
                zone: "",
                reward: {
                  type: "",
                  description: "",
                },
                chain: {
                  name: "",
                  position: "",
                },
              });
              setDisplayForm("quest");
            }}
          >
            Create New Quest
          </button>
        </div>
      </div>
      {formDisplay()}
    </>
  );
}

export default HomePage;
