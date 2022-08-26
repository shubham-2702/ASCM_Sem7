import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import VehicleForm from "../VehicleForm";
import { useLocation } from "react-router-dom";
import "../MakeDelivery.css";
import Web3 from "web3";
import { vehicleContractAbi, vehicleContractAddress } from "../StoreAbi";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../DeliveryForm";
import DeliveryVehicleDisplay from "../DeliveryVehicleDisplay";
import pincode from "pincode-distance";

function MakeDelivery() {
  const [account, setaccount] = useState("");
  const [deliveryData, setdeliveryData] = useState();
  const [contract, setcontract] = useState({});
  const [vehicleIsShown, setVehicleIsShown] = useState(false);
  const [deliveryFinalData, setdeliveryFinalData] = useState({
    quantity:'',
    from:'',
    to:'',
    km:0,
    rc:'',
  });
  const navigate = useNavigate();
  const Pincode = new pincode();

  const location = useLocation();
  console.log(location.state.account);
  const metamask = location.state.account;
  // setaccount(metamask);

  const handleNext = (data) => {
    const deliverData = data;
    console.log(deliverData);
    setdeliveryData(deliverData);
    console.log(deliveryData);
    setVehicleIsShown(true);
    // setCurrent(2);
    // setcustomerFirstIsShown(false);
  };

  const handleChoose = (data) => {
    const vehiclerc = data;
    console.log(vehiclerc);
    console.log(deliveryData);
    const distance = Pincode.getDistance(deliveryData.from, deliveryData.to);
    console.log(distance);
    setdeliveryFinalData({
      quantity: deliveryData.quantity,
      from: deliveryData.from,
      to: deliveryData.to,
      km: distance,
      rc: vehiclerc
    })
    console.log(deliveryFinalData);
    if(deliveryFinalData.rc==''){
      alert('Please Click again');
    }
    else{
      navigate("/delivery-confirmation", {
        state: { data: deliveryFinalData },
      });
    }
    
    // setdeliveryData(deliverData);
    // console.log(deliveryData);
    // setVehicleIsShown(true);
    // setCurrent(2);
    // setcustomerFirstIsShown(false);
  };

  useEffect(() => {
    setaccount(metamask);
    console.log(account);
  }, []);

  return (
    <>
      <Navbar account={account} />
      <div className="make-delivery-1">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <DeliveryForm handleNext={handleNext}/>
          </div>
        </div>
      </div>
      {vehicleIsShown && (
            <DeliveryVehicleDisplay
              deliveryData={deliveryData}
              handleChoose={handleChoose}
            />
          )}
    </>
  );
}

export default MakeDelivery;
