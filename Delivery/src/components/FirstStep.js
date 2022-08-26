import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const FirstStep = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    props.handleNext(data);
  };

  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <h3>{props.content} Sign Up</h3>
      <div className=" col-md-6 mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          {...register("Name")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>Phone</label>
        <input
          type="phone"
          className="form-control"
          placeholder="Enter phone number"
          {...register("PhoneNo")}
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your address"
          {...register("Address")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>Zip</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Zip"
          {...register("Zip")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>State</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your state"
          {...register("State")}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default FirstStep;
