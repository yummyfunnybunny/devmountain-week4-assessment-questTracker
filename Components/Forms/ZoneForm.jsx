import { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function ZoneForm(props) {
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

  // ANCHOR == Set Images for Uploading ==
  // NOTE - I cant directly use 'setMap()' inside the onChange event handler on line 168 to set the image without getting an interesting error
  // So i have to use the below 7 lines of code as a work-around
  let uploadedMap;
  useEffect(() => {
    setMap(uploadedMap);
  }, []);
  const setMapToUpload = (e) => {
    uploadedMap = e.target.files[0];
  };

  // NOTE - this is identical code to the above 7 lines, but for the commented out 2nd image input on line 179
  // let uploadedImage;
  // useEffect(() => {
  //   setMap(uploadedImage);
  // }, []);
  // const setImageToUpload = (e) => {
  //   uploadedImage = e.target.files[0];
  // };

  // ANCHOR Functions
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();

    // store input values in object
    const formData = new FormData();

    // NOTE - the below code was an attempt to do multiple 'append' functions on my formData and build one large formData that I'd submit in my post request
    // formData.append("id", id);
    // formData.append("name", name);

    // const zoneRequirements = {
    //   quests: reqQuests,
    //   npcs: reqNpcs,
    //   dungeons: reqDungeons,
    //   bosses: reqBosses,
    //   minibosses: reqMinibosses,
    //   pointsOfInterest: reqPOIs,
    // };

    // formData.append("requirements", zoneRequirements);
    // formData.append({
    //   id: id,
    //   name: name,
    //   requirements: {
    //     quests: reqQuests,
    //     npcs: reqNpcs,
    //     dungeons: reqDungeons,
    //     bosses: reqBosses,
    //     minibosses: reqMinibosses,
    //     pointsOfInterest: reqPOIs,
    //   },
    // });

    // const zone = {
    //   id: id,
    //   name: name,
    //   requirements: {
    //     quests: reqQuests,
    //     npcs: reqNpcs,
    //     dungeons: reqDungeons,
    //     bosses: reqBosses,
    //     minibosses: reqMinibosses,
    //     pointsOfInterest: reqPOIs,
    //   },
    // };

    console.log(map);
    console.log(uploadedMap);
    formData.append("map", uploadedMap);
    // formData.append("image", uploadedImage);

    // send axios request with new zone data
    if (!props.currentZone.id) {
      console.log(formData);
      axios
        .post("/zone", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.zoneData);
          props.setZoneData(res.data.zoneData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put("/zone", zone)
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
  };

  // ANCHOR Return JSX
  return (
    <div className="form-background">
      <form
        className="form"
        // encType="multipart/form-data"
        // action="/upload"
        onSubmit={(e) => submitForm(e)}
      >
        {/* HEADER */}
        {!props.currentZone.id ? <h2>Create Zone</h2> : <h2>Edit Zone</h2>}

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

        {/* MAP */}
        <div className="form-row">
          <label htmlFor="map-input" className="form-label">
            Map:&emsp;
          </label>
          <input
            id="map-input"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="map"
            value={map}
            onChange={(e) => {
              console.log(e.target);
              setMapToUpload(e);
            }}
          />
        </div>

        {/* IMAGE */}
        {/* NOTE Having 2 image forms breaks the submission */}

        {/* <div className="form-row">
          <label htmlFor="image-input" className="form-label">
            Image:&emsp;
          </label>
          <input
            id="image-input"
            type="file"
            accept=".png, .jpeg, .jpg"
            name="image"
            value={image}
            onChange={(e) => {
              console.log(e.target);
              setImageToUpload(e);
            }}
          />
        </div> */}

        {/* REQUIREMENTS */}
        {/* <div className="form-row">
          <h4>Zone Requirements</h4>
        </div> */}

        {/* QUESTS */}
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

        {/* NPCs */}
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

        {/* DUNGEONS */}
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

        {/* BOSSES */}
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

        {/* MINI BOSSES */}
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

        {/* POINTS OF INTEREST */}
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

export default ZoneForm;
