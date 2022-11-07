import { message } from "antd";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
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
interface ErrorType {
    response: {
        status?: number;
        data: {
            message: [{ field: string; message: string }];
        };
    };
}

export default function EmailPage() {
    const [form_Email] = Form.useForm();
    const [form_Password] = Form.useForm();
    const getCookie: Cookies = JSON.parse(Cookies.get("user")!);
    const getToken: any = Cookies.get("accessToken");
    const urlApi = `/user/${getCookie.id}`;
    const [state, setState] = useState<any>({
        dataUser: "",
    });
    const history = useHistory();

    async function getDataList() {
        try {
            const response = await api.get(`${urlApi}`);
            const { data: dataUser } = response;
            setState((prev: any) => ({
                dataUser: dataUser,
            }));
        } catch (err) {}
    }

    useEffect(() => {
        getDataList();
    }, []);

    const onSubmitEmail = (values: User) => {
        api.put(`/user/update/${getCookie.id}`, {
            email: values.email,
            address: getCookie.address,
            fullName: getCookie.fullName,
            phoneNumber: getCookie.phoneNumber,
            roles: state.dataUser.roles,
            username: getCookie.username,
            password: state.dataUser.password,
            id: getCookie.id,
        })
            .then((res) => {
                message.success("Update Email Successful");
                setCookie("user", JSON.stringify(res.data), 864000);
                setTimeout(function () {
                    history.go(0);
                }, 1000);
            })
            .catch((err) => handleError(err));
    };

    const onSubmitPassword = (values: any) => {
        let config = {
            headers: {
                Authorization: "Bearer " + getToken,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
        };
        const formData = new FormData();
        formData.append("oldpassword", values.oldpassword);
        formData.append("password", values.password);
        formData.append("confirm_password", values.confirm_password);
        formData.append("username", state.dataUser.username);
        api.put(`/user/changepass-user`, formData, config)
            .then((res) => {
                message.success("Change Password Successful");
            })
            .catch((err) => handleError(err));
    };

    const handleError = (err: ErrorType) => {
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error("Invalid username or password");
                break;
            case 401:
                message.error("Invalid username or password");
                break;
            case 500:
                message.error("Request Login Failed");
                break;
            default:
                message.error("Request Login Failed");
        }
    };

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
                    <h1>E-mail &amp; Password</h1>
                    <Form
                        className="rows"
                        id="change_email"
                        onFinish={onSubmitEmail}
                        form={form_Email}
                    >
                        <h2>Change E-mail</h2>
                        <div className="rows">
                            <div className="columns">
                                <label className="current_email">
                                    Current Email: {state.dataUser.email}
                                </label>
                            </div>
                            <div className="columns">
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
                                    <Input
                                        placeholder="abc@email.com"
                                        style={{ borderRadius: "10px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className="columns">
                                <button className="button small">Submit</button>
                            </div>
                        </div>
                    </Form>
                    <Form
                        id="change_password"
                        onFinish={onSubmitPassword}
                        form={form_Password}
                    >
                        <h2>Change Password</h2>
                        <div className="rows">
                            <div className="columns">
                                <Form.Item
                                    name="oldpassword"
                                    label="Current Password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                        {
                                            pattern: /^.{6,40}$/,
                                            message:
                                                "Password must be minimum 6 characters, maximum of 40 characters,",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        style={{ borderRadius: "10px" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="New Password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                        {
                                            pattern: /^.{6,40}$/,
                                            message:
                                                "Password must be minimum 6 characters, maximum of 40 characters,",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        style={{ borderRadius: "10px" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    label="Confirm Password"
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please confirm your password!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Password are not matching"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        style={{ borderRadius: "10px" }}
                                    />
                                </Form.Item>
                            </div>
                            <div className="columns">
                                <button className="button small">Submit</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
