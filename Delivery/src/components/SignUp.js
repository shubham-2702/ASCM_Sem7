import React, { useState, Component } from "react";
import Navbar from "./Navbar";
import Option from "./Option";
import CustomerForm from "./CustomerForm";
import OwnerForm from "./OwnerForm";
import { useLocation } from "react-router-dom";

// class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       customerIsShown:false,
//       ownerIsShown:false
//     };
//     // console.log(this.props.location.state);
//   }

//    handleClick1 = event => {
//     this.state.customerIsShown=true;
//     this.state.ownerIsShown=false;
//     this.setState({});
//   };
//    handleClick2 = event => {
//     this.state.ownerIsShown=true;
//     this.state.customerIsShown=false;
//     this.setState({});
//   };

//   render() {
//     return (
//       <>
//       <Navbar />
//         <Option handleClick1={this.handleClick1}  handleClick2={this.handleClick2} />
//         {this.state.customerIsShown && <CustomerForm />}
//         {this.state.ownerIsShown && <OwnerForm />}

//     </>
//      );
//   }
// }

// export default SignUp;

function SignUp(props) {
  const [customerIsShown, setCustomerIsShown] = useState(false);
  const [ownerIsShown, setOwnerIsShown] = useState(false);
  const [current, setcurrent] = useState(0);

  const location = useLocation();
  console.log(location.state);

  const account = location.state;

  const handleClick1 = (event) => {
    setCustomerIsShown((current) => !current);
    setOwnerIsShown(false);
    setcurrent(1);
  };
  const handleClick2 = (event) => {
    setOwnerIsShown((current) => !current);
    setCustomerIsShown(false);
    setcurrent(2);
  };

  return (
    <>
      <Navbar account={account} />
      <Option
        handleClick1={handleClick1}
        handleClick2={handleClick2}
        current={current}
      />
      {customerIsShown && <CustomerForm account={account} />}
      {ownerIsShown && <OwnerForm account={account} />}
    </>
  );
}

export default SignUp;
