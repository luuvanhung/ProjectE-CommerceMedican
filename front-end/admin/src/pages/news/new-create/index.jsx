/* eslint-disable react-hooks/exhaustive-deps */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useHistory } from "react-router-dom";
import api from "../../../constants/api";
import UserForm from "../news-form";
import "./style.css";

export default function CreateNew() {
    const history = useHistory();

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("image", values.image);
        api.post(`/news/create-new`, formData)
            .then((res) => {
                notification.success({
                    message: "Add News has been added Successfully",
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
                <h1 className="newsTitle">Create News</h1>
                <UserForm onSubmit={onFinish} />
            </div>
        </div>
    );
}
