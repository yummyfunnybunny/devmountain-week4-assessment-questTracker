import { useState } from "react";

function ChainItem(props) {
  const { id, name, quests } = props;

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h3>{name}</h3>
          <p>Chain: {quests}</p>
        </>
      ) : (
        <h3>{name}</h3>
      )}
    </div>
  );
}

export default ChainItem;
