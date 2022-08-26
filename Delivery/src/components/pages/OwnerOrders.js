import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import OneOrderDisplay from "../OneOrderDisplay";
import "../MakeDelivery.css";
import {
  deliveryContractAbi,
  deliveryContractAddress,
  vehicleContractAbi,
  vehicleContractAddress,
  ownerContractAbi,
  ownerContractAddress,
  customerContractAbi,
  customerContractAddress,
} from "../StoreAbi";
import Web3 from "web3";
import pincode from "pincode-distance";

function OwnerOrders() {
  const [account, setaccount] = useState();
  const [deliveryContract, setdeliveryContract] = useState();
  const [vehicleContract, setvehicleContract] = useState();
  const [customerContract, setcustomerContract] = useState();
  const [deliveryCount, setdeliveryCount] = useState(0);
  const [deliveryDetails, setdeliveryDetails] = useState();
  const Pincode=new pincode();
  const deliveryDetailsArray = [];
  const location = useLocation();
  console.log(location.state);

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
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const account = accounts[0];
      setaccount(account);
      const delivery = new web3.eth.Contract(
        deliveryContractAbi,
        deliveryContractAddress
      );
      const vehicle = new web3.eth.Contract(
        vehicleContractAbi,
        vehicleContractAddress
      );
      const customer = new web3.eth.Contract(
        customerContractAbi,
        customerContractAddress
      );

      console.log(delivery);
      setdeliveryContract(delivery);
      console.log(deliveryContract);

      console.log(vehicle);
      setvehicleContract(vehicle);
      console.log(vehicleContract);

      console.log(customer);
      setcustomerContract(customer);
      console.log(customerContract);

      const deliveryIds = await delivery.methods
        .pendingDeliveryDetailsOfOwner(account)
        .call();
      console.log(deliveryIds);
      const deliveryCount = deliveryIds.length;
      console.log(deliveryCount);
      setdeliveryCount(deliveryCount);
      var status;
      await deliveryIds.reduce(async (promise, id) => {
        await promise;
        const deliveryDetails = await delivery.methods
          .getDeliveryDetails(id)
          .call();
        console.log(deliveryDetails);
        console.log(deliveryDetails.customer);
        const customerName = await customer.methods
          .getCustomerName(deliveryDetails.customer)
          .call();
        console.log(customerName);
        if(deliveryDetails.isDone==false){
          status="Pending";
        }
        else{
          status="Done"
        }
        const deliverDetail = {
          Id: id,
          VehicleRc: deliveryDetails.vehicleRc,
          Customer: customerName,
          Quantity:deliveryDetails.quantity,
            Status: status
        };
        deliveryDetailsArray.push(deliverDetail);
      }, Promise.resolve());
      console.log(deliveryDetailsArray);
      setdeliveryDetails(deliveryDetailsArray);
      console.log(deliveryDetails);

     
    };

    loadBlockchain();
  }, []);

  const onClickUpdate= async(data,zipcode) =>{
    const locate=Pincode.getlatLng(zipcode);
    var lat=locate.lat;
    lat=lat.toString();
    var long=locate.lng;
    long=long.toString();
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
    const delivery = new web3.eth.Contract(
      deliveryContractAbi,
      deliveryContractAddress
    );
console.log(data, lat, long);
    await delivery.methods.updateLatLong(data, lat, long).send(
      {
        from: account,
        gas: 300000,
      },
      (error, transactionHash) => {
        console.log(error, transactionHash);
      }
    );

  }

  return (
    <>
      <Navbar account={account} />
      <div className="make-delivery-1 mb-3">
        <h3>Your Orders= {deliveryCount}</h3>
      </div>

      <div className="row">
        {deliveryDetails &&
          deliveryDetails.map((detail, i) => {
            return <OneOrderDisplay detail={detail} handleUpdate={onClickUpdate} key={i} />;
          })}
        {/* <OneDeliveryDisplay /> */}
      </div>
    </>
  );
}

export default OwnerOrders;
