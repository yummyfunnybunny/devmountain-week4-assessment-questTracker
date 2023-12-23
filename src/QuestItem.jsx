import "./QuestItem.css";
import { useState } from "react";

function QuestItem(props) {
  const { id, name, type, description, zone, reward, chain } = props;

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h3>{name}</h3>
          <p>Type:{type}</p>
          <p>Zone:{zone}</p>
          <p>description:{description}</p>
          <p>reward type:{reward.type}</p>
          <p>reward type:{reward.description}</p>
        </>
      ) : (
        <h3>{name}</h3>
      )}
    </div>
  );
}

export default QuestItem;
