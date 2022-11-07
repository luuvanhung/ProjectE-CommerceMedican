/* eslint-disable react-hooks/exhaustive-deps */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import Cookies from "js-cookie";
import { default as React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../../constants/api";
import SiderBarProfile from "../layouts/slider-bar";
import "./style.scss";

interface User {
    username?: String;
    email?: String;
    password?: String;
    fullName?: String;
    address?: String;
    phoneNumber?: Number;
    roles?: String[];
}

interface Cookies {
    id?: Number | String;
    username?: String;
    email?: String;
    password?: String;
    fullName?: String;
    address?: String;
    phoneNumber?: Number;
    roles?: String[];
}

export default function InformationPage() {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        userDetail: "",
    });
    const getUserCookie: Cookies = JSON.parse(Cookies.get("user")! || "0");
    const history = useHistory();
    console.log(getUserCookie);
    async function getDataList() {
        try {
            const response = await api.get(`/user/${getUserCookie.id}`);
            const { data: userData } = response;
            setState((prev) => ({
                userDetail: userData,
            }));
        } catch (err) {
            notification.error({
                message: "Error is occured",
                description: "No data found.",
            });
        }
    }

    useEffect(() => {
        getDataList();
        form.setFieldsValue(state.userDetail);
    }, [form.setFieldsValue(state.userDetail)]);

    const onSubmit = (values: User) => {
        console.log(values);
        api.put(`/user/update/${getUserCookie.id}`, {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address,
        })
            .then((res) => {
                setCookie("username", res.data.username, parseJwt(res.data.token));
                setCookie("accessToken", res.data.token, parseJwt(res.data.token));
                setCookie('user',JSON.stringify(res.data),parseJwt(res.data.token))
                notification.success({
                    message: "User has been updated Successfully",
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

    const handleError = (error: any) => {
        console.log(error)
        switch (error.response.status) {
            case 400:
                notification.error({
                    message: "Update user failed",
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function parseJwt(token: string) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload: any = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload).exp;
    }

    const setCookie = (username: string, value: string, expires: number) => {
        const date = new Date();
        date.setTime(date.getTime() + expires);
        Cookies.set(username, value, { expires: date, path: "/" });
    };


    return (
        <div className="grid-x">
            <SiderBarProfile />
            <div className="large-9 cell small-order-1 large-order-2">
                <div className="profile">
                    <h1>Update Contact Information</h1>
                    <Form
                        className="rows"
                        id="change_email"
                        onFinish={onSubmit}
                        form={form}
                    >
                        <fieldset className="fieldset">
                            <legend>Personal</legend>
                            <div className="rows">
                                <Form.Item
                                    name="fullName"
                                    label="Full Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your full name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Full Name: Nguyen Van A" />
                                </Form.Item>
                            </div>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend>Contact</legend>
                            <div className="rows">
                                <div className="large-6 columns">
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your address!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nguyen Van Linh" />
                                    </Form.Item>
                                </div>
                                <div className="large-12 columns">
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your e-mail!",
                                            },
                                            {
                                                type: "email",
                                                message:
                                                    "The input is not valid E-mail!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="abc@email.com" />
                                    </Form.Item>
                                </div>
                                <div className="large-12 columns">
                                    <Form.Item
                                        name="phoneNumber"
                                        label="Phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your phone!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="012346789" />
                                    </Form.Item>
                                </div>
                            </div>
                        </fieldset>
                        <p>
                            <Button
                                htmlType="submit"
                                className="userUpdateButton"
                            >
                                Update
                            </Button>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}
