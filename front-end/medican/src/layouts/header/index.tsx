/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/alt-text */
import "antd/dist/antd.css";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import { SLUG_URL } from "../../constants/slug";
import "./style.scss";
import { Button } from 'antd';
interface CategoryData {
    categoryId?: string | number;
    categoryName?: string;
}
interface SubCategoryData {
    subCategoryId?: string | number;
    subCategoryName?: string | any;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuView(categoryData: CategoryData) {
    return (
        <li key={categoryData.categoryId}>
            {/* <Link to={`/category/${SLUG_URL(categoryData.name!)}/${categoryData.id}`}>{categoryData.name}</Link> */}
            <Link to={`/#`}>{categoryData.categoryName}</Link>
        </li>
    );
}
function SubCategoriView(subCategoryData: SubCategoryData) {
    return (
        <li key={subCategoryData.subCategoryId}>
            <Link
                to={`/sub-categories/${SLUG_URL(
                    subCategoryData.subCategoryName
                )}/${subCategoryData.subCategoryId}`}
            >
                {subCategoryData.subCategoryName}
            </Link>
        </li>
    );
}
export default function HeaderLayout() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const CATEGORIES_API = `/category/get-categorys`;
    const SUB_CATEGORIES_API = `/subcategory/get-allsub`;
    const [isLoading, setIsLoading] = useState(false);
    const getUserName = Cookies.get("username");

    const logOut = () => {
        Cookies.remove("username");
        Cookies.remove("accessToken");
        Cookies.remove("user");
        window.location.href = "/logout";
    };

