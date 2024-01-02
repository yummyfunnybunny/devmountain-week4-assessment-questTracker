import "./Item.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ZoneItem(props) {
  // console.log("Zone Item ID");
  // console.log(props.id);
  const { id, name, requirements, map, image } = props;
  // console.log(image);

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h2>
            {name}
            {/* <Link to={`/zone/${id}`}>{name}</Link> */}
          </h2>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          <div className="zone-image">
            <img className="image-src" src={`./images/${image}`} />
          </div>

          {/* <div className="row-divider">
            <div className="divider-bar" />
          </div>

          <div className="zone-map">
            <img className="map-src" src={`./maps/${map}`} />
          </div> */}

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          <h3>Reqirements:</h3>

          {/* Row 1 */}
          <div className="item-row">
            {/* QUESTS */}
            <div className="item-detail">
              <div className="detail-img">
                <img
                  className="detail-icon"
                  src="./icons/icon-quest-type.png"
                />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Quests:</h4>
                <p className="detail-text">{requirements.quests}</p>
              </div>
            </div>

            {/* NPCs */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-npc.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">NPCs:</h4>
                <p className="detail-text">{requirements.npcs}</p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="item-row">
            {/* DUNGEONS */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-dungeon.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Dungeons:</h4>
                <p className="detail-text">{requirements.dungeons}</p>
              </div>
            </div>

            {/* POINTS OF INTEREST */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-poi.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Points Of Interest:</h4>
                <p className="detail-text">{requirements.pointsOfInterest}</p>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="item-row">
            {/* MINIBOSSES */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-miniboss.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Mini-Bosses:</h4>
                <p className="detail-text">{requirements.minibosses}</p>
              </div>
            </div>

            {/* BOSSES */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-boss.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Bosses:</h4>
                <p className="detail-text">{requirements.bosses}</p>
              </div>
            </div>
          </div>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          {/* Buttons */}
          <div className="form-row form-row--buttons">
            <button
              className="button button--green"
              onClick={() => {
                props.setCurrentZone({
                  id: id,
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
                  id: id,
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
          <h2>
            {name}
            {/* <Link to={`/zone/${id}`}>{name}</Link> */}
          </h2>
        </>
      )}
    </div>
  );
}

export default ZoneItem;
