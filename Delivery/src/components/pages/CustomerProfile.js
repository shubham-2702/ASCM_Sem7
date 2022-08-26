import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import About from "../About";
import { useLocation, useNavigate } from "react-router-dom";
import { customerContractAbi, customerContractAddress } from "../StoreAbi";
import Web3 from "web3";
import "../CustomerProfile.css";

function CustomerProfile() {
  const [customeraccount, setaccount] = useState("");
  const [contract, setContract] = useState({});
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  const [address, setaddress] = useState("");
  const [zip, setzip] = useState();
  const [state, setstate] = useState("");
  const [file, setfile] = useState("");

  const location = useLocation();
  console.log(location.state);
  const object = location.state;
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
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const account = accounts[0];
      setaccount(account);
      const contract1 = new web3.eth.Contract(
        customerContractAbi,
        customerContractAddress
      );
      console.log(contract1);
      setContract(contract1);
      console.log(contract);
      const count = await contract1.methods.customerCount().call();
      console.log(count);
      const name = await contract1.methods.getCustomerName(account).call();
      console.log(name);
      setname(name);
      const phone = await contract1.methods.getCustomerPhone(account).call();
      console.log(phone);
      setphone(phone);
      const address = await contract1.methods
        .getCustomerAddress(account)
        .call();
      console.log(address);
      setaddress(address);
      const state = await contract1.methods.getCustomerState(account).call();
      console.log(state);
      setstate(state);
      const zip = await contract1.methods.getCustomerZip(account).call();
      console.log(zip);
      setzip(zip);
      const file = await contract1.methods.getCustomerFile(account).call();
      console.log(file);
      setfile(file);
    };
    loadBlockchain();
  }, []);


  const onClick1 = () => {
    navigate("/make-delivery", {
      state: { account: customeraccount },
    });
  };

  const onClick2 = () => {
    navigate("/customer-deliveries", {
      state: { account: customeraccount },
    });
  };

  return (
    <>
      <Navbar account={customeraccount} />
      <About
        name={name}
        phone={phone}
        address={address}
        state={state}
        zip={zip}
        file={file}
        type="Customer"
      />

<div className="customer-profile-1">
        <button type="button" className="btn btn-dark ms-2 me-2" onClick={onClick1}>
          Make Delivery
        </button>
      {/* </div> */}

      <button type="button" className="btn btn-dark ms-2 me-2" onClick={onClick2}>
          Your Deliveries
        </button>
      </div>
    </>
  );
}

export default CustomerProfile;
