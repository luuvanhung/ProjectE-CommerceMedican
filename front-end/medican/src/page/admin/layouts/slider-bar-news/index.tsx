import { default as React } from "react";
import { Link } from "react-router-dom";

export default function SiderBarNewPage() {
    return (
        <div className="large-3 cell small-order-2 large-order-1">
            <ul className="vertical menu side-nav thin">
                <li>
                    <Link to="#">News</Link>
                    <ul className="nested vertical menu">
                        <li>
                            <span className="side-nav-sub">Filter by Type</span>
                        </li>
                        <li className="selected">
                            <Link to="#">Blog</Link>
                        </li>
                        <li>
                            <Link to="#">Press Releases</Link>
                        </li>
                        <li>
                            <Link to="#">Product Announcements</Link>
                        </li>
                        <li>
                            <span className="side-nav-sub">Archive</span>
                        </li>
                        <li>
                            <Link to="#">2022</Link>
                        </li>
                        <li>
                            <Link to="#">2021</Link>
                        </li>
                        <li>
                            <Link to="#">2020</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
