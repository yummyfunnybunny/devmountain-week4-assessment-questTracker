import "./Form.css";
import axios from "axios";

function DeleteZoneForm(props) {
  // ANCHOR submit form
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();
    console.log("deleteZoneForm props:");
    console.log(props);

    // get id to delete
    const zoneId = props.deleteZone.id;
    console.log("deleteZoneForm zoneID:");
    console.log(zoneId);

    // send delete request
    axios
      .delete(`/zone/${zoneId}`)
      .then((res) => {
        console.log(res.data.message);
        props.setZoneData(res.data.zoneData);
      })
      .catch((err) => {
        console.log(err);
      });

    // close the form
    props.setDisplayForm("none");
  };

  // ANCHOR Return JSX
  return (
    <div className="form-background">
      <form className="form" onSubmit={(e) => submitForm(e)}>
        <h3>Are you sure you want to delete this Zone?</h3>
        <p>Any quests associated with this zone will need to be updated</p>
        <div className="form-row form-row--buttons">
          <button className="button button--red" type="submit">
            Delete
          </button>
          <button
            className="button button--green"
            onClick={() => props.setDisplayForm("none")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteZoneForm;
