import React, { useState, useEffect, Component } from "react";
import FirstStep from "./FirstStep";
import Progress from "./Progress";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { customerContractAbi, customerContractAddress } from "./StoreAbi";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

// class CustomerForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       customerFirstIsShown: true,
//       customerSecondIsShown: false,
//       customerThirdIsShown: false,
//       current:1,
//       customerHash:'',
//       customerData:{},
//       customerFileHash:'',
//       contract:{},
//       account:''

//     };
//   }

//   componentDidMount(){
//     // if(this.state.account==''){
//       this.state.account=this.props.account;
//     this.setState({});
//     // }

//     // if(this.state.)
//     async function connectContract() {
//       if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//       } else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider);
//       } else {
//         window.alert(
//           "Non-Ethereum browser detected. You should consider trying MetaMask!"
//         );
//       }
//       const web3 = window.web3;
//       const contract1 = await new web3.eth.Contract(
//         customerContractAbi,
//         customerContractAddress
//       );
//       console.log(contract1);
//       // console.log(this.state);

//       this.setState({contract:contract1});

//       console.log(this.state.contract);
//       const count= await contract1.methods.addressCount().call();
//       console.log(count);
//     }
//     connectContract();
//   }

//    handleClick1 = (event) => {
//     event.preventDefault();
//     this.state.customerFirstIsShown=true;
//     this.setState({});
//     this.state.current=1;
//     this.setState({});
//     this.state.customerSecondIsShown=false;
//     this.setState({});
//     this.state.customerThirdIsShown=false;
//     this.setState({});
//     // console.log(customerFirstIsShown, current, customerSecondIsShown);
//   };
//    handleClick2 = (event) => {
//     event.preventDefault();
//     this.state.customerSecondIsShown=true;
//     this.setState({});
//     this.state.current=2;
//     this.setState({});
//     this.state.customerFirstIsShown=false;
//     this.setState({});
//     this.state.customerThirdIsShown=false;
//     this.setState({});
//     // console.log(customerFirstIsShown, current, customerSecondIsShown);
//   };

//    handleClick3 = (event) => {
//     event.preventDefault();
//     this.state.customerThirdIsShown=true;
//     this.setState({});
//     this.state.current=3;
//     this.setState({});
//     this.state.customerFirstIsShown=false;
//     this.setState({});
//     this.state.customerSecondIsShown=false;
//     this.setState({});
//     // console.log(customerFirstIsShown, current, customerSecondIsShown);
//   };

//    handleNext = (data) => {
//     const userData = data;
//     console.log(userData);
//     this.state.customerData=userData;
//     this.setState({});
//     // console.log(customerData);
//     this.state.customerSecondIsShown=true;
//     this.setState({});
//     this.state.current=2;
//     this.setState({});
//     this.state.customerFirstIsShown=false;
//     this.setState({});
//   };

//    handleFileSubmit = (data) => {
//     const userFileHash = "https://ipfs.io/ipfs/" + data.hash;
//     console.log(userFileHash);
//     this.state.customerFileHash=userFileHash;
//     this.setState({});
//     // console.log(customerFileHash);
//     this.state.customerThirdIsShown=true;
//     this.setState({});
//     this.state.current(3);
//     this.setState({});
//     this.state.customerSecondIsShown=false;
//     this.setState({});
//   };

//    handleConfirmSubmit = (data) => {
//     const userHash = data.hash;
//     console.log(userHash);
//     this.state.customerHash=userHash;
//     this.setState({});
//     console.log(this.state.customerHash);
//   };

//   render() {
//     return (
//       <>
//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           {this.state.customerFirstIsShown && (
//             <FirstCustomerStep handleNext={this.handleNext} />
//           )}
//           {this.state.customerSecondIsShown && (
//             <SecondCustomerStep handleFileSubmit={this.handleFileSubmit} />
//           )}
//           {this.state.customerThirdIsShown && (
//             <ThirdCustomerStep
//               customerData={this.state.customerData}
//               customerFileHash={this.state.customerFileHash}
//               handleConfirmSubmit={this.handleConfirmSubmit}
//             />
//           )}
//           <Progress
//             handleClick1={this.handleClick1}
//             handleClick2={this.handleClick2}
//             handleClick3={this.handleClick3}
//             current={this.state.current}
//           />
//         </div>
//       </div>
//     </>
//      );
//   }
// }

// export default CustomerForm;

