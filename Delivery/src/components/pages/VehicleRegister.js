import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import VehicleForm from "../VehicleForm";
import { useLocation } from "react-router-dom";
import "../OwnerProfile.css";
import Web3 from "web3";
import { vehicleContractAbi, vehicleContractAddress } from "../StoreAbi";
import { useNavigate } from "react-router-dom";

function VehicleRegister() {
  const [account, setaccount] = useState("");
  const [vehicleFinalData, setvehicleFinalData] = useState({});
  const [contract, setcontract] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state.account);
  const metamask = location.state.account;
  // setaccount(metamask);

  useEffect(() => {
    setaccount(metamask);
    console.log(account);
  }, []);

  return (
    <>
      <Navbar account={account} />
      <div className="vehicle-register-1">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <VehicleForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleRegister;
