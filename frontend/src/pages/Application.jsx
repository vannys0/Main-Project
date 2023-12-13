import React from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Timeline } from "antd";
import SecureStore from "react-secure-storage";

function Application() {
  const user = SecureStore.getItem("userToken");
  const location = useLocation();
  const { state } = location;
  const rowData = state && state.rowData;

  const getColorByStatus = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Approved":
        return "green";
      case "Declined":
        return "red";
      default:
        return "grey";
    }
  };

  const renderTimelineItems = () => {
    if (!rowData) return [];

    if (rowData.adoption_status === "Pending") {
      return [
        {
          color: getColorByStatus(rowData.adoption_status),
          children: <span>{rowData.adoption_status}</span>,
        },
        {
          children: <span>{rowData.adoption_date}</span>,
        },
      ];
    }

    if (rowData.adoption_status === "Declined") {
      return [
        {
          color: getColorByStatus(rowData.adoption_status),
          children: <span>{rowData.adoption_status}</span>,
        },
        {
          children: <span>{rowData.adoption_date}</span>,
        },
      ];
    }

    const getDeliveryColor = () => {
      if (rowData.delivery_status === "Pending") {
        return "grey";
      } else if (rowData.delivery_status === "Approved") {
        return "green";
      }
      return "black";
    };

    return [
      {
        color: getDeliveryColor(),
        children: (
          <span>
            {rowData.delivery_status
              ? "Owner is preparing for delivery"
              : "Pending for delivery"}
          </span>
        ),
      },
      {
        color: getColorByStatus(rowData.adoption_status),
        children: <span>{rowData.adoption_status}</span>,
      },
      {
        children: <span>{rowData.adoption_date}</span>,
      },
    ];
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="application-div">
        <div className="thumbnail">
          <h5>Application</h5>
        </div>
        <Timeline items={renderTimelineItems()} />
        <hr />
        {rowData && (
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <p>Adoption ID</p>
              <p>{rowData.id}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Rabbit ID</p>
              <p>{rowData.rabbit_id}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Adoption Date</p>
              <p>{rowData.adoption_date}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Full Name</p>
              <p>{user.name}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Address</p>
              <p>
                {rowData.barangay}, {rowData.city}, {rowData.province}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Phone Number</p>
              <p>{rowData.phone}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Delivery Option</p>
              <p>{rowData.service_option}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Mode of payment</p>
              <p>{rowData.mode_of_payment}</p>
            </div>
            {rowData.mode_of_payment === "Agriculture" ? (
              <>
                <div className="d-flex justify-content-between">
                  <p>Agricultural Product</p>
                  <p>{rowData.agriculture_product}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Product price</p>
                  <p>{rowData.agriculture_product_price}</p>
                </div>
              </>
            ) : null}
            <div className="d-flex justify-content-between">
              <p>Adoption Fee</p>
              <p>{rowData.price}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Application;
