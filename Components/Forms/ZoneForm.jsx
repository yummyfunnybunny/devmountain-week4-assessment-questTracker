import { useState } from "react";
import axios from "axios";
import "./Form.css";

function ZoneForm(props) {
  console.log("ZONE ID:");
  console.log(props.currentZone.id);
  // ANCHOR input States
  const [id, setId] = useState(props.currentZone.id);
  const [name, setName] = useState(props.currentZone.name);
  const [map, setMap] = useState(props.currentZone.map);
  const [image, setImage] = useState(props.currentZone.image);
  const [reqQuests, setReqQuests] = useState(
    props.currentZone.requirements.quests
  );
  const [reqNpcs, setReqNpcs] = useState(props.currentZone.requirements.npcs);
  const [reqDungeons, setReqDungeons] = useState(
    props.currentZone.requirements.dungeons
  );
  const [reqBosses, setReqBosses] = useState(
    props.currentZone.requirements.bosses
  );
  const [reqMinibosses, setReqMinibosses] = useState(
    props.currentZone.requirements.minibosses
  );
  const [reqPOIs, setReqPOIs] = useState(
    props.currentZone.requirements.pointsOfInterest
  );

  // ANCHOR Functions
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();

    // store input values in object
    const formData = new FormData();

    console.log("map:");
    console.log(map);
    console.log("uploadedMap:");
    // console.log(uploadedMap);
    formData.append("id", id);
    formData.append("map", map);
    formData.append("image", image);
    formData.append("name", name);
    formData.append("quests", reqQuests);
    formData.append("npcs", reqNpcs);
    formData.append("dungeons", reqDungeons);
    formData.append("bosses", reqBosses);
    formData.append("minibosses", reqMinibosses);
    formData.append("pointsOfInterest", reqPOIs);
    console.log("formData:");
    console.log(formData);

    // send axios request with new zone data
    if (!props.currentZone.id) {
      axios
        .post("/zone", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res.data.zoneData:");
          console.log(res.data.message);
          console.log(res.data.zoneData);
          props.setZoneData(res.data.zoneData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put("/zone", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          props.setZoneData(res.data.zoneData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // close form
    props.setDisplayForm("none");
    // display success/fail mesage
    // TODO - make popup alert components for helpful user-friendly alerts
  };

  // ANCHOR Return JSX
  return (
    <div className="form-background">
      <form className="form" onSubmit={(e) => submitForm(e)}>
        {/* ----- HEADER ----- */}
        {!props.currentZone.id ? <h2>Create Zone</h2> : <h2>Edit Zone</h2>}

        {/* ----- NAME ----- */}
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

        {/* ----- MAP ----- */}
        <div className="form-row">
          <label htmlFor="map-input" className="form-label">
            Map:&emsp;
          </label>
          <input
            id="map-input"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="map"
            // value={map}
            onChange={(e) => {
              console.log(e.target);
              // setMapToUpload(e);
              setMap(e.target.files[0]);
            }}
          />
        </div>

        {/* ----- IMAGE ----- */}
        {/* NOTE Having 2 image forms breaks the submission */}

        <div className="form-row">
          <label htmlFor="image-input" className="form-label">
            Image:&emsp;
          </label>
          <input
            id="image-input"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="image"
            // value={image}
            onChange={(e) => {
              console.log(e.target);
              // setImageToUpload(e);
              setImage(e.target.files[0]);
            }}
          />
        </div>

        {/* REQUIREMENTS */}
        {/* <div className="form-row">
          <h4>Zone Requirements</h4>
        </div> */}

        {/* ----- QUESTS ----- */}
        <div className="form-row">
          <label htmlFor="quests-input" className="form-label">
            Quests:&emsp;
          </label>
          <input
            id="quests-input"
            type="number"
            name="quests"
            value={reqQuests}
            onChange={(e) => setReqQuests(e.target.value)}
          />
        </div>

        {/* ----- NPCs ----- */}
        <div className="form-row">
          <label htmlFor="npcs-input" className="form-label">
            NPCs:&emsp;
          </label>
          <input
            id="npcs-input"
            type="number"
            name="npcs"
            value={reqNpcs}
            onChange={(e) => setReqNpcs(e.target.value)}
          />
        </div>

        {/* ----- DUNGEONS ----- */}
        <div className="form-row">
          <label htmlFor="dungeons-input" className="form-label">
            Dungeons:&emsp;
          </label>
          <input
            id="dungeons-input"
            type="number"
            name="dungeons"
            value={reqDungeons}
            onChange={(e) => setReqDungeons(e.target.value)}
          />
        </div>

        {/* ----- BOSSES ----- */}
        <div className="form-row">
          <label htmlFor="bosses-input" className="form-label">
            Bosses:&emsp;
          </label>
          <input
            id="bosses-input"
            type="number"
            name="bosses"
            value={reqBosses}
            onChange={(e) => setReqBosses(e.target.value)}
          />
        </div>

        {/* ----- MINI BOSSES ----- */}
        <div className="form-row">
          <label htmlFor="minibosses-input" className="form-label">
            Mini-Bosses:&emsp;
          </label>
          <input
            id="minibosses-input"
            type="number"
            name="minibosses"
            value={reqMinibosses}
            onChange={(e) => setReqMinibosses(e.target.value)}
          />
        </div>

        {/* ----- POINTS OF INTEREST ----- */}
        <div className="form-row">
          <label htmlFor="poi-input" className="form-label">
            Points Of Interest:&emsp;
          </label>
          <input
            id="poi-input"
            type="number"
            name="poi"
            value={reqPOIs}
            onChange={(e) => setReqPOIs(e.target.value)}
          />
        </div>

        {/* ----- Buttons ----- */}
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

export default ZoneForm;
