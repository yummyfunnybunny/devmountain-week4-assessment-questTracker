import { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function QuestForm(props) {
  // ANCHOR input States
  const [id, setId] = useState(props.currentQuest.id);
  const [name, setName] = useState(props.currentQuest.name);
  const [type, setType] = useState(props.currentQuest.type);
  const [zone, setZone] = useState(props.currentQuest.zone);
  const [description, setDescription] = useState(
    props.currentQuest.description
  );
  const [rewardType, setRewardType] = useState(props.currentQuest.reward.type);
  const [rewardDesc, setRewardDesc] = useState(
    props.currentQuest.reward.description
  );
  const [chainId, setChainId] = useState(props.currentQuest.chain.id);
  const [chainPos, setChainPos] = useState(props.currentQuest.chain.position);
  const [chosenChain, setChosenChain] = useState(
    props.chainData.filter((chain, idx) => {
      return chain.id === chainId;
    })
  );

  // console.log("props:");
  // console.log(props);

  // useEffect(() => {
  //   const chooseChain = props.chainData.filter((chain) => {
  //     return chain.id === chainId;
  //   });
  //   setChosenChain(chooseChain);
  // }, []);
  console.log("chosenChain:");
  console.log(chosenChain);
  console.log("chosenChain.length:");
  console.log(chosenChain.length);
  console.log("chainId:");
  console.log(chainId);

  // ANCHOR Functions
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();

    // store input values in object
    const quest = {
      id: id,
      name: name,
      type: type,
      description: description,
      zone: zone,
      reward: {
        type: rewardType,
        description: rewardDesc,
      },
      chain: {
        id: chainId,
        position: chainPos,
      },
    };

    console.log(quest);

    // send axios request with new quest data
    if (!props.currentQuest.id) {
      console.log("POST REQUEST SENT");
      axios
        .post("/quest", quest)
        .then((res) => {
          console.log(res.data.message);
          props.setQuestData(res.data.questData);
          // props.setChainData(res.data.chainData);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      console.log("PUT REQUEST SENT");
      axios
        .put(`/quest`, quest)
        .then((res) => {
          console.log(res.data.message);
          props.setQuestData(res.data.questData);
          props.setChainData(res.data.chainData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // close form
    props.setDisplayForm("none");

    // display success/fail mesage
  };

  // ANCHOR Return JSX
  return (
    <div className="form-background">
      <form className="form" onSubmit={(e) => submitForm(e)}>
        {/* HEADER */}
        {!props.currentQuest.id ? <h2>Create Quest</h2> : <h2>Edit Quest</h2>}
        {/* NAME */}
        <div className="form-row">
          <label htmlFor="name-input" className="form-label">
            Name:&emsp;
          </label>
          <input
            id="name-input"
            type="text"
            name="name"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* TYPE */}
        <div className="form-row">
          <label htmlFor="type-input" className="form-label">
            Type:&emsp;
          </label>
          <select
            id="type-input"
            name="type"
            className="form-input"
            required
            // value={type}
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          >
            {/* TODO these options should be dynamic as well */}
            <option value="" disabled>
              - Choose Quest Type -
            </option>
            <option value="kill">Kill</option>
            <option value="gather">Gather</option>
            <option value="find">Find</option>
            <option value="escort">Escort</option>
            <option value="defend">Defend</option>
          </select>
        </div>

        {/* ZONE */}
        <div className="form-row">
          <label htmlFor="zone-input" className="form-label">
            Zone:&emsp;
          </label>
          <select
            id="zone-input"
            name="zone"
            className="form-input"
            required
            // value={zone}
            defaultValue={zone}
            onChange={(e) => setZone(e.target.value)}
          >
            <option value="" disabled>
              - Choose Zone -
            </option>
            {props.zoneData.map((z) => {
              return <option value={z.name}>{z.name}</option>;
            })}
          </select>
        </div>

        {/* Description */}
        <div className="form-row">
          <label htmlFor="description-input" className="form-label">
            Description:&emsp;
          </label>
          <input
            id="description-input"
            className="form-input"
            type="textarea"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Reward Type */}
        <div className="form-row">
          <label htmlFor="reward-type-input" className="form-label">
            Reward Type:&emsp;
          </label>
          <select
            id="reward-type-input"
            name="reward-type"
            className="form-input"
            required
            // value={rewardType}
            defaultValue={rewardType}
            onChange={(e) => setRewardType(e.target.value)}
          >
            {/* TODO this should be dynamic as well */}
            <option value="" disabled>
              - Choose Reward Type -
            </option>
            <option value="money">Money</option>
            <option value="item">Item</option>
            <option value="Secret Exit">Secret Exit</option>
            <option value="Dungeon">Dungeon</option>
            <option value="secret-boss">Secret Boss</option>
            <option value="point-of-interest">Point Of Interest</option>
            <option value="secret-level">Secret Level</option>
          </select>
        </div>

        {/* Reward Description */}
        <div className="form-row">
          <label htmlFor="reward-description-input" className="form-label">
            Reward Description:&emsp;
          </label>
          <input
            id="reward-description-input"
            className="form-input"
            type="textarea"
            name="reward-description"
            required
            value={rewardDesc}
            onChange={(e) => setRewardDesc(e.target.value)}
          />
        </div>

        {/* Quest Chain Name */}
        <div className="form-row">
          <label htmlFor="chain-name-input" className="form-label">
            Chain Name:&emsp;
          </label>
          <select
            id="chain-name-input"
            name="chain-name"
            className="form-input"
            required
            // value={chainId}
            defaultValue={chainId}
            onChange={(e) => {
              setChainId(e.target.value);
              setChosenChain([
                props.chainData.find((c) => {
                  return c.id === e.target.value;
                }),
              ]);
            }}
          >
            <option value="" selected disabled>
              - Choose Chain -
            </option>
            <option value="">None</option>
            {props.chainData.map((chain) => {
              return <option value={chain.id}>{chain.name}</option>;
            })}
          </select>
        </div>

        {/* Quest Chain Position */}
        <div className="form-row">
          <label htmlFor="chain-position-input" className="form-label">
            Chain Position:&emsp;
          </label>
          <select
            id="chain-position-input"
            className="form-input"
            // required
            // value={chainPos}
            defaultValue={chainPos}
            onChange={(e) => setChainPos(e.target.value)}
          >
            <option value="" disabled>
              - Choose Chain Position -
            </option>
            {chosenChain.length > 0 && chosenChain[0] ? (
              chosenChain[0].quests.map((q, idx) => {
                return <option value={idx}>{idx + 1}</option>;
              })
            ) : (
              <></>
            )}
            {/* If creating new quest, provide ability to place at chain length +1 */}
            {chosenChain.length > 0 ? (
              <option value={chosenChain[0].quests.length}>
                {chosenChain[0].quests.length + 1}
              </option>
            ) : (
              <></>
            )}
          </select>
        </div>

        {/* Buttons */}
        <div className="form-row form-row--buttons">
          <button className="button button--green" type="submit">
            Save
          </button>
          <button
            className="button button--red"
            onClick={() => props.setDisplayForm("none")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestForm;
