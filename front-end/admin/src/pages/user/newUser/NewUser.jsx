import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from 'antd/es/input';
import 'antd/es/input/style/index.css';
import { default as message } from "antd/es/message";
import "antd/es/message/style/index.css";
import { default as Select } from 'antd/es/select';
import 'antd/es/select/style/index.css';
import api from "./../../../constants/api";
import "./newUser.css";

const { Option } = Select
export default function NewUser() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        api.post("auth/signup", { ...values, role: values.role })
            .then((res) => {
                message.success("User registered successfully!");
                window.location.href = '/'
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
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <Form className="newUserForm" onFinish={onFinish} form={form}>
                <div className="newUserItem">
                    <Form.Item
                        name="username"
                        label="User Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                            {
                                pattern: /^.{3,20}$/,
                                message:
                                    "Username must be minimum 3 characters, maximum of 20 characters,",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Username: abc"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your full name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Full Name: Nguyen Van A"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                required: true,
                                message: "Please input your e-mail!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="abc@email.com"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
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
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
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
                        <Input
                            placeholder="012346789"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: "Please input your address!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Viet Nam"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>
                </div>
                <div className="newUserItem">
                    <Form.Item
                        label="Active"
                        name="roles"
                        rules={[
                            {
                                required: true,
                                message: "Please input your role!",
                            },
                        ]}
                        style={{ borderRadius: "10px" }}
                    >
                        <Select placeholder="Select a role for User" allowClear>
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                            <Option value="admin, user">Admin, User</Option>
                        </Select>
                    </Form.Item>
                </div>
                <button className="newUserButton">Create</button>
            </Form>
        </div>
    );
}
