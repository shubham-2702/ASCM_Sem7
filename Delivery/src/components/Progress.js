import { Link } from "react-router-dom";
import React from "react";
import "./Progress.css";

function Progress(props) {
  console.log(props.current);
  return (
    <>
      <div className="progressClass1">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            <li
              className={`${
                props.current == 1 ? "page-item active" : "page-item"
              }`}
              aria-current="page"
            >
              <button className="page-link" onClick={props.handleClick1}>
                1
              </button>
            </li>
            <li
              className={`${
                props.current == 2 ? "page-item active" : "page-item"
              }`}
            >
              <button className="page-link" onClick={props.handleClick2}>
                2
              </button>
            </li>
            <li
              className={`${
                props.current == 3 ? "page-item active" : "page-item"
              }`}
            >
              <button className="page-link" onClick={props.handleClick3}>
                3
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Progress;
