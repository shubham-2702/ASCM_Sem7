import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import OneOwnerVehicleDisplay from "./OneOwnerVehicleDisplay";
import "./VehicleDisplay.css";
import Web3 from "web3";
import { vehicleContractAbi, vehicleContractAddress } from "./StoreAbi";

function OwnerVehiclesDisplay() {
  const [vehicleContract, setVehicleContract] = useState();
  const [account, setaccount] = useState("");
  const [vehicleData, setvehicleData] = useState();
  const [vehicleCount, setvehicleCount] = useState(0);
  const [check, setcheck] = useState(0);
  const vehicles = [];
  const location = useLocation();
  console.log(location.state.account);

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
      const vehicle = new web3.eth.Contract(
        vehicleContractAbi,
        vehicleContractAddress
      );

      console.log(vehicle);
      setVehicleContract(vehicle);

      console.log(vehicleContract);

      const vehicleRc = await vehicle.methods.vehiclesOfOwner(account).call();
      console.log(vehicleRc);

      const count = vehicleRc.length;
      console.log(count);
      setvehicleCount(count);

      await vehicleRc.reduce(async (promise, rc) => {
        await promise;
        const contents = await vehicle.methods.getVehicle(rc).call();
        console.log(contents);
        vehicles.push(contents);
      }, Promise.resolve());

      console.log(vehicles);
      setvehicleData(vehicles);
    };
    loadBlockchain();
  }, []);

  const handleChange=async(data)=>{
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
    const vehicle = new web3.eth.Contract(
      vehicleContractAbi,
      vehicleContractAddress
    );

    console.log(vehicle);
    setVehicleContract(vehicle);

    console.log(vehicleContract);

    await vehicle.methods.changeState(data).send(
      {
        from: account,
        gas: 300000,
      },
      (error, transactionHash) => {
        console.log(error, transactionHash);
      }
    );;
    window.location.reload(false);
    // setcheck(1);
    // console.log(vehicleRc);

    // const count = vehicleRc.length;
    // console.log(count);
    // setvehicleCount(count);
  }

  return (
    <>
      <Navbar account={account} />
      <div className="Owner-vehicle-display-1">
        <h3>Your Vehicles= {vehicleCount}</h3>
      </div>
      <div className="row  Vehicle-display-1">
        {vehicleData &&
          vehicleData.map((vehicle, i) => {
            return <OneOwnerVehicleDisplay vehicle={vehicle} handleChange={handleChange} key={i} />;
          })}
      </div>
    </>
  );
}

export default OwnerVehiclesDisplay;
