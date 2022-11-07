/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { default as Modal } from "antd/es/modal";
import "antd/es/modal/style/css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../../constants/api";
import { userRows } from '../../../dummyData';

export default function ListCategory() {
    const [data, setData] = useState(userRows);
    const [state, setState] = useState({ dataCategory: [] });
    const urlApi = `/category/get-categorys`;
    const mountStack = useRef({ [urlApi]: true }).current;
    const history = useHistory();

    async function getDataList() {
        try {
            const response = await api.get(`${urlApi}`);
            const { data: dataCategory } = response;
            console.log(dataCategory)
            if (mountStack[urlApi]) {
                return setState((prev) => ({
                    ...prev,
                    dataCategory: dataCategory,
                }));
            }
        } catch (err) {
            console.log(err);
        }
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

    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    };

    // function delete
    const onDelete = (id: number) => {
        const { confirm } = Modal;
        new Promise((resolve, reject) => {
            confirm({
                title: "Are you sure you want to Delete ?",
                onOk: () => {
                    resolve(true);
                    api.delete(`/news/delete-news/${id}`)
                        .then((res) => {
                            notification.success({
                                message: "News has been delete Successfully",
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
        { field: "categoryId", headerName: "Category ID", width: 150 },
        {
            field: "categoryName",
            headerName: "Category Name",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.categoryName}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/category/" + params.row.categoryId}>
                            <EditOutlined className="userListEdit" />
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => onDelete(params.row.categoryId)}
                        />
                    </>
                );
            },
        },
    ];
    console.log(state.dataCategory)
    return (
        <div className="userList">
            <div className="userTitleContainer">
                <h1 className="userTitle">List Category</h1>
                <Link to="/new-category">
                    <button className="userAddButton">
                        <AddCircleOutlineIcon />
                        <p>Create</p>
                    </button>
                </Link>
            </div>
            <DataGrid
                rows={state.dataCategory.map((row) => {
                    return row;
                })}
                getRowId={(r) => r.categoryId}
                id="categoryId"
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
