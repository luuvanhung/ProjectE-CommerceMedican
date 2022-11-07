/* eslint-disable jsx-a11y/alt-text */
import { default as React } from "react";
import SiderBarProfile from "./layouts/slider-bar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    return (
        <div className="grid-x">
            <SiderBarProfile />
            <div className="large-9 cell small-order-1 large-order-2">
                <div className="profile">
                    <h1>Dashboard</h1>
                    <div className="grid-x grid-margin-x">
                        <div className="large-6 cell">
                            <div className="box_two">
                                <h2>
                                    <Link to="/profile/quotes">
                                        Quote Request History
                                    </Link>
                                </h2>
                            </div>
                            <div className="box_two">
                                <h2>
                                    <Link to="/profile/product_registrations">
                                        Product Registrations
                                    </Link>
                                </h2>
                            </div>
                        </div>
                        <div className="large-6 cell">
                            <div className="box_two">
                                <h2>
                                    <Link to="/profile/login">
                                        E-mail &amp; Password
                                    </Link>
                                </h2>
                            </div>
                            <div className="box_two">
                                <h2>
                                    <Link to="/profile/personal">
                                        Contact Information
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
