/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {
    DownOutlined, LoginOutlined
} from '@ant-design/icons';
import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import { default as Dropdown } from 'antd/es/dropdown';
import 'antd/es/dropdown/style/index.css';
import { default as Menu } from 'antd/es/menu';
import 'antd/es/menu/style/index.css';
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import "./topbar.css";

export default function Topbar() {
    const getUserName = Cookies.get('usernameAdmin')

    const hardCore = () => {
        return (
            <Fragment>
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
            </Fragment>
        );
    };

    const logOut = () => {
        Cookies.remove('admin')
        window.location.href = '/'
    }

    const item = (
        <Menu>
            <Menu.Item key='1' onClick={logOut} icon={<LoginOutlined />} danger>
                LogOut
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        <Link to="/">
                            <img src="https://www.labconco.com/assets/ui/labconco-logo-380.png" />
                        </Link>
                    </span>
                </div>
                <div className="topRight">
                    
                    <Dropdown overlay={item}>
                        <Link
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                        >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNB87zQSYeloXzzJh5uq8nNJ5IB9EhnFEWDA&usqp=CAU"
                                alt=""
                                className="topAvatar"
                                style={{margin: '0 10px'}}
                            />
                            Hi,{getUserName} <DownOutlined />
                        </Link>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
