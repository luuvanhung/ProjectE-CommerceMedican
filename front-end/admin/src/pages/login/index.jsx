import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import Cookies from "js-cookie";
import { default as React } from "react";
import api from "../../constants/api";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import "./style.css";
interface User {
    username: string;
    password: string;
}
interface LoginType {
    data: { data: { username: string, expireIn: number, accessToken: string } };
}
interface ErrorType {
    response: {
        status?: number,
        data: {
            message: [{ field: string, message: string }],
        },
    };
}

export default function LoginPage() {
    const [form] = Form.useForm();

    const onFinish = (values: User) => {
        api.post("auth/signin", values)
            .then((res: LoginType) => {
                setCookie("admin", res.data.roles[0], parseJwt(res.data.token));
                setCookie("usernameAdmin", res.data.username, parseJwt(res.data.token));
                message.success("Login Successful");
                window.location.href = '/'
            })
            .catch((errors: ErrorType) => handleError(errors));
    }

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
        <div className="container-login">
            <div className="wrap-login">
                <div className="login-img">
                    <img
                        src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                        alt="IMG"
                    />
                </div>
                <Form
                    form={form}
                    name="form__login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 6 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <span className="form__spanLogin">Member Login</span>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input className="form__input" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password style={{ width: "200px" }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            htmlType="submit"
                            className="form__submitAction"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
