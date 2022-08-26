import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import About from "../About";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ownerContractAbi,
  ownerContractAddress,
  vehicleContractAbi,
  vehicleContractAddress,
} from "../StoreAbi";
import "../OwnerProfile.css";
import Web3 from "web3";
import VehicleDisplay from "../DeliveryVehicleDisplay";
import OneVehicleDisplay from "../OneDeliveryVehicleDisplay";

function OwnerProfile() {
  const [owneraccount, setaccount] = useState("");
  const [ownerContract, setOwnerContract] = useState({});
  const [vehicleContract, setVehicleContract] = useState({});
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  const [address, setaddress] = useState("");
  const [zip, setzip] = useState();
  const [state, setstate] = useState("");
  const [file, setfile] = useState("");
  const navigate = useNavigate();
  const [vehicleData, setvehicleData] = useState([]);
  const vehicles = [];

  const location = useLocation();
  console.log(location.state);
  const object = location.state;

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
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const account = accounts[0];
      setaccount(account);
      const owner = new web3.eth.Contract(
        ownerContractAbi,
        ownerContractAddress
      );
      const vehicle = new web3.eth.Contract(
        vehicleContractAbi,
        vehicleContractAddress
      );
      console.log(owner);
      console.log(vehicle);
      setVehicleContract(vehicle);
      setOwnerContract(owner);
      console.log(ownerContract);
      console.log(vehicleContract);
      const vehiclecount = await vehicle.methods.vehicleCount().call();
      console.log(vehiclecount);
      const count = await owner.methods.ownerCount().call();
      console.log(count);
      const name = await owner.methods.getOwnerName(account).call();
      console.log(name);
      setname(name);
      const phone = await owner.methods.getownerPhone(account).call();
      console.log(phone);
      setphone(phone);
      const address = await owner.methods.getownerAddress(account).call();
      console.log(address);
      setaddress(address);
      const state = await owner.methods.getownerState(account).call();
      console.log(state);
      setstate(state);
      const zip = await owner.methods.getownerZip(account).call();
      console.log(zip);
      setzip(zip);
      const file = await owner.methods.getownerFile(account).call();
      console.log(file);
      setfile(file);

      const vehicleRc = await vehicle.methods.vehiclesOfOwner(account).call();
      console.log(vehicleRc);

      await vehicleRc.reduce(async (promise, rc) => {
        await promise;
        const contents = await vehicle.methods.getVehicle(rc).call();
        console.log(contents);
        vehicles.push(contents);
        console.log(vehicles);
      }, Promise.resolve());

      setvehicleData(vehicles);
      console.log(vehicleData);
    };
    loadBlockchain();
  }, []);

  const onClickRegister = () => {
    navigate("/vehicle-register", {
      state: { account: owneraccount },
    });
  };

  const onClickVehicles = () => {
    navigate("/display-owner-vehicles", {
      state: { account: owneraccount },
    });
  };

  const onClickOrders = () => {
    navigate("/owner-orders", {
      state: { account: owneraccount },
    });
  };

  return (
    <>
      <Navbar account={owneraccount} />
      <About
        name={name}
        phone={phone}
        address={address}
        state={state}
        zip={zip}
        file={file}
        type="Owner"
      />
      <div className="owner-profile-1">
        <button
          type="button"
          className="btn btn-dark ms-2 me-2"
          onClick={onClickRegister}
        >
          Register Vehicle
        </button>
        <button
          type="button"
          className="btn btn-dark ms-2 me-2"
          onClick={onClickVehicles}
        >
          Your Vehicles
        </button>
        <button
          type="button"
          className="btn btn-dark ms-2 me-2"
          onClick={onClickOrders}
        >
          Your Orders
        </button>
      </div>

      {/* {<VehicleDisplay vehicleData={vehicleData} />} */}
    </>
  );
}

export default OwnerProfile;
