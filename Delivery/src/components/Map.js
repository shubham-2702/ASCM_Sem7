import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { deliveryContractAbi, deliveryContractAddress } from './StoreAbi';
import Web3 from 'web3';
import Navbar from './Navbar';

function Map() {

  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [deliveryContract, setdeliveryContract] = useState();
  const [account, setaccount] = useState();
  const [deliveryDetail, setdeliveryDetail] = useState();

  const location= useLocation();
  var latitude;
  var longitude;
  console.log(location.state);

  // useEffect(() => {
  //   const id=location.state.id;
  //   console.log(id);
  //   const loadBlockchain = async () => {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.ethereum);
  //       await window.ethereum.enable();
  //     } else if (window.web3) {
  //       window.web3 = new Web3(window.web3.currentProvider);
  //     } else {
  //       window.alert(
  //         "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //       );
  //     }
  //     const web3 = window.web3;
  //     console.log(web3);
  //     const accounts = await web3.eth.getAccounts();
  //     console.log(accounts[0]);
  //     const account = accounts[0];
  //     setaccount(account);
  //     const delivery = new web3.eth.Contract(
  //       deliveryContractAbi,
  //       deliveryContractAddress
  //     );
      

  //     console.log(delivery);
  //     setdeliveryContract(delivery);
  //     console.log(deliveryContract);

  //       const deliveryDetails = await delivery.methods.getDeliveryDetails(id).call();

  //       console.log(deliveryDetails);
  //       setdeliveryDetail(deliveryDetails);
  //       setdeliveryDetail(deliveryDetails);
  //       console.log(deliveryDetails.lat, deliveryDetails.long);
  //       latitude=deliveryDetails.lat;
  //       longitude=deliveryDetails.long;
  //       console.log(latitude,longitude);
  //       setlat(deliveryDetails.lat);
  //       setlong(deliveryDetails.long);
  //       console.log(lat,long);
        
        
      
  //   };

  //   loadBlockchain();
  // }, []);

  return ( <>
  {/* <Navbar /> */}
    <MapContainer center={[location.state.lat, location.state.long]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[location.state.lat, location.state.long]}>
    <Popup>
      Your Delivery is in this Area right now
    </Popup>
  </Marker>

    </MapContainer>
  </> );
}

export default Map;