/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import {
    FacebookOutlined,
    GooglePlusOutlined,
    InstagramOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import React from "react";

export default function FooterLayout() {
    return (
        <>
            <div className="stripe shadow right"></div>

            <div id="footer">
                <div className="footer-top">
                    <div className="row">
                        <div className="grid-x grid-margin-x">
                            {/* noindex */}
                            {/*ZOOMSTOP*/}
                            <div className="medium-5 large-auto cell">
                                <ul className="vertical menu">
                                    <li>
                                        <a href="/category">Products</a>
                                    </li>
                                    <li>
                                        <a href="/tools">
                                            Product Selection Tools
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/resources">Resources</a>
                                    </li>
                                    <li>
                                        <a href="/sales-and-support">
                                            Sales &amp; Support
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/distributors">Distributors</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="medium-5 large-auto cell">
                                <ul className="vertical menu">
                                    <li>
                                        <a href="/company">About</a>
                                    </li>
                                    <li>
                                        <a href="/careers">
                                            Career Opportunities
                                        </a>
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
                                </ul>
                            </div>
                            <div className="medium-2 large-2 cell">
                                <ul className="vertical menu">
                                    <li>
                                        <a href="/contact">Contact</a>
                                    </li>
                                    <li>
                                        <a href="/feedback">Feedback</a>
                                    </li>
                                    <li>
                                        <a href="/sitemap">Sitemap</a>
                                    </li>
                                    <li>
                                        <a href="/standards-and-certifications">
                                            Standards &amp; Certifications
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* index */}
                            {/*ZOOMRESTART*/}
                            <div className="medium-5 large-auto cell">
                                <ul className="vertical menu padding-top">
                                    <li>
                                        <a href="https://www.labconco.com/terms-and-conditions/terms-and-conditions">
                                            Terms of Online Purchases
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.labconco.com/terms-and-conditions/privacy-policy">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.labconco.com/terms-and-conditions/terms-of-use">
                                            Terms of Use
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.labconco.com/terms-and-conditions/trademarks">
                                            Trademarks
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.labconco.com/terms-and-conditions/warranty">
                                            Warranty
                                        </a>
                                    </li>{" "}
                                </ul>
                            </div>
                            <div className="medium-7 large-auto cell">
                                <p className="padding-top">
                                    <b>Labconco Corporation</b>
                                    <br />
                                    8811 Prospect Avenue
                                    <br />
                                    Kansas City, MO 64132-2696
                                </p>
                                <p>
                                    (816) 333-8811 <b>phone</b>
                                    <br />
                                    (816) 363-0130 <b>fax</b>
                                    <br />
                                    (800) 821-5525 <b>toll-free</b>
                                </p>
                                <ul className="menu social">
                                    <li>
                                        <a href="/">
                                            <GooglePlusOutlined style={{fontSize: 25,margin: ' 0px 10px' }}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <FacebookOutlined style={{fontSize: 25,margin: ' 0px 10px' }}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <InstagramOutlined style={{fontSize: 25,margin: ' 0px 10px' }}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <YoutubeOutlined style={{fontSize: 25,margin: ' 0px 10px' }}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="row">
                        <div className="grid-x grid-margin-x">
                            <div className="medium-shrink cell">
                                <a href="/" id="footer-logo">
                                    <img src="https://www.labconco.com/assets/ui/labconco-logo-380.png" />
                                </a>
                            </div>
                            <div className="medium-auto cell">
                                <p id="footer-legal">
                                    © Labconco, 2022 - All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
