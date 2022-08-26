import React, { useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import {
  customerContractAbi,
  customerContractAddress,
  ownerContractAbi,
  ownerContractAddress,
} from "./StoreAbi";

import Web3 from "web3";

export default function Navbar(props) {
  const navigate = useNavigate();

  return <NavbarClass account={props.account} navigate={navigate} />;
}

class NavbarClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerContract: {},
      ownerContract: {},
      account: "",
      object: {
        account: "",
        web3: {},
        contract: {},
      },
    };
    console.log(this.props.account);
  }

  loadBlockchainData = async () => {
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
    this.state.object.web3 = web3;
    this.setState({});
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.state.object.account = accounts[0];
    this.setState({});
    this.state.account = accounts[0];
    this.setState({});
    console.log(this.state.object.account);
    console.log(this.state.object.web3);
    const customer = new web3.eth.Contract(
      customerContractAbi,
      customerContractAddress
    );
    console.log(customer);
    this.state.customerContract = customer;
    this.setState({});
    console.log(this.state.customerContract);
    const owner = new web3.eth.Contract(ownerContractAbi, ownerContractAddress);
    console.log(owner);
    this.state.ownerContract = owner;
    this.setState({});
    console.log(this.state.ownerContract);
    const ansCustomer = await this.state.customerContract.methods
      .hasCustomer(this.state.account)
      .call();
    console.log(ansCustomer);
    const ansOwner = await this.state.ownerContract.methods
      .hasOwner(this.state.account)
      .call();
    console.log(ansOwner);
    if (ansCustomer == true) {
      this.props.navigate("/customer-profile", {
        state: this.state.account,
      });
    } else if (ansOwner == true) {
      this.props.navigate("/owner-profile", {
        state: this.state.account,
      });
    } else {
      this.props.navigate("/sign-up", {
        state: this.state.account,
      });
    }
  };

  render() {
    return (
      <>
        <div className="navbarClass1">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/home"}>
                Delivery
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link">{this.props.account}</a>
                  </li>
                  <button
                    className="nav-item"
                    onClick={() => {
                      this.loadBlockchainData();
                    }}
                  >
                    <a className="nav-link">Sign up</a>
                  </button>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}

// export default Navbar;

// function Navbar() {

//   const [account,setAccount]=useState('');

//   const navigate=useNavigate();

//   const loadBlockchainData = async () => {
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
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts[0]);
//     setAccount(accounts[0]);
//     console.log(account);
//     navigate("/sign-up",{state:account});
//     // this.state.content = "Your account: ";
//     // this.setState({});
//   };

//   return (
//     <>
//       <div className="navbarClass1">
//         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//           <div className="container">
//             <Link className="navbar-brand" to={"/home"}>
//               Delivery
//             </Link>
//             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//               <ul className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <p className="nav-link">
//                     {account}
//                   </p>
//                 </li>
//                 <li className="nav-item">
//                   <p
//                     className="nav-link"
//                     onClick={() => {
//                       loadBlockchainData();
//                     }}
//                     // to={{ pathname: "/sign-up", state: account }}
//                   >
//                     Sign up
//                   </p>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

// export default Navbar;
