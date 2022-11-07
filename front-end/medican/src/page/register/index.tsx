import { Button, Form, Input, message } from "antd";
import "antd/dist/antd.css";
import { default as React } from "react";
import api from "./../../constants/api";
import "./style.scss";

interface User {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: number;
    address: string;
    email: string;
    role: any;
}

interface ErrorType {
    response: {
        status?: number;
        data: {
            message: string;
        };
    };
}

interface RegisterType {
    data: { username: string; expireIn: number; token: string };
}

export default function RegisterPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [form] = Form.useForm();

    const onFinish = (values: User) => {
        api.post("auth/signup", { ...values, role: ["user"] })
            .then((res: RegisterType) => {
                message.success("User registered successfully!");
                // window.location.href = '/'
            })
            .catch((errors: ErrorType) => handlerError(errors));
    };

    const handlerError = (err: ErrorType) => {
        const status = err.response?.status;
        switch (status) {
            case 400:
                message.error(err.response.data.message);
                break;
            case 401:
                message.error("Invalid Register.Check form register");
                break;
            case 500:
                message.error("Request Register Failed");
                break;
            default:
                message.error("Request Register Failed");
        }
    };

    return (
        <div id="article">
            <div className="grid-x">
                <div className="large-3 cell small-order-2 large-order-1">
                    <div className="side-nav-head">
                        <h6 style={{ marginBottom: "0" }}>
                            Benefits of Registering
                        </h6>
                    </div>
                    <div className="side-nav-content">
                        <p>With your registration you can:</p>
                        <ul>
                            <li>
                                access to download CAD, manuals, and other
                                resources
                            </li>
                            <li>
                                submit warranty registration for your products
                            </li>
                            <li>request quotes and purchase online</li>
                            <li>
                                get quick access to your sales or customer
                                service rep
                            </li>
                            <li>
                                manage your user information and preferences
                            </li>
                        </ul>
                        <p>
                            Still have questions? Please{" "}
                            <a href="https://www.labconco.com/contact">
                                contact us
                            </a>
                            .
                        </p>
                    </div>
                </div>
                <div className="large-9 cell small-order-1 large-order-2">
                    <div className="article">
                        <h1>Register</h1>
                        <Form
                            className="register-form"
                            id="user_profile"
                            onFinish={onFinish}
                        >
                            <fieldset className="fieldset">
                                <legend>Login</legend>
                                <Form.Item
                                    name="username"
                                    label="User Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your Username!",
                                        },
                                        {
                                            pattern: /^.{3,20}$/,
                                            message:
                                                "Username must be minimum 3 characters, maximum of 20 characters,",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username: abc" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!",
                                        },
                                        {
                                            pattern: /^.{6,40}$/,
                                            message:
                                                "Password must be minimum 6 characters, maximum of 40 characters,",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        type="password"
                                        placeholder="Password: abc123"
                                    />
                                </Form.Item>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend>Information</legend>
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
                                <Form.Item
                                    name="phoneNumber"
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your phone!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="012346789" />
                                </Form.Item>
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
                                    <Input placeholder="Viet Nam" />
                                </Form.Item>
                            </fieldset>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
