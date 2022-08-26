import React, { Component } from "react";
import ipfs from "./ipfs";

let v;
class SecondStep extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    console.log(buffer);
    this.state.buffer = buffer;
    this.setState({});
    console.log(this.state.buffer);
  };


  // convertToBuffer = async (reader) => {
  //   const buffer = await Buffer.from(reader.result);
  //   console.log(buffer);
  //   this.state.fileBuffer = buffer;
  //   this.setState({});
  //   //console.log(this.state.fileBuffer);
  // };

  onSubmit(event) {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.setState({ ipfsHash: result[0].hash })
        console.log('ifpsHash', this.state.ipfsHash)
      
    })
  }
  render() {
    return (
      <form className="col" onSubmit={this.onSubmit}>
        <h3>{this.props.content} Sign Up</h3>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload file
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={this.captureFile}
          />
        </div>
        <div className=" col-md-6 mb-3"></div>
        <div className="col-md-6 mb-3"></div>
        <div className="mb-3"></div>
        <div className="col-md-6 mb-3"></div>
        <div className="col-md-6 mb-3"></div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>
    );
  }
}

export default SecondStep;
