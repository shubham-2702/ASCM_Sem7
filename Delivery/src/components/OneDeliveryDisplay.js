import React from 'react';

function OneDeliveryDisplay(props) {
    console.log(props.detail);
    const onclick=()=>{
      props.handleClick(props.detail.lat,props.detail.long);
    }
    return ( 
    <>
<div className="col-md-3 Vehicle-display-2 mb-5">
        <div className="card" style={{ width: "18rem" }}>
          {/* <img
            src={`https://ipfs.io/ipfs/${props.vehicle.ipfsHash}`}
            className="card-img-top"
            alt="Image takes time to load from ipfs"
          /> */}
          <div className="card-body">
            <h3 className="card-title"></h3>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">Delivery Id: {props.detail.Id}</li>
              <li className="list-group-item">Vehicle Rc: {props.detail.VehicleRc}</li>
              <li className="list-group-item">Vehicle Owner: {props.detail.Owner}</li>
              <li className="list-group-item">Quantity: {props.detail.Quantity}</li>
              <li className="list-group-item">Status: {props.detail.Status}</li>
              {/* <li className="list-group-item"> </li> */}
            </ul>
            <a className="btn btn-primary mt-3" onClick={onclick}>Latest location</a>
          </div>
        </div>
      </div>
    </>
     );
}

export default OneDeliveryDisplay;