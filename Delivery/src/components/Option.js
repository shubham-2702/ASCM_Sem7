import React, { Component } from "react";
import "./Option.css";

function Option(props) {
  return (
    <>
      <div className="optionClass1 text-center">
        <button
          type="button"
          className={`${
            props.current == 1
              ? "optionButton btn btn-dark fs-4"
              : "optionButton btn btn-light fs-4"
          }`}
          onClick={props.handleClick1}
        >
          Customer
        </button>
        <button
          type="button"
          className={`${
            props.current == 2
              ? "optionButton btn btn-dark fs-4"
              : "optionButton btn btn-light fs-4"
          }`}
          onClick={props.handleClick2}
        >
          Owner
        </button>
      </div>
    </>
  );
}

export default Option;
