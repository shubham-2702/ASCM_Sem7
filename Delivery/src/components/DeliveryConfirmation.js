import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
  vehicleContractAbi,
  vehicleContractAddress,
  ownerContractAbi,
  ownerContractAddress,
  deliveryContractAbi,
  deliveryContractAddress
} from "./StoreAbi";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./MakeDelivery.css";
import pincode from "pincode-distance";


function DeliveryConfirmation() {
  const [account, setaccount] = useState("");
  const [vehicleContract, setVehicleContract] = useState();
  const [ownerContract, setownerContract] = useState();
  const [deliveryContract, setdeliveryContract] = useState();
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  const [zipcode, setzipcode] = useState();
  const [vehicledata, setvehicle] = useState();
  const [pay, setpay] = useState(0);
  const Pincode=new pincode();
  const location = useLocation();
  console.log(location.state);

  const navigate = useNavigate();
  

  useEffect(() => {
    const rc = location.state.data.rc;
    console.log(rc);

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
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const account = accounts[0];
      setaccount(account);
      const bal= await web3.eth.getBalance(account);
      const balance= await web3.utils.fromWei(bal);
      console.log(bal, balance);
      const vehicle = new web3.eth.Contract(
        vehicleContractAbi,
        vehicleContractAddress
      );

      console.log(vehicle);
      setVehicleContract(vehicle);

      console.log(vehicleContract);
      const vehiclecount = await vehicle.methods.vehicleCount().call();
      console.log(vehiclecount);
      const vehicleData = await vehicle.methods.getVehicle(rc).call();
      console.log(vehicleData);
      setvehicle(vehicleData);
      console.log(vehicledata);

      const owner = new web3.eth.Contract(
        ownerContractAbi,
        ownerContractAddress
      );

      console.log(owner);

      setownerContract(owner);
      console.log(ownerContract);
      const count = await owner.methods.ownerCount().call();
      console.log(count);
      const name = await owner.methods.getOwnerName(vehicleData.owner).call();
      console.log(name);
      setname(name);
      const phone = await owner.methods.getownerPhone(vehicleData.owner).call();
      console.log(phone);
      setphone(phone);
      const zip = await owner.methods.getownerZip(vehicleData.owner).call();
      console.log(zip);
      setzipcode(zip);

      const pay = location.state.data.km * vehicleData.pricePerKm;
      setpay(pay);
    };

    loadBlockchain();
  }, []);

  const onClickSubmit = async() => {
    const from= location.state.data.from;
    const to= location.state.data.to;
    const quantity= location.state.data.quantity
    const locate = Pincode.getlatLng(zipcode);
    console.log(locate);
    var lat=locate.lat;
    var long=locate.lng;
    lat=lat.toString();
    long=long.toString();
    console.log(lat,long);
    const ownerAdd=vehicledata.owner;
    const rc=location.state.data.rc;
    console.log(rc);
    console.log(ownerAdd);
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
      console.log(web3);
    //   const accounts = await web3.eth.getAccounts();
    //   console.log(accounts[0]);
    //   const account = accounts[0];
    //   setaccount(account);
    const payment= await web3.utils.toWei(String(pay));
    console.log(payment);

    const bal= await web3.eth.getBalance(account);
      const balance= await web3.utils.fromWei(bal);
      console.log(bal, balance);
    if(balance>pay){
        const tx= await web3.eth.sendTransaction({from: account, to: ownerAdd, value: payment});
    console.log(tx);
    const delivery = new web3.eth.Contract(
        deliveryContractAbi,
        deliveryContractAddress
      );
      console.log(delivery);
      setdeliveryContract(delivery);
      const unique_id = uuid();
      const small_id = unique_id.slice(0,8);
      await delivery.methods.addDelivery(rc, account, ownerAdd, small_id, from, to, quantity, lat, long).send(
        {
          from: account,
          gas: 300000,
        },
        (error, transactionHash) => {
          console.log(error, transactionHash);
        }
      );
      navigate("/customer-profile", {
        state: { account: account },
      });
      
    }
    else{
        alert('Bhai paise nhi hain');
    }
    


    
      
  };

  return (
    <>
    <Navbar account={account} />
    <div className="make-delivery-1">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Confirm Your Details</h3>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              Quantity: {location.state.data.quantity}
            </li>
            <li className="list-group-item">
              From: {location.state.data.from}
            </li>
            <li className="list-group-item">To: {location.state.data.to}</li>
            <li className="list-group-item">
              Total Km: {location.state.data.km} km
            </li>
            <li className="list-group-item">
              Vehicle Rc: {location.state.data.rc}
            </li>
            <li className="list-group-item">
              Vehcle Name: {vehicledata && vehicledata.name}
            </li>
            <li className="list-group-item">
              Vehicle Price per km: {vehicledata && vehicledata.pricePerKm}{" "}
              ether
            </li>
            <li className="list-group-item">
              Owner of vehicle: {name} ({phone})
            </li>
            <li className="list-group-item">
              Vehicle Photo:{" "}
              <img
                src={`https://ipfs.io/ipfs/${
                  vehicledata && vehicledata.ipfsHash
                }`}
                height="50%"
                width="50%"
              ></img>
            </li>
            <li className="list-group-item">
              Total Amount to pay: {pay} ether
            </li>
          </ul>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onClickSubmit}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default DeliveryConfirmation;
