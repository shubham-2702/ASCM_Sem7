import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ipfs from "./ipfs";
import Web3 from "web3";
import { vehicleContractAbi, vehicleContractAddress } from "./StoreAbi";
import { useNavigate } from "react-router-dom";

function VehicleForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [fileBuffer, setfileBuffer] = useState();
  const [fileHash, setfileHash] = useState("");
  const [isDisabled, setisDisabled] = useState("disabled");
  const [vehicleData, setvehicleData] = useState({
    rc: "",
    ipfsHash: "",
    name: "",
  });
  const [contract, setcontract] = useState({});
  const [account, setaccount] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    console.log(buffer);
    setfileBuffer(buffer);
    console.log(fileBuffer);
  };

  const onFileSubmit = async (event) => {
    event.preventDefault();
    await ipfs.add(fileBuffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      setfileHash(ipfsHash[0].hash);
      console.log(fileHash);
      if (fileHash == "") {
        setErrorMessage('Whoaa whoa that was too fast to update! Please Click Upload button again');
      }else{
        setErrorMessage('');
      }
      setvehicleData({ ipfsHash: ipfsHash[0].hash });
      console.log(vehicleData);
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const name = data.Name;
    const rc = data.Rc;
    const price = data.Price;
    const capacity = data.Capacity;

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
      vehicleContractAbi,
      vehicleContractAddress
    );
    console.log(contract1);
    setcontract(contract1);
    console.log(contract);
    const count = await contract1.methods.vehicleCount().call();
    console.log(count);
    console.log(account);
    console.log(fileHash);
    console.log(name);
    console.log(rc);
    console.log(price);
    console.log(capacity);
    await contract1.methods.addVehicle(rc, fileHash, account, name, price, capacity).send(
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
  };

  return (
    <>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <h3>Register Vehicle</h3>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={captureFile}
          />
        </div>
        <div className="d-grid mb-3">
          <button
            type="upload"
            className="btn btn-primary"
            onClick={onFileSubmit}
          >
            Upload
          </button>
        </div>
        {errorMessage && <p className="error"> {errorMessage} </p>}
        <div className=" col-md-12 mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name of vehicle"
            {...register("Name")}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label>RC number</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter RC number of vehicle"
            {...register("Rc")}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label>Price per KM</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter Price Per KM of vehicle"
            {...register("Price")}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label>Capacity</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter Capacity of vehicle"
            {...register("Capacity")}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default VehicleForm;