function CustomerForm(props) {
  const [customerFirstIsShown, setcustomerFirstIsShown] = useState(true);
  const [customerSecondIsShown, setcustomerSecondIsShown] = useState(false);
  const [customerThirdIsShown, setcustomerThirdIsShown] = useState(false);
  const [current, setCurrent] = useState(1);
  const [customerHash, setCustomerHash] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [customerFinalData, setCustomerFinalData] = useState({});
  const [customerFileHash, setCustomerFileHash] = useState("");
  const [contract, setContract] = useState();
  const [account, setAccount] = useState("");
  const [stay, setstay] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setAccount(props.account);

    //   async function connectContract() {
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
    //     const contract1 = new web3.eth.Contract(
    //       customerContractAbi,
    //       customerContractAddress
    //     );
    //     console.log(contract1);
    //     setContract(contract1);
    //     console.log(contract);
    //     const count= await contract1.methods.addressCount().call();
    //     console.log(count);
    //   }
    //   connectContract();
  }, []);

  // useEffect(() => {
  //   setAccount(props.account);

  // if(customerHash==""){
  //   return;
  // }
  // if(contract==null){
  //   console.log("Bhai contract ki value change nhi ho rhi");
  //   return;
  // }
  // async function connectContract() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  //   const web3 = window.web3;
  //   const contract1 = new web3.eth.Contract(
  //     customerContractAbi,
  //     customerContractAddress
  //   );
  //   console.log(contract1);
  //   // setContract(contract1);
  //   // console.log(contract);
  //   const count= await contract1.methods.addressCount().call();
  //   console.log(count);
  //   await contract1.methods.addCustomer(account,customerHash).send(
  //     {
  //       from: account,
  //     },
  //     (error, transactionHash) => {
  //       console.log(error,transactionHash);
  //     }
  //     );
  // }
  // connectContract();
  // console.log(contract.methods,customerHash,account);
  // async function sendContract() {
  //  await contract.methods.addCustomer(account,customerHash).send(
  //     {
  //       from: account,
  //     },
  //     (error, transactionHash) => {
  //       console.log(error,transactionHash);
  //     }
  //     );
  // }
  // sendContract();
  // return () => {
  //   cleanup
  // };
  // }, [customerHash]);

  const handleClick1 = (event) => {
    event.preventDefault();
    setcustomerFirstIsShown(true);
    setCurrent(1);
    setcustomerSecondIsShown(false);
    setcustomerThirdIsShown(false);
    console.log(customerFirstIsShown, current, customerSecondIsShown);
  };
  const handleClick2 = (event) => {
    event.preventDefault();
    setcustomerSecondIsShown(true);
    setCurrent(2);
    setcustomerFirstIsShown(false);
    setcustomerThirdIsShown(false);
    console.log(customerFirstIsShown, current, customerSecondIsShown);
  };

  const handleClick3 = (event) => {
    event.preventDefault();
    setcustomerThirdIsShown(true);
    setCurrent(3);
    setcustomerFirstIsShown(false);
    setcustomerSecondIsShown(false);
    console.log(customerFirstIsShown, current, customerSecondIsShown);
  };

  const handleNext = (data) => {
    const userData = data;
    console.log(userData);
    setCustomerData(userData);
    console.log(customerData);
    setcustomerSecondIsShown(true);
    setCurrent(2);
    setcustomerFirstIsShown(false);
  };

  const handleFileSubmit = (data) => {
    const userFileHash = "https://ipfs.io/ipfs/" + data.hash;
    console.log(userFileHash);
    setCustomerFileHash(userFileHash);
    console.log(customerFileHash);
    setcustomerThirdIsShown(true);
    setCurrent(3);
    setcustomerSecondIsShown(false);
  };

  const handleConfirmSubmit = async (data) => {
    const userData = data;
    console.log(userData);
    setCustomerFinalData(userData);
    console.log(customerFinalData);
    const name = customerFinalData.Name;
    const phone = customerFinalData.PhoneNo;
    const address = customerFinalData.Address;
    const state = customerFinalData.State;
    const zip = customerFinalData.Zip;
    const file = customerFinalData.Fileurl;

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
      customerContractAbi,
      customerContractAddress
    );
    console.log(contract1);
    setContract(contract1);
    console.log(contract);
    const count = await contract1.methods.customerCount().call();
    console.log(count);
    try{
    await contract1.methods
      .addCustomer(account, name, phone, address, zip, state, file)
      .send(
        {
          from: account,
          gas: 300000,
        },
        (error, transactionHash) => {
          console.log(error, transactionHash);
        }
      );

    navigate("/customer-profile", {
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
          {customerFirstIsShown && (
            <FirstStep handleNext={handleNext} content="Customer" />
          )}
          {customerSecondIsShown && (
            <SecondStep
              handleFileSubmit={handleFileSubmit}
              content="Customer"
            />
          )}
          {customerThirdIsShown && (
            <ThirdStep
              userData={customerData}
              userFileHash={customerFileHash}
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

export default CustomerForm;
