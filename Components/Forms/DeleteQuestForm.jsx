import axios from "axios";
import "./Form.css";

function DeleteQuestForm(props) {
  // ANCHOR submit form
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();
    // console.log(props);

    // get id to delete
    const questId = props.deleteQuest.id;
    // console.log(questId);

    // send delete request
    axios
      .delete(`/quest/${questId}`)
      .then((res) => {
        console.log(res.data.message);
        props.setQuestData(res.data.questData);
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
        <h3>Are you sure you want to delete this quest?</h3>
        <div className="form-row form-row--buttons">
          <button className="form-button form-button--red" type="submit">
            Delete
          </button>
          <button
            className="form-button form-button form-button--green"
            onClick={() => props.setDisplayForm("none")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteQuestForm;
