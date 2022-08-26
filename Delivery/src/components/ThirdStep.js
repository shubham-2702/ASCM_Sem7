import React, { useState } from "react";
import ipfs from "./ipfs";
import "./thirdStep.css";

const ThirdStep = (props) => {
  console.log(props.userData);
  console.log(props.userFileHash);
  const [userHash, setuserHash] = useState("");

  const [userFinalData, setuserFinalData] = useState({
    Name: props.userData.Name,
    PhoneNo: props.userData.PhoneNo,
    Address: props.userData.Address,
    Zip: props.userData.Zip,
    State: props.userData.State,
    Fileurl: props.userFileHash,
  });

  const onClickSubmit = async (event) => {
    event.preventDefault();
    console.log(userFinalData);
    props.handleConfirmSubmit(userFinalData);
  };

  return (
    <>
      <h3>Confirm Your Details</h3>
      <ul className="list-group mb-3">
        <li className="list-group-item">Name: {props.userData.Name}</li>
        <li className="list-group-item">Phone: {props.userData.PhoneNo}</li>
        <li className="list-group-item">Address: {props.userData.Address}</li>
        <li className="list-group-item">Zip: {props.userData.Zip}</li>
        <li className="list-group-item">State: {props.userData.State}</li>
        <li className="list-group-item">
          File: <img src={props.userFileHash} height="50%" width="50%"></img>
        </li>
      </ul>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onClickSubmit}
        >
          Confirm and Submit
        </button>
      </div>
    </>
  );
};

export default ThirdStep;
