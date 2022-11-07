/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { default as Modal } from "antd/es/modal";
import "antd/es/modal/style/css";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { productRows } from "../../../dummyData";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import api from "./../../../constants/api";
import "./productList.css";
import { SmileOutlined } from "@ant-design/icons";
import { FrownOutlined } from "@ant-design/icons";

export default function ProductList() {
    const [data, setData] = useState(productRows);
    const [state, setState] = useState({ dataProduct: [] });
    const urlApi = `/product/list-products`;
    const mountStack = useRef({ [urlApi]: true }).current;
    const history = useHistory();

    async function getDataList() {
        try {
            const response = await api.get(`${urlApi}`);
            const { content: dataProduct } = response.data;
            if (mountStack[urlApi]) {
                return setState((prev) => ({
                    ...prev,
                    dataProduct: dataProduct,
                }));
            }
        } catch (err) {}
    }

    useEffect(() => {
        getDataList();
        history.listen((location) => {
            mountStack[urlApi] && getDataList();
        });
        return () => {
            mountStack[urlApi] = false;
        };
    }, [getDataList()]);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    // function delete
    const onDelete = (id: number) => {
        console.log("id delete" , id)
        const { confirm } = Modal;
        new Promise((resolve, reject) => {
            confirm({
                title: "Are you sure you want to Delete ?",
                onOk: () => {
                    resolve(true);
                    api.delete(`/product/delete-product/${id}`)
                        .then((res) => {
                            notification.success({
                                message: "Product has been delete Successfully",
                                icon: (
                                    <SmileOutlined
                                        style={{ color: "#108ee9" }}
                                    />
                                ),
                            });
                            setTimeout(function () {
                                history.go(0);
                            }, 1000);
                        })
                        .catch((err) => handleError(err));
                },
                onCancel: () => {
                    reject(true);
                },
            });
        });
    };

    const handleError = (error) => {
        switch (error.response.status) {
            case 400:
                notification.error({
                    message: "Number Catalog already exists",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
            default:
                notification.error({
                    message: "Catalog has been added Failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
        }
    };

    const columns = [
        { field: "productId", headerName: "Product id", width: 150 },
        {
            field: "product",
            headerName: "Product",
            width: 400,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.imageProduct}
                            alt=""
                        />
                        {params.row.productName}
                    </div>
                );
            },
        },
        { field: "quantity", headerName: "Quantity", width: 120 },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     width: 120,
        // },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                const id = params.id;
                return (
                    <>
                        <Link to={"/product/" + params.row.productId}>
                            <EditOutlined className="productListEdit" />
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => onDelete(params.row.productId)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product List</h1>
                <Link to="/new-product">
                    <button className="productAddButton">
                        <AddCircleOutlineIcon /> <p>Create</p>
                    </button>
                </Link>
            </div>
            <DataGrid
                // rows={data}
                // id="productId"
                rows={state.dataProduct.map((row) => {
                    return row;
                })}
                getRowId={(r) => r.productId}
                id="productId"
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
