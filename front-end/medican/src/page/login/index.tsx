import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "antd/dist/antd.css";
import Cookies from "js-cookie";
import { default as React } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import "./style.scss";

interface User {
    username: string;
    password: string;
}

interface ErrorType {
    response: {
        status?: number;
        data: {
            message: [{ field: string; message: string }];
        };
    };
}
interface LoginType {
    data: { username: string; expireIn: number; token: string };
}

export default function LoginPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [form] = Form.useForm();

    const onFinish = (values: User) => {
        api.post("auth/signin", values)
            .then((res: LoginType) => {
                setCookie("username", res.data.username, parseJwt(res.data.token));
                setCookie("accessToken", res.data.token, parseJwt(res.data.token));
                setCookie('user',JSON.stringify(res.data),parseJwt(res.data.token))
                message.success("Login Successful");
                window.location.href = '/'
            })
            .catch((errors: ErrorType) => handlerError(errors));
    }

    const handlerError = (err: ErrorType) => {
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
        <div id="article">
            <div className="grid-x grid-margin-x">
                <div className="large-8 cell">
                    <h2>Benefits to Being a Registered Labconco User</h2>
                    <ul>
                        <li>
                            <strong>Download information</strong>. One
                            registration provides immediate access to hundreds
                            of PDFs, CAD drawings and more.
                        </li>
                        <li>
                            <strong>Save time</strong>. No need to re-enter your
                            information; simply login to quickly download
                            documents and complete forms.
                        </li>
                        <li>
                            <strong>Stay connected</strong>. Access your account
                            any time to change your contact information and view
                            your previous requests for quote and purchases.
                        </li>
                    </ul>
                    <p>Thank you for registering with Labconco.</p>
                </div>
                <div className="large-4 cell">
                    <div className="callout secondary">
                        <h5>Log in to Labconco</h5>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Link className="login-form-forgot" to="/">
                                    Forgot password
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                            Or{" "}
                            <Link className="login-form-forgot" to="/">
                                Register
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mess(message: string, description?: string) {
    // notification.error({
    //     message: message,
    //     description: description,
    // });
}
