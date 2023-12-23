import "./ZonePage.css";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ZonePage() {
  const zoneId = useLoaderData();
  console.log(zoneId);
  const [zoneData, setZoneData] = useState([]);
  const [questData, setQuestData] = useState([]);

  useEffect(() => {
    axios
      .get(`/zoneData/${zoneId}`)
      .then((res) => {
        setZoneData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/questsByZone/${zoneId}`)
      .then((res) => {
        setQuestData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>ZONE PAGE</h1>
      <p>{zoneData.name}</p>
      <h3>Quests:</h3>
      {questData.length > 0 ? (
        questData.map((quest) => {
          return (
            <div key={quest.id}>
              <h1>{quest.name}</h1>
              <p>{quest.type}</p>
              <p>{quest.description}</p>
              <p>{quest.chain}</p>
              <p>{quest.reward.type}</p>
              <p>{quest.reward.description}</p>
            </div>
          );
        })
      ) : (
        <div>
          <p>poop</p>
        </div>
      )}
      {zoneData.length > 0 ? (
        <div>
          <h3>Requirements:</h3>
          <p>Quests: {zoneData[0].requirements.quests}</p>
          <p>NPCs: {zoneData[0].requirements.npcs}</p>
          <p>Dungeons: {zoneData[0].requirements.dungeons}</p>
          <p>Bosses: {zoneData[0].requirements.bosses}</p>
          <p>Mini-Bosses: {zoneData[0].requirements.miniboss}</p>
          <p>Points of Interest: {zoneData[0].requirements.pointOfInterest}</p>
        </div>
      ) : (
        <div>
          <p>poop</p>
        </div>
      )}
    </div>
  );
}

export default ZonePage;
