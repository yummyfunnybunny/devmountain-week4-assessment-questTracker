import "./Item.css";
import { useState } from "react";

function ChainItem(props) {
  const { id, name, quests, questData } = props;
  // console.log(questData);

  const [expand, setExpand] = useState(false);

  return (
    <div className="item" onClick={() => setExpand(!expand)}>
      {expand ? (
        <>
          <h3>{name}</h3>

          <div className="row-divider">
            <div className="divider-bar" />
          </div>

          <div className="chains">
            {quests.map((quest, idx) => {
              const qData = questData.filter((q) => {
                return q.id === quest;
              });
              console.log(qData[0].name);

              return (
                <div className="chain-container" key={quest}>
                  <div className="chain">
                    <h1 className="chain-icon">{idx + 1}</h1>
                    <h3 className="chain-name">{qData[0].name}</h3>
                  </div>

                  {/* Dont display the last chain link arrow */}
                  {idx + 1 < quests.length ? (
                    <div className="chain-link">
                      <ion-icon name="arrow-down-outline"></ion-icon>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>

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
