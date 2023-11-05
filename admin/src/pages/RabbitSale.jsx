import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReviewRequest from "./ReviewRequest";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag, Space, Pagination } from "antd";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
import RabbitSaleDialog from "./RabbitSaleDialog";
const BASE_URL = appConfig.apiBasePath;

function RabbitSale() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    const navigateTo = useNavigate();
    const [values, setValues] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 6;

    const onApprove = (e, o) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approved this request?",
            showCancelButton: true,
            confirmButtonColor: "#2e7d32",
            cancelButtonColor: "#797979",
            confirmButtonText: "Yes, approve it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Approved!", "Request has been approved.", "success");
                axios
                    .put(BASE_URL + "/approve-adoption/" + o.id)
                    .then((res) => {
                        window.location.reload();
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const onDecline = (e, o) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to decline this request?",
            showCancelButton: true,
            confirmButtonColor: "#d50000",
            cancelButtonColor: "#797979",
            confirmButtonText: "Yes, decline it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Declined!", "Request has been declined.", "success");
                axios
                    .put(BASE_URL + "/decline-adoption/" + o.id)
                    .then((res) => {
                        window.location.reload();
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    useEffect(() => {
        axios
            .get(BASE_URL + "/sales")
            .then((res) => setValues(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handlePageChange = (page) => {
        setPageNumber(page);
    };

    const getDisplayedData = () => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return values.slice(startIndex, endIndex);
    };

    return (
        <div className="grid-container">
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
            />
            <div className="main-container">
                <h3>Rabbit Sales</h3>
                <br />
                <Button type="primary">
                    Add Sales
                </Button>
                <Table dataSource={getDisplayedData()} pagination={false}>
                    <Table.Column title="Name" dataIndex="amount" key="amount" />
                    <Table.Column title="Date" dataIndex="transaction_date" key="date" />
                    <Table.Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space>
                                <RabbitSaleDialog data={record} />
                            </Space>
                        )}
                    />
                </Table>
                <Pagination
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                    current={pageNumber}
                    pageSize={itemsPerPage}
                    total={values.length}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default RabbitSale;
