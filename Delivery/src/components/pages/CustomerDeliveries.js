import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import OneDeliveryDisplay from "../OneDeliveryDisplay";
import "../MakeDelivery.css";
import {
  deliveryContractAbi,
  deliveryContractAddress,
  vehicleContractAbi,
  vehicleContractAddress,
  ownerContractAbi,
  ownerContractAddress,
} from "../StoreAbi";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

function CustomerDeliveries() {
  const [account, setaccount] = useState();
  const [deliveryContract, setdeliveryContract] = useState();
  const [vehicleContract, setvehicleContract] = useState();
  const [ownerContract, setownerContract] = useState();
  const [deliveryCount, setdeliveryCount] = useState(0);
  const [deliveryDetails, setdeliveryDetails] = useState();
  
  const deliveryDetailsArray=[];
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();

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
      const owner = new web3.eth.Contract(
        ownerContractAbi,
        ownerContractAddress
      );

      console.log(delivery);
      setdeliveryContract(delivery);
      console.log(deliveryContract);

      console.log(vehicle);
      setvehicleContract(vehicle);
      console.log(vehicleContract);

      console.log(owner);
      setownerContract(vehicle);
      console.log(ownerContract);

      const deliveryIds= await delivery.methods.pendingDeliveryDetailsOfCustomer(account).call();
      console.log(deliveryIds);
      const deliveryCount=deliveryIds.length;
      console.log(deliveryCount);
      setdeliveryCount(deliveryCount);
        var status;
      await deliveryIds.reduce(async (promise, id) => {
        await promise;
        const deliveryDetails = await delivery.methods.getDeliveryDetails(id).call();
        console.log(deliveryDetails);
        console.log(deliveryDetails.owner);
        const ownerName= await owner.methods.getOwnerName(deliveryDetails.owner).call();
        console.log(ownerName);
        if(deliveryDetails.isDone==false){
          status="Pending";
        }
        else{
          status="Done"
        }
        const deliverDetail={
            Id:id,
            VehicleRc:deliveryDetails.vehicleRc,
            Owner:ownerName,
            Quantity:deliveryDetails.quantity,
            Status: status,
            lat:deliveryDetails.lat,
            long:deliveryDetails.long
        }
        deliveryDetailsArray.push(deliverDetail);
      }, Promise.resolve());
      console.log(deliveryDetailsArray);
      setdeliveryDetails(deliveryDetailsArray);
      console.log(deliveryDetails);

    //   const vehiclecount = await vehicle.methods.vehicleCount().call();
    //   console.log(vehiclecount);
    //   const vehicleData = await vehicle.methods.getVehicle(rc).call();
    //   console.log(vehicleData);
    //   setvehicle(vehicleData);
    //   console.log(vehicledata);

      

    //   console.log(owner);

    //   setownerContract(owner);
    //   console.log(ownerContract);
    //   const count = await owner.methods.ownerCount().call();
    //   console.log(count);
    //   const name = await owner.methods.getOwnerName(vehicleData.owner).call();
    //   console.log(name);
    //   setname(name);
    //   const phone = await owner.methods.getownerPhone(vehicleData.owner).call();
    //   console.log(phone);
    //   setphone(phone);

    //   const pay = location.state.data.km * vehicleData.pricePerKm;
    //   setpay(pay);
    };

    loadBlockchain();
  }, []);

  const onClickLocation=(data1,data2)=>{
    navigate("/map", {
      state: { lat:data1,long:data2 },
    });
  }

  return (
    <>
      <Navbar account={account} />
      <div className="make-delivery-1 mb-3">
        <h3>Your Deliveries= {deliveryCount}</h3>
      </div>

      <div className="row">
      {deliveryDetails && deliveryDetails.map((detail, i) => {
          return <OneDeliveryDisplay detail={detail} handleClick={onClickLocation} key={i} />;
        })}
        {/* <OneDeliveryDisplay /> */}
      </div>
    </>
  );
}

export default CustomerDeliveries;
