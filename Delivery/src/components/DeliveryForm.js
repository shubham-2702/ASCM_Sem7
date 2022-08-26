import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import pincode from "pincode-distance"

function DeliveryForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const Pincode = new pincode();


  // useEffect(() => {
  //   const location = Pincode.getlatLng(121004);
  //   console.log(location);
    
  // }, []);

  const onSubmit = (data) => {
    console.log(data);
    const distance = Pincode.getDistance(data.from, data.to);
    console.log(distance);
    props.handleNext(data);
  };

  
  return (
    <>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter Delivery Details</h3>
        <div className=" col-md-12 mb-3">
          <label>Quantity In Kg</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter weight of items"
            {...register("quantity")}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>From</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter Zip"
            {...register("from")}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>To</label>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter Zip"
            {...register("to")}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default DeliveryForm;
