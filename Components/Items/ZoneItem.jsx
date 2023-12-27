import "./Item.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ZoneItem(props) {
  const { id, name, requirements, map, image } = props;

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h3>
            <Link to={`/zone/${id}`}>{name}</Link>
          </h3>
          <h4>Reqirements:</h4>
          <p>Quests: {requirements.quests}</p>
          <p>NPCs: {requirements.npcs}</p>
          <p>Dungeons: {requirements.dungeons}</p>
          <p>Bosses: {requirements.bosses}</p>
          <p>Mini-Bosses: {requirements.minibosses}</p>
          <p>Points Of Interest: {requirements.pointsOfInterest}</p>
          {/* Buttons */}
          <div className="form-row form-row--buttons">
            <button
              className="button button--green"
              onClick={() => {
                props.setCurrentZone({
                  id: 1,
                  name: name,
                  map: map,
                  image: image,
                  requirements: requirements,
                }),
                  props.setDisplayForm("zone");
              }}
            >
              Edit
            </button>
            <button
              className="button button--red"
              onClick={() => {
                props.setCurrentZone({
                  id: 1,
                  name: name,
                  map: map,
                  image: image,
                  requirements: requirements,
                }),
                  props.setDisplayForm("deleteZone");
              }}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>
            <Link to={`/zone/${id}`}>{name}</Link>
          </h3>
        </>
      )}
    </div>
  );
}

export default ZoneItem;
