import React from "react";

import "./About.css";

function About(props) {
  console.log(props);
  return (
    <>
      <div className="about-class-1">
        <div className="card" style={{ width: "18rem" }}>
          <img src={props.file} className="card-img-top" alt="..." />
          <div className="card-body">
            <h3 className="card-title">{props.name}</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{props.type}</li>
              <li className="list-group-item">{props.phone}</li>
              <li className="list-group-item">{props.address}</li>
              <li className="list-group-item">{props.state}</li>
              <li className="list-group-item">{props.zip}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
