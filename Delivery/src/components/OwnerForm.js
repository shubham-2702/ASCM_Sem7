import React, { useState, useEffect, Component } from "react";
import FirstStep from "./FirstStep";
import Progress from "./Progress";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { ownerContractAbi, ownerContractAddress } from "./StoreAbi";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
// import { Alert } from 'react-alert

function OwnerForm(props) {
  const [ownerFirstIsShown, setownerFirstIsShown] = useState(true);
  const [ownerSecondIsShown, setownerSecondIsShown] = useState(false);
  const [ownerThirdIsShown, setownerThirdIsShown] = useState(false);
  const [current, setCurrent] = useState(1);
  const [ownerHash, setOwnerHash] = useState("");
  const [ownerData, setOwnerData] = useState({});
  const [ownerFinalData, setOwnerFinalData] = useState({});
  const [ownerFileHash, setOwnerFileHash] = useState("");
  const [contract, setContract] = useState();
  const [account, setAccount] = useState("");
  const [stay, setstay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAccount(props.account);
  }, []);

  const handleClick1 = (event) => {
    event.preventDefault();
    setownerFirstIsShown(true);
    setCurrent(1);
    setownerSecondIsShown(false);
    setownerThirdIsShown(false);
    console.log(ownerFirstIsShown, current, ownerSecondIsShown);
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    setownerSecondIsShown(true);
    setCurrent(2);
    setownerFirstIsShown(false);
    setownerThirdIsShown(false);
    console.log(ownerFirstIsShown, current, ownerSecondIsShown);
  };

  const handleClick3 = (event) => {
    event.preventDefault();
    setownerThirdIsShown(true);
    setCurrent(3);
    setownerFirstIsShown(false);
    setownerSecondIsShown(false);
    console.log(ownerFirstIsShown, current, ownerSecondIsShown);
  };

  const handleNext = (data) => {
    const userData = data;
    console.log(userData);
    setOwnerData(userData);
    console.log(ownerData);
    setownerSecondIsShown(true);
    setCurrent(2);
    setownerFirstIsShown(false);
  };

  const handleFileSubmit = (data) => {
    const userFileHash = "https://ipfs.io/ipfs/" + data.hash;
    console.log(userFileHash);
    setOwnerFileHash(userFileHash);
    console.log(ownerFileHash);
    setownerThirdIsShown(true);
    setCurrent(3);
    setownerSecondIsShown(false);
  };

  const handleConfirmSubmit = async (data) => {
    const userData = data;
    console.log(userData);
    setOwnerFinalData(userData);
    console.log(ownerFinalData);
    const name = ownerFinalData.Name;
    const phone = ownerFinalData.PhoneNo;
    const address = ownerFinalData.Address;
    const state = ownerFinalData.State;
    const zip = ownerFinalData.Zip;
    const file = ownerFinalData.Fileurl;

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
    const contract1 = new web3.eth.Contract(
      ownerContractAbi,
      ownerContractAddress
    );
    console.log(contract1);
    setContract(contract1);
    console.log(contract);
    const count = await contract1.methods.ownerCount().call();
    console.log(count);
    console.log(account);
    try{
      await contract1.methods
      .addOwner(account, name, phone, address, zip, state, file)
      .send(
        {
          from: account,
          gas: 300000,
        },
        (error, transactionHash) => {
          console.log(error, transactionHash);
        }
      );
      navigate("/owner-profile", {
        state: { account: account },
      });
    }catch(error){
      console.log(error);
      alert("Whoa whoaa that's too fast to update! Please Click Submit button again.");
      setstay(true);

    }

    
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          {ownerFirstIsShown && (
            <FirstStep handleNext={handleNext} content="Owner" />
          )}
          {ownerSecondIsShown && (
            <SecondStep handleFileSubmit={handleFileSubmit} content="Owner" />
          )}
          {ownerThirdIsShown && (
            <ThirdStep
              userData={ownerData}
              userFileHash={ownerFileHash}
              handleConfirmSubmit={handleConfirmSubmit}
            />
          )}
          <Progress
            handleClick1={handleClick1}
            handleClick2={handleClick2}
            handleClick3={handleClick3}
            current={current}
          />
        </div>
      </div>
    </>
  );
}

export default OwnerForm;
