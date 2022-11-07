/* eslint-disable react-hooks/exhaustive-deps */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../constants/api";
import UserForm from "../news-form";

export default function UpdateNew() {
    const [state, setState] = useState({});
    const path: Path = useParams();
    const history = useHistory();

    useEffect(() => {
        api.get(`news/${path.id}`).then((res) => {
            const { data: dataSource } = res;
            setState({ ...dataSource });
        });
    }, []);

    const updateSubmit = (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("image", values.imageurl);
        console.log(values)
        api.put(`/news/update-news/${path.id}`, formData)
            .then((res) => {
                notification.success({
                    message: "Update News has been added Successfully",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });

                setTimeout(function () {
                    history.go(0);
                }, 1000);
            })
            .catch((err) => {
                handleError(err);
            });
    };

    const handleError = (error) => {
        console.log(error)
        switch (error.response.status) {
            case 400:
                notification.error({
                    message: error.response.data.message,
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
            default:
                notification.error({
                    message: "Create News been added Failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
        }
    };

    return (
        <div className="news">
            <div className="newsTitleContainer">
                <h1 className="newsTitle">Update News</h1>
                {state && (
                    <UserForm
                        onSubmit={updateSubmit}
                        news={state}
                        fileList={state.imageurl}
                    />
                )}
            </div>
        </div>
    );
}
