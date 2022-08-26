import React, { useState, useEffect } from "react";
import OneDeliveryVehicleDisplay from "./OneDeliveryVehicleDisplay";
import Web3 from "web3";
import { ownerContractAbi, ownerContractAddress, vehicleContractAbi, vehicleContractAddress } from "./StoreAbi";
import "./VehicleDisplay.css";
import { Navigate, useNavigate } from "react-router-dom";

function DeliveryVehicleDisplay(props) {
  console.log(props);
  const [vehicleData, setvehicleData] = useState([]);
  const [account, setaccount] = useState();
  const [ownerContract, setownerContract] = useState();
  const [vehicleContract, setVehicleContract] = useState();
  const [vehicleAvailable, setvehicleAvailable] = useState(true);
  const navigate=useNavigate();
  const rcArr=[];
  const arrayRc=[];
  const vehicles=[];
  useEffect(() => {
    // setvehicleData(props.vehicleData);
    // console.log(vehicleData);

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
      setownerContract(owner);
      console.log(ownerContract);
      console.log(vehicleContract);
      const vehiclecount = await vehicle.methods.vehicleCount().call();
      console.log(vehiclecount);
      const count = await owner.methods.ownerCount().call();
      console.log(count);

      const ownersInZip = await owner.methods.ownersInZip(props.deliveryData.from).call();
      console.log(ownersInZip);

      
      await ownersInZip.reduce(async (promise, account) => {
          await promise;
          const vehicleRc = await vehicle.methods.vehiclesOfOwner(account).call();
          console.log(vehicleRc);
          rcArr.push(vehicleRc);
        }, Promise.resolve());

      console.log(rcArr);

      rcArr.forEach(arrayr => {
        arrayr.forEach(element => {
          arrayRc.push(element);
        });
      });
      console.log(arrayRc);

      await arrayRc.reduce(async (promise, rc) => {
          await promise;
          const contents = await vehicle.methods.getVehicle(rc).call();
          console.log(contents);
          if(contents.isAvailable==true){
            vehicles.push(contents);
          }
          
        }, Promise.resolve());

        console.log(vehicles);
        setvehicleData(vehicles);
        if(vehicles.length==0){
          alert("No vehicles available in this area right now");
          navigate("/customer-profile", {
            state: { account: account },
          });
          setvehicleAvailable(false);
        }
      // const name = await owner.methods.getOwnerName(account).call();
      // console.log(name);
      // setname(name);
      // const phone = await owner.methods.getownerPhone(account).call();
      // console.log(phone);
      // setphone(phone);
      // const address = await owner.methods.getownerAddress(account).call();
      // console.log(address);
      // setaddress(address);
      // const state = await owner.methods.getownerState(account).call();
      // console.log(state);
      // setstate(state);
      // const zip = await owner.methods.getownerZip(account).call();
      // console.log(zip);
      // setzip(zip);
      // const file = await owner.methods.getownerFile(account).call();
      // console.log(file);
      // setfile(file);

      // const vehicleRc = await vehicle.methods.vehiclesOfOwner(account).call();
      // console.log(vehicleRc);

      // await vehicleRc.reduce(async (promise, rc) => {
      //   await promise;
      //   const contents = await vehicle.methods.getVehicle(rc).call();
      //   console.log(contents);
      //   vehicles.push(contents);
      //   console.log(vehicles);
      // }, Promise.resolve());

      // setvehicleData(vehicles);
      // console.log(vehicleData);
    };
    loadBlockchain();

  }, []);

  const handleChoose=(data)=>{
    props.handleChoose(data);
  }



  return (
    <>
      <div className="row  Vehicle-display-1">
        {vehicleData.map((vehicle, i) => {
          return <OneDeliveryVehicleDisplay vehicle={vehicle} key={i} handleChoose={handleChoose}/>;
        })}
      </div>
    </>
  );
}

export default DeliveryVehicleDisplay;
