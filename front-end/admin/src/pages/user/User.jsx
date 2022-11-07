/* eslint-disable react-hooks/exhaustive-deps */
import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { default as Select } from "antd/es/select";
import "antd/es/select/style/index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import api from "./../../constants/api";
import "./user.css";
import { SmileOutlined } from "@ant-design/icons";
import { FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Option } = Select;
export default function User() {
    const [state, setState] = useState({
        userDetail: "",
        dataRole: "",
        dataValueUpdate: {},
    });
    const path: Path = useParams();
    const [form] = Form.useForm();
    const [form_password] = Form.useForm();
    const history = useHistory();

    async function getDataList() {
        try {
            const response = await api.get(`/user/${path.userId}`);
            const { data: userData } = response;
            setState((prev) => ({
                userDetail: userData,
                dataRole: userData.roles.map((item) => item.name),
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
    }, []);

    const onFinish = (values) => {
        api.put(`/user/update/${path.userId}`, {
            ...values,
            role: state.userDetail.roles,
        })
            .then((res) => {
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

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    const onSubmitPassword = (value) => {
        console.log(value);
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                {state.userDetail.fullName}
                            </span>
                            <span className="userShowUserTitle">
                                {state.userDetail.roles?.map((role) => {
                                    return role.name;
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {state.userDetail.username}
                            </span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {state.userDetail.phoneNumber}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {state.userDetail.email}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {state.userDetail.address}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <div className="userUpdateLeft userForm">
                        {state?.userDetail && (
                            <Form
                                className="UserForm"
                                onFinish={onFinish}
                                initialValues={state?.userDetail}
                                form={form}
                                onValuesChange={onChangeUpdate}
                                style={{ flexDirection: "column" }}
                            >
                                <div className="userUpdateItem">
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
                                        <Input
                                            disabled
                                            placeholder="Username: abc"
                                            style={{ borderRadius: "10px" }}
                                        />
                                    </Form.Item>
                                </div>
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
                                    <Input
                                        placeholder="Full Name: Nguyen Van A"
                                        style={{ borderRadius: "10px" }}
                                    />
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
                                    <Input
                                        placeholder="012346789"
                                        style={{ borderRadius: "10px" }}
                                    />
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
                                    <Input
                                        placeholder="Viet Nam"
                                        style={{ borderRadius: "10px" }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Role Active"
                                    // name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your role!",
                                        },
                                    ]}
                                    style={{ borderRadius: "10px" }}
                                >
                                    <Select
                                        disabled={true}
                                        defaultValue={state.userDetail.roles.map(
                                            (item) => item.name
                                        )}
                                        placeholder="Select a role for User"
                                        allowClear
                                        style={{ borderRadius: "10px" }}
                                    >
                                        <Option
                                            value="ROLE_ADMIN"
                                            key="ROLE_ADMIN"
                                        >
                                            Admin
                                        </Option>
                                        <Option
                                            value="ROLE_USER"
                                            key="ROLE_USER"
                                        >
                                            User
                                        </Option>
                                        <Option value="ROLE_USER, ROLE_ADMIN">
                                            Admin, User
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <Button
                                    htmlType="submit"
                                    className="userUpdateButton"
                                    disabled={
                                        state?.dataValueUpdate ? false : true
                                    }
                                >
                                    Update
                                </Button>
                            </Form>
                        )}
                    </div>
                    <div className="userUpdateRight">
                        <div
                            className="userUpdateUpload"
                            style={{ float: "right" }}
                        >
                            <img
                                className="userUpdateImg"
                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                            />
                            <label htmlFor="file">
                                <Publish className="userUpdateIcon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="userChangePassword">
                <div className="userTitleContainerChangePassword">
                    <div className="userContainerChangePassword">
                        <h1>Change Password</h1>
                        <Form
                            id="change_password"
                            onFinish={onSubmitPassword}
                            form={form_password}
                        >
                            <Form.Item
                                name="currentPassword"
                                label="Current Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
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
                                        message: "Please input your password!",
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
                                                getFieldValue("password") ===
                                                    value
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
                            <div className="columns">
                                <button className="userUpdateButton small">Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
