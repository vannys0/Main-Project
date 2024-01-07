import React, { useState } from "react";
import { Button, Modal, Timeline } from "antd";
import SecureStore from "react-secure-storage";

function Appli({ data }) {
  const user = SecureStore.getItem("userToken");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    if (!data) return [];

    const items = [];

    if (
      data.adoption_status === "Pending" ||
      data.adoption_status === "Declined"
    ) {
      items.push({
        color: getColorByStatus(data.adoption_status),
        children: <span>Adoption Status: {data.adoption_status}</span>,
      });
      items.push({
        children: <span>Date created: {formatDate(data.adoption_date)}</span>,
      });
    } else {
      const deliveryColor =
        data.delivery_status === "Approved" ? "green" : "grey";
      items.push({
        color: deliveryColor,
        children: (
          <span>
            {data.delivery_status
              ? "Owner is preparing for delivery"
              : "Pending for delivery"}
          </span>
        ),
      });
      items.push({
        color: getColorByStatus(data.adoption_status),
        children: <span>Adoption Status: {data.adoption_status}</span>,
      });
      items.push({
        children: <span>Date created: {formatDate(data.adoption_date)}</span>,
      });
    }

    return items;
  };

  return (
    <div>
      <span onClick={showModal}>View</span>
      <Modal
        style={{ top: 20 }}
        title="Adoption details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <div className="d-flex flex-column">
            <Timeline items={renderTimelineItems()} />
            <hr />
            <div className="d-flex justify-content-between">
              <p>Adoption ID</p>
              <p>{data.id}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Rabbit ID</p>
              <p>{data.rabbit_id}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Adoption Date</p>
              <p>{formatDate(data.adoption_date)}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Full Name</p>
              <p>{user.name}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Address</p>
              <p>
                {data.barangay}, {data.city}, {data.province}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Phone Number</p>
              <p>{data.phone}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Delivery Option</p>
              <p>{data.service_option}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Mode of payment</p>
              <p>{data.mode_of_payment}</p>
            </div>
            {data.mode_of_payment === "Agriculture" ? (
              <>
                <div className="d-flex justify-content-between">
                  <p>Agricultural Product</p>
                  <p>{data.agriculture_product}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Product price</p>
                  <p>Php{data.agriculture_product_price}</p>
                </div>
              </>
            ) : null}
            <div className="d-flex justify-content-between">
              <p>Adoption Fee</p>
              <p>Php{data.price}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Appli;
