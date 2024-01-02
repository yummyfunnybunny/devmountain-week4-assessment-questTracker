import "./Item.css";
import { useState } from "react";

function QuestItem(props) {
  const { id, name, type, description, zone, reward, chain } = props;

  console.log(props.chainObject);

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h2>{name}</h2>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          {/* Row 1 */}
          <div className="item-row">
            {/* TYPE */}
            <div className="item-detail">
              <div className="detail-img">
                <img
                  className="detail-icon"
                  src="./icons/icon-quest-type.png"
                />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Quest Type:</h4>
                <p className="detail-text">{type}</p>
              </div>
            </div>

            {/* ZONE */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-zone.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Zone:</h4>
                <p className="detail-text">{zone}</p>
              </div>
            </div>
          </div>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          {/* Row 2 */}
          <div className="item-row">
            {/* Description */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-talk.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Description:</h4>
                <p className="detail-text">{description}</p>
              </div>
            </div>
          </div>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          {/* Row 3 */}
          <div className="item-row">
            {/* REWARD TYPE */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-reward2.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Reward Type:</h4>
                <p className="detail-text">{reward.type}</p>
              </div>
            </div>

            {/* REWARD DESCRIPTION */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-reward.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Reward Description:</h4>
                <p className="detail-text">{reward.description}</p>
              </div>
            </div>
          </div>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          {/* Row 4 */}
          <div className="item-row">
            {/* Chain Name */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-chain1.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Chain Name:</h4>
                <p className="detail-text">
                  {props.chainObject ? props.chainObject.name : "None"}
                </p>
              </div>
            </div>

            {/* Chain Position */}
            <div className="item-detail">
              <div className="detail-img">
                <img className="detail-icon" src="./icons/icon-chain2.png" />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Chain Position:</h4>
                <p className="detail-text">{+chain.position + 1}</p>
              </div>
            </div>
          </div>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          <div className="form-row form-row--buttons">
            <button
              className="button button--green"
              onClick={() => {
                props.setCurrentQuest({
                  id: id,
                  name: name,
                  type: type,
                  description: description,
                  zone: zone,
                  reward: reward,
                  chain: {
                    id: chain.id,
                    position: chain.position,
                  },
                }),
                  props.setDisplayForm("quest");
              }}
            >
              Edit
            </button>
            <button
              className="button button--red"
              onClick={() => {
                props.setCurrentQuest({
                  id: id,
                  name: name,
                  type: type,
                  description: description,
                  zone: zone,
                  reward: reward,
                  chain: {
                    id: chain.id,
                    position: chain.position,
                  },
                }),
                  props.setDisplayForm("deleteQuest");
              }}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <h2>{name}</h2>
      )}
    </div>
  );
}

export default QuestItem;
