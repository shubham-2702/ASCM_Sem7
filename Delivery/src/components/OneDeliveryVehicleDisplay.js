import React, { useState, useEffect } from "react";
import "./VehicleDisplay.css";
import { ownerContractAbi, ownerContractAddress } from "./StoreAbi";
import Web3 from "web3";

function OneDeliveryVehicleDisplay(props) {
  const [ownerContract, setownerContract] = useState();
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  console.log(props.vehicle);

  useEffect(() => {
    const loadBlockchain = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
      const web3 = window.web3;

      const owner = new web3.eth.Contract(
        ownerContractAbi,
        ownerContractAddress
      );

      console.log(owner);

      setownerContract(owner);
      console.log(ownerContract);

      const count = await owner.methods.ownerCount().call();
      console.log(count);
      const name = await owner.methods.getOwnerName(props.vehicle.owner).call();
      console.log(name);
      setname(name);
      const phone = await owner.methods
        .getownerPhone(props.vehicle.owner)
        .call();
      console.log(phone);
      setphone(phone);
    };
    loadBlockchain();
  }, []);

  const onClick = () => {
    props.handleChoose(props.vehicle.rc);
  };

  return (
    <>
      <div className="col-md-3 Vehicle-display-2">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`https://ipfs.io/ipfs/${props.vehicle.ipfsHash}`}
            className="card-img-top"
            alt="Image takes time to load from ipfs"
          />
          <div className="card-body">
            <h3 className="card-title"></h3>

            <ul className="list-group list-group-flush">
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
              <li className="list-group-item">Owner: {name}</li>
              <li className="list-group-item">Owner Contact: {phone}</li>
            </ul>
            <a class="btn btn-primary mt-3" onClick={onClick}>
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneDeliveryVehicleDisplay;
