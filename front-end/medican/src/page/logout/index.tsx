import "antd/dist/antd.css";
import { default as React } from "react";
import "./style.scss";
import { Link } from 'react-router-dom';

export default function LogoutPage() {
    return (
        <div className="article">
            <h1 style={{textTransform: 'capitalize'}}>Logout complete</h1>
            <p>
                <Link to="/login">
                    Login
                </Link>
            </p>
            <Link to="/">
                Continue Shopping
            </Link>
        </div>
    );
}