    return (
        <>
            <div id="about-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">About Labconco</li>
                                <li>
                                    <a href="/company/how-we-give">
                                        How We Give Back
                                    </a>
                                </li>
                                <li>
                                    <a href="/company/green-initiatives">
                                        Our Green Initiatives
                                    </a>
                                </li>
                                <li>
                                    <a href="/company/our-story">Our Story</a>
                                </li>
                                <li>
                                    <a href="/company/our-values">Our Values</a>
                                </li>
                                <li>
                                    <a href="/company/our-promise">
                                        Our Promise
                                    </a>
                                </li>
                                <li>
                                    <a href="/portfolios">Our Portfolio</a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">
                                    Career Opportunities
                                </li>
                                <li>
                                    <a href="/careers">Working at Labconco</a>
                                </li>
                                <li>
                                    <a href="/careers/available-positions">
                                        Apply Online
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">GSA Purchasing</li>
                                <li>
                                    <a href="/company/gsa-contracts">
                                        GSA Contracts
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            {/* <p><em>TBD - Column 4</em></p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div id="header-one">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="auto cell">
                            <ul
                                className="dropdown menu align-right"
                                id="user-nav"
                                data-dropdown-menu
                                data-disable-hover="false"
                                data-click-open="false"
                                role="menubar"
                                data-e="vb0tgc-e"
                            >
                                <li className="show-for-medium" role="menuitem">
                                    <a href="/" className="user-nav-about">
                                        About Labconco
                                    </a>
                                </li>
                                <li className="show-for-medium" role="menuitem">
                                    <a href="/">Contact Us</a>
                                </li>
                                <li
                                    role="menuitem"
                                    className="is-dropdown-submenu-parent opens-left"
                                    aria-haspopup="true"
                                    aria-label="Cart"
                                >
                                    <div className="hover-button">
                                        <a
                                            href="/#"
                                            className="user-nav-cart hover-button--off"
                                            data-toggle="mini-cart"
                                        >
                                            Cart
                                        </a>
                                        <ul
                                            className="menu submenu is-dropdown-submenu first-sub vertical hover-button--on"
                                            id="mini-cart"
                                            data-submenu
                                            role="menu"
                                        >
                                            <li
                                                role="menuitem"
                                                className="is-submenu-item is-dropdown-submenu-item"
                                            >
                                                <a href="/cart">
                                                    Items to Purchase: 0
                                                </a>
                                            </li>
                                            <li
                                                role="menuitem"
                                                className="is-submenu-item is-dropdown-submenu-item"
                                            >
                                                <a href="/quote">
                                                    Items for Quote: 0
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {getUserName ? (
                                    <li
                                        className="user-nav-account show-for-medium"
                                        role="menuitem"
                                    >
                                        <Link
                                            to="/logout"
                                            onClick={() => logOut()}
                                        >
                                            Logout
                                        </Link>
                                        <Link
                                            to="/profile"
                                            id="user-nav-account"
                                        >
                                            Hi,{getUserName}
                                        </Link>
                                    </li>
                                ) : (
                                    <li
                                        className="user-nav-account show-for-medium"
                                        role="menuitem"
                                    >
                                        <Link to="/login">Login</Link>
                                        <Link
                                            to="/register"
                                            id="user-nav-register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                )}{" "}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="header-two" className="show-for-xlarge">
                <div className="row">
                    <Link to="/" id="logo" className="float-left">
                        <img src="https://www.labconco.com/assets/ui/labconco-logo-380.png" />
                    </Link>
                    <ul className="menu float-right" id="top-nav">
                        <li>
                            <a onClick={() => setIsLoading(!isLoading)}>
                                Product
                            </a>
                        </li>
                        <li>
                            <a href="/#">Markets</a>
                        </li>

                        <li>
                            <a href="/sales">Sales</a>
                        </li>
                        <li>
                            <a href="/services">Services</a>
                        </li>
                        <li>
                            <a href="/news">News</a>
                        </li>
                        <li>
                            <a>
                                <i className="fa fa-search" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {isLoading && (
                <div
                    id="products-nav"
                    className="top-nav-panel"
                    style={{ display: "block" }}
                >
                    <div className="row">
                        <div className="grid-x grid-margin-x">
                            <div className="cell auto">
                                <ul className="vertical menu">
                                    <li className="menu-text">Categories</li>
                                    <Card
                                        cardView={MenuView}
                                        urlApi={CATEGORIES_API}
                                    />
                                </ul>
                            </div>
                            <div className="cell auto">
                                <ul className="vertical menu">
                                    <li className="menu-text">Sub-Category</li>
                                    <Card
                                        cardView={SubCategoriView}
                                        urlApi={SUB_CATEGORIES_API}
                                    />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div id="markets-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">
                                    <a href="/markets">Markets</a>
                                </li>
                                <li>
                                    <a href="/architects">
                                        Architects and Engineers
                                    </a>
                                </li>
                                <li>
                                    <a href="/biopharma">Biopharma</a>
                                </li>
                                <li>
                                    <a href="/clinical">Clinical</a>
                                </li>
                                <li>
                                    <a href="/forensics">Forensics</a>
                                </li>
                                <li>
                                    <a href="/pharmacy">Pharmacy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="resources-nav" className="top-nav-panel active">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Literature</li>
                                <li>
                                    <a href="/resources/brochures">Brochures</a>
                                </li>
                                <li>
                                    <a href="/resources/manuals">
                                        User's Manuals
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/spanish">En Español</a>
                                </li>
                                <li>
                                    <a href="/resources/white-papers">
                                        White Papers
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">
                                    Technical Resources
                                </li>
                                <li>
                                    <a href="/resources/3-part-specs">
                                        3-Part Specs
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/app-notes">
                                        Application Notes
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/cad">CAD Drawings</a>
                                </li>
                                <li>
                                    <a href="/resources/revit">Revit Models</a>
                                </li>
                                <li>
                                    <a href="/resources/declarations-of-conformity">
                                        Declarations of Conformity
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/iq">IQ/OQ</a>
                                </li>
                                <li>
                                    <a href="/resources/sds">
                                        Safety Data Sheets
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/software-apps">
                                        Software &amp; Apps
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/tech-manuals">
                                        Technical Manuals
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Media</li>
                                <li>
                                    <a href="/articles/category/articles">
                                        Articles
                                    </a>
                                </li>
                                <li>
                                    <a href="/articles/category/infographics">
                                        Infographics
                                    </a>
                                </li>
                                <li>
                                    <a href="/resources/video">Videos</a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <p>TBD?</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="sales-support-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Sales</li>
                                <li>
                                    <a href="/sales-and-support/us-and-canada-sales">
                                        US &amp; Canada Sales
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/international-sales">
                                        International Sales
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/gsa-contracts">
                                        GSA Contracts
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Support</li>
                                <li>
                                    <a href="/sales-and-support/us-and-canada-customer-service">
                                        US &amp; Canada Customer Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/international-customer-service">
                                        International Customer Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/international-support">
                                        International Support
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/product-service">
                                        Product Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/sales-and-support/product-specialists">
                                        Application Specialists
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Distributors</li>
                                <li>
                                    <a href="/distributors/category/global">
                                        Global
                                    </a>
                                </li>
                                <li>
                                    <a href="/distributors/category/united-states">
                                        US &amp; Canada
                                    </a>
                                </li>
                                <li>
                                    <a href="/distributors/category/united-states-construction-renovation-projects">
                                        US - Construction/Renovation Projects
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Project Support</li>
                                <li>
                                    <a href="/sales-and-support/project-management">
                                        Project Management
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="news-events-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">News</li>
                                <li>
                                    <a href="/news/category/blog">Blog</a>
                                </li>
                                <li>
                                    <a href="/news/category/promotions">
                                        Promotions
                                    </a>
                                </li>
                                <li>
                                    <a href="/news/category/press-releases">
                                        Press Releases
                                    </a>
                                </li>
                                <li>
                                    <a href="/news/category/product-announcements">
                                        Product Announcements
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Events</li>
                                <li>
                                    <a href="/events/category/trade-shows">
                                        Trade Shows
                                    </a>
                                </li>
                                <li>
                                    <a href="/events/category/webinars">
                                        Webinars
                                    </a>
                                </li>
                                <li>
                                    <a href="/events/category/seminars-and-workshops">
                                        Seminars &amp; Workshops
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <p>TBD</p>
                        </div>
                        <div className="cell auto">
                            <p>TBD</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="services-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">Services</li>
                                <li>
                                    <a href="/services/architect-binder">
                                        Architectural Resource Binder
                                    </a>
                                </li>
                                <li>
                                    <a href="/services/request-chemical-assessment">
                                        Chemical Assessment Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/services/chemical-guide-for-filtered-enclosures">
                                        Chemical Reference Guide for Ductless
                                        Hoods
                                    </a>
                                </li>
                                <li>
                                    <a href="/services/filter-reminder">
                                        Filter Replacement Reminder
                                    </a>
                                </li>
                                <li>
                                    <a href="/services/waterprofile-test-kit">
                                        Water Profile Test Kit
                                    </a>
                                </li>
                                <li>
                                    <a href="/services/xpress-inventory">
                                        48-Hour XPress
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <ul className="vertical menu">
                                <li className="menu-text">
                                    Product Registration
                                </li>
                                <li>
                                    <a href="/services/product-registration">
                                        Product Registration Form
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="cell auto">
                            <p>TBD</p>
                        </div>
                        <div className="cell auto">
                            <p>TBD</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search-nav" className="top-nav-panel">
                <div className="row">
                    <div className="grid-x grid-margin-x">
                        <div className="large-2 large-offset-2 cell text-right">
                            <h2>Search</h2>
                        </div>
                        <div className="large-4 cell">
                            <form
                                method="get"
                                action="/search/search-results.php"
                            >
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="zoom_query"
                                        maxLength={48}
                                        placeholder="Keyword or Catalog Number"
                                        id="top-search-query"
                                        className="input-group-field"
                                        data-cmc3-omnisearch
                                    />
                                    <div className="input-group-button">
                                        <button
                                            type="submit"
                                            className="button"
                                            id="top-search-submit"
                                        >
                                            <i
                                                className="fa fa-search"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* mobile */}
            <div id="header-two-mobile" className="hide-for-xlarge">
                <div className="row">
                    <a href="/" id="logo-mobile" className="float-left">
                        <img src="https://www.labconco.com/assets/ui/labconco-logo-380.png" />
                    </a>
                    <button
                        className="float-right"
                        id="top-nav-mobile-button"
                        data-toggle="top-nav-mobile top-nav-mobile-button"
                        data-toggler=".active"
                        aria-expanded="false"
                        data-e="zmnio9-e"
                    >
                        <i className="material-icons">menu</i>
                    </button>
                </div>
            </div>
            <ul
                className="menu vertical"
                id="top-nav-mobile"
                data-toggler
                data-animate="hinge-in-from-top hinge-out-from-top"
                style={{ display: "none" }}
                aria-expanded="false"
                data-e="ysf0yf-e"
            >
                <li className="user-nav-account show-for-medium">
                    <a href="/login">Login</a>
                    <a href="/profile/register" id="user-nav-register">
                        Register
                    </a>
                </li>{" "}
                <li>
                    <a href="/category">Products</a>
                </li>
                <li>
                    <a href="/markets">Markets</a>
                </li>
                <li>
                    <a href="/literature">Resources</a>
                </li>
                <li>
                    <a href="/sales-and-support">Sales &amp; Support</a>
                </li>
                <li>
                    <a href="/news">News</a>
                </li>
                <li>
                    <a href="/events">Events</a>
                </li>
                <li>
                    <a href="/services">Services</a>
                </li>
                <li>
                    <a href="/company">About Labconco</a>
                </li>
                <li>
                    <a href="/contact">Contact Us</a>
                </li>
                <li className="top-nav-mobile-search">
                    <form method="get" action="/search/search-results.php">
                        <label>Search</label>
                        <div className="input-group">
                            <input
                                type="text"
                                name="zoom_query"
                                maxLength={48}
                                placeholder="Keyword or Catalog Number"
                                id="top-search-query"
                                className="input-group-field"
                            />
                            <div className="input-group-button">
                                <button
                                    type="submit"
                                    className="button"
                                    id="top-search-submit"
                                >
                                    <i
                                        className="fa fa-search"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                </li>
            </ul>
        </>
    );
}
