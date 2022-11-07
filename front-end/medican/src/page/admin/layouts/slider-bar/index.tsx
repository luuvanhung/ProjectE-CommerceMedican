import { default as React } from "react";
import { Link } from "react-router-dom";

export default function SiderBarProfile() {
    return (
        <div className="large-3 cell small-order-2 large-order-1">
            <ul id="profile_navigation" className="vertical menu side-nav">
                <li>
                    <Link to="#">Account</Link>
                    <ul className="nested vertical menu">
                        <li>
                            <Link to="/profile/login">
                                E-mail &amp; Password
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/personal">
                                Contact Information
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/profile/quotes">
                                Quote Request History
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/product_registrations">
                                Product Registrations
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
