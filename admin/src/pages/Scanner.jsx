import React, { useRef, useState } from "react";
import QrReader from "react-qr-reader";

const Scanner = ({ isOpen, onRequestClose }) => {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (error) => {
    console.error("QR code scanning error:", error);
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrReader
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
      {result && <p>Scanned QR Code: {result}</p>}
    </div>
  );
};

export default Scanner;
