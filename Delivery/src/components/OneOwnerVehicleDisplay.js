import React, { useState, useEffect } from "react";
import "./VehicleDisplay.css";

function OneOwnerVehicleDisplay(props) {
  const [ownerContract, setownerContract] = useState();
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  const [content, setcontent] = useState("");
  const [buttonContent, setbuttonContent] = useState('');
  console.log(props.vehicle);

  useEffect(() => {
    if (props.vehicle.isAvailable == true) {
      setcontent("Available");
      setbuttonContent("Unavailable");
    } else {
      setcontent("Not Available");
      setbuttonContent("Available");
    }
  }, []);

  const onclick=()=>{
    props.handleChange(props.vehicle.rc);
  }

  return (
    <>
      <div className="col-md-3 Vehicle-display-2">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`https://ipfs.io/ipfs/${props.vehicle.ipfsHash}`}
            loading="lazy"
            className="card-img-top"
            alt="Image takes time to load from ipfs"
          />
          <div className="card-body">
            <h3 className="card-title"></h3>

            <ul className="list-group list-group-flush mb-2">
              <li className="list-group-item">Rc number: {props.vehicle.rc}</li>
              <li className="list-group-item">
                Name of vehicle: {props.vehicle.name}
              </li>
              <li className="list-group-item">
                Capacity of vehicle: {props.vehicle.capacity} Kg
              </li>
              <li className="list-group-item">
                Price per KM: {props.vehicle.pricePerKm}
              </li>
              <li className="list-group-item">{content}</li>
            </ul>
            <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={onclick}
                >
                  Make it {buttonContent}
                </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneOwnerVehicleDisplay;
