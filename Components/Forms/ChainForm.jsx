import { useState } from "react";
import axios from "axios";
import "./Form.css";

function ChainForm(props) {
  // ANCHOR input States
  const [id, setId] = useState(props.currentChain.id);
  const [name, setName] = useState(props.currentChain.name);
  const [quests, setQuests] = useState(props.currentChain.quests);

  // ANCHOR Functions
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();
    // store input values in object
    const chain = {
      id: id,
      name: name,
      quests: quests,
    };
    // send axios request with new quest data
    if (!props.currentChain.id) {
      axios
        .post("/chain", chain)
        .then((res) => {
          props.setChainData(res.data.chainData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put("/chain", chain)
        .then((res) => {
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
        {!props.currentChain.id ? <h2>Create Chain</h2> : <h2>Edit Chain</h2>}
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

export default ChainForm;
