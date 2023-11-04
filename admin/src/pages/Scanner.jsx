import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QRCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "No QR code scanned yet",
    };
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onScan={this.handleScan}
          onError={this.handleError}
          style={{ width: "100%" }}
        />
        <p>Result: {this.state.result}</p>
      </div>
    );
  }
}

export default QRCodeScanner;
