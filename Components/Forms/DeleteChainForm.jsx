import "./Form.css";
import axios from "axios";

function DeleteChainForm(props) {
  // ANCHOR submit form
  const submitForm = (e) => {
    // prevent refresh
    e.preventDefault();
    // console.log(props);

    // get id to delete
    const chainId = props.deleteChain.id;
    // console.log(chainId);

    // send delete request
    axios
      .delete(`/chain/${chainId}`)
      .then((res) => {
        console.log(res.data.message);
        props.setChainData(res.data.chainData);
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
        <h3>Are you sure you want to delete this Chain?</h3>
        <p>Any quests associated with this chain will be need to be updated</p>
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

export default DeleteChainForm;
