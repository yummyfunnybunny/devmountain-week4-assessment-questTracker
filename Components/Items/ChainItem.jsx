import "./Item.css";
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
          {/* Buttons */}
          <div className="form-row form-row--buttons">
            <button
              className="button button--green"
              onClick={() => {
                props.setCurrentChain({
                  id: id,
                  name: name,
                  quests: quests,
                }),
                  props.setDisplayForm("chain");
              }}
            >
              Edit
            </button>
            <button
              className="button button--red"
              onClick={() => {
                props.setCurrentChain({
                  id: id,
                  name: name,
                  quests: quests,
                }),
                  props.setDisplayForm("deleteChain");
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

export default ChainItem;
