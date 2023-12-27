import "./Item.css";
import { useState } from "react";

function QuestItem(props) {
  const { id, name, type, description, zone, reward, chain } = props;

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h3>{name}</h3>
          <p>Type: {type}</p>
          <p>Zone: {zone}</p>
          <p>description: {description}</p>
          <p>reward type: {reward.type}</p>
          <p>reward Description: {reward.description}</p>
          {/* Buttons */}
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
                  reward: {
                    type: reward.type,
                    description: reward.description,
                  },
                  chain: {
                    name: chain.name,
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
                  reward: {
                    type: reward.type,
                    description: reward.description,
                  },
                  chain: {
                    name: chain.name,
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
        <h3>{name}</h3>
      )}
    </div>
  );
}

export default QuestItem;
