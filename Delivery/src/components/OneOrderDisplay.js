import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

function OneDeliveryDisplay(props) {
  console.log(props.detail);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    props.handleUpdate(props.detail.Id, data.Zipcode);
  };
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
              <li className="list-group-item">
                Delivery Id: {props.detail.Id}
              </li>
              <li className="list-group-item">
                Vehicle Rc: {props.detail.VehicleRc}
              </li>
              <li className="list-group-item">
                Customer: {props.detail.Customer}
              </li>
              <li className="list-group-item">
                Quantity: {props.detail.Quantity}
              </li>
              <li className="list-group-item">Status: {props.detail.Status}</li>
              {/* <li className="list-group-item"> </li> */}
            </ul>
            <div className="input-group mb-3 mt-3">
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter Latest Pincode"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  {...register("Zipcode")}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  Update Location
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneDeliveryDisplay;
