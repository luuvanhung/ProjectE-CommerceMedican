/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { SmileOutlined } from "@ant-design/icons";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { default as Modal } from "antd/es/modal";
import "antd/es/modal/style/css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { userRows } from "../../../dummyData";
import api from "./../../../constants/api";
import { FrownOutlined } from "@ant-design/icons";

export default function NewsList() {
    const [data, setData] = useState(userRows);
    const [state, setState] = useState({ dataNews: [] });
    const urlApi = `/news/list-news`;
    const mountStack = useRef({ [urlApi]: true }).current;
    const history = useHistory();

    async function getDataList() {
        try {
            const response = await api.get(`${urlApi}`);
            const { content: dataNews } = response.data;
            if (mountStack[urlApi]) {
                return setState((prev) => ({
                    ...prev,
                    dataNews: dataNews,
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
        { field: "newsId", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 500,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.title}
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
                        <Link to={"/new/" + params.row.newsId}>
                            <EditOutlined className="userListEdit" />
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => onDelete(params.row.newsId)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <div className="userTitleContainer">
                <h1 className="userTitle">List News</h1>
                <Link to="/newUser">
                    <button className="userAddButton">
                        <AddCircleOutlineIcon />
                        <p>Create</p>
                    </button>
                </Link>
            </div>
            <DataGrid
                rows={state.dataNews.map((row) => {
                    return row;
                })}
                getRowId={(r) => r.newsId}
                id="newsId"
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
