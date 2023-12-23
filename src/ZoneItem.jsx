import { Link } from "react-router-dom";

function ZoneItem(props) {
  const { zoneId, name, requirements, map, image } = props;

  // console.log(zoneId);

  return (
    <div className="item">
      <h3>
        <Link to={`/zone/${zoneId}`}>{name}</Link>
      </h3>
    </div>
  );
}

export default ZoneItem;
