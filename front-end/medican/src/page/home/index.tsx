/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { default as React, Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import ImageSlider from "../../components/image-slider/ImageSlider";
import { SLUG_URL } from "../../constants/slug";
import FooterLayout from "../../layouts/footer";
import HeaderLayout from "../../layouts/header";
import CardView from "./../../components/card-view/index";
import { SliderData } from "./../../components/image-slider/SliderData";
import "./style.scss";

interface ProductData {
    productId?: number | string;
    productName?: string;
    description?: string;
    image?: string;
    imageProduct?: string;
}

interface NewData {
    title?: String;
    content?: string;
    newsId?: number | string;
    imageurl?: string;
    nameurl?: string;
}

function cardView(cardData: ProductData) {
    return (
        <div className="cell" key={cardData.productId}>
            <div className="product-thumb-swoosh master">
                <Link
                    to={`/products/${SLUG_URL(cardData.productName || "")}/${
                        cardData.productId
                    }`}
                    className="swoosh"
                >
                    {/*<Link to={`/`} className="swoosh">*/}
                    <img
                        alt="Purifier Logic+ A2 Safety Cabinet on Stand"
                        src={cardData.imageProduct}
                    />
                </Link>
                <h5>
                    <Link to={`/}`} style={{ textTransform: "capitalize" }}>
                        {cardData.productName}
                    </Link>
                </h5>
                <p>{ReactHtmlParser(cardData.description || "")}</p>
            </div>
        </div>
    );
}

function equipmentSearch() {
    return (
        <div className="row">
            <div className="large-6 xlarge-8 columns">
                <Link to="/#">
                    <img src="https://www.labconco.com/images/cms/wide-large/quick-easy-equipment-selection-tools.jpg" />
                </Link>
            </div>
            <div className="large-6 xlarge-4 columns">
                <h2>
                    <Link to="/">Equipment Search Tools</Link>
                </h2>
                <p>
                    Our lab equipment search tools will help you find the right
                    equipment and components. Quick.&nbsp;
                </p>
                <ul>
                    <li>
                        <Link to="/#">Freeze Dryer Configurator</Link>
                    </li>
                    <li>
                        <Link to="/#">Fume Hood Configurator</Link>
                    </li>
                    <li>
                        <Link to="/#">Glassware Washer Selection Tools</Link>
                    </li>
                    <li>
                        <Link to="/#">Scout Lab Equipment Selector</Link>
                    </li>
                </ul>

                <Link to="/#" className="button">
                    View all Tools
                </Link>
            </div>
        </div>
    );
}

function service() {
    return (
        <div className="row">
            <div className="large-6 xlarge-8 large-push-6 xlarge-push-4 columns">
                <img src="https://www.labconco.com/images/cms/wide-large/e_watkins_atdesk_resized_20211104.jpg" />
            </div>
            <div className="large-6 xlarge-4 large-pull-6 xlarge-pull-8 columns">
                <h2>
                    <Link to="/#">Services</Link>
                </h2>
                <p>Our free services let us get right to work helping you.</p>
                <ul>
                    <li>
                        <Link to="/services/chemical-guide-for-filtered-enclosures">
                            Chemical guide for ductless hoods
                        </Link>
                    </li>
                    <li>
                        <Link to="/services/request-chemical-assessment">
                            Chemical assessment request
                        </Link>
                    </li>
                    <li>
                        <Link to="/services/waterprofile-test-kit">
                            Water profile testing
                        </Link>
                    </li>
                    <li>
                        <Link to="/architects">Architectural resources</Link>
                    </li>
                    <li>
                        <Link to="/services/filter-reminder">
                            Filter change reminder service
                        </Link>
                    </li>
                </ul>
                <a href="/services" className="button">
                    View all Services
                </a>
            </div>
        </div>
    );
}

function cardNew() {
    return (
        <Fragment>
            <ul className="tabs" data-tabs="" id="news-tabs" role="tablist">
                <li className="tabs-title is-active" role="presentation">
                    <Link
                        to="#"
                        data-tabs-target="featured-news"
                        aria-selected="true"
                        role="tab"
                        aria-controls="featured-news"
                        id="featured-news-label"
                    >
                        News
                    </Link>
                </li>
                <li className="tabs-title" role="presentation">
                    <Link
                        to="#"
                        data-tabs-target="featured-events"
                        role="tab"
                        aria-controls="featured-events"
                        aria-selected="false"
                        id="featured-events-label"
                    >
                        Events
                    </Link>
                </li>
            </ul>
            <div className="tabs-content">
                <div className="tabs-panel is-active" id="feature-news">
                    <h2>News</h2>
                    <hr></hr>
                    <Link to="/#" className="index-card">
                        <div className="grid-x grid-margin-x">
                            <div className="medium-4 cell">
                                <img src="https://www.labconco.com/images/cms/wide-med/brent-griffith-3d-lab.png" />
                            </div>
                            <div className="medium-8 cell">
                                <h4>
                                    3D Printing at Labconco Generates
                                    Sustainability and Agility
                                </h4>
                                <div>
                                    <p>
                                        <span>
                                            I was amazed to find a room
                                            populated with dozens of 3D printers
                                            that I didn’t even realize we had in
                                            our facilities. They overwhelmed
                                            most of an area we used to call “the
                                            ping pong room” because it
                                            historically housed a popular
                                            breaktime diversion for our
                                            engineers. What I saw there blew my
                                            mind.&nbsp;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/#" className="index-card">
                        <div className="grid-x grid-margin-x">
                            <div className="medium-4 cell">
                                <img src="https://www.labconco.com/images/cms/wide-med/brent-griffith-3d-lab.png" />
                            </div>
                            <div className="medium-8 cell">
                                <h4>
                                    3D Printing at Labconco Generates
                                    Sustainability and Agility
                                </h4>
                                <div>
                                    <p>
                                        <span>
                                            I was amazed to find a room
                                            populated with dozens of 3D printers
                                            that I didn’t even realize we had in
                                            our facilities. They overwhelmed
                                            most of an area we used to call “the
                                            ping pong room” because it
                                            historically housed a popular
                                            breaktime diversion for our
                                            engineers. What I saw there blew my
                                            mind.&nbsp;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/#" className="index-card">
                        <div className="grid-x grid-margin-x">
                            <div className="medium-4 cell">
                                <img src="https://www.labconco.com/images/cms/wide-med/brent-griffith-3d-lab.png" />
                            </div>
                            <div className="medium-8 cell">
                                <h4>
                                    3D Printing at Labconco Generates
                                    Sustainability and Agility
                                </h4>
                                <div>
                                    <p>
                                        <span>
                                            I was amazed to find a room
                                            populated with dozens of 3D printers
                                            that I didn’t even realize we had in
                                            our facilities. They overwhelmed
                                            most of an area we used to call “the
                                            ping pong room” because it
                                            historically housed a popular
                                            breaktime diversion for our
                                            engineers. What I saw there blew my
                                            mind.&nbsp;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/#" className="index-card">
                        <div className="grid-x grid-margin-x">
                            <div className="medium-4 cell">
                                <img src="https://www.labconco.com/images/cms/wide-med/brent-griffith-3d-lab.png" />
                            </div>
                            <div className="medium-8 cell">
                                <h4>
                                    3D Printing at Labconco Generates
                                    Sustainability and Agility
                                </h4>
                                <div>
                                    <p>
                                        <span>
                                            I was amazed to find a room
                                            populated with dozens of 3D printers
                                            that I didn’t even realize we had in
                                            our facilities. They overwhelmed
                                            most of an area we used to call “the
                                            ping pong room” because it
                                            historically housed a popular
                                            breaktime diversion for our
                                            engineers. What I saw there blew my
                                            mind.&nbsp;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

function newsService(cardNew: NewData) {
    return (
        <Fragment>
            <Link to={`/news/${cardNew.newsId}`} className="index-card">
                <div className="grid-x grid-margin-x">
                    <div className="medium-4 cell">
                        <img src={cardNew.imageurl} />
                    </div>
                    <div className="medium-8 cell">
                        <h4>{cardNew.title}</h4>
                        <div>
                            <p
                                style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: cardNew.content || "",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </Fragment>
    );
}

export default function HomePage() {
    const PRODUCT_API = `/product/list-products`;
    const SUB_CATEGORY_API = `/subcategory/get-allsub`
    const NEWS_API = "/news/list-news";
    const numberRenderProduct = 8;
    const numberRenderNews = 5;

    return (
        <Fragment>
            <HeaderLayout />
            {/* <BannerLayout /> */}
            <ImageSlider slides={SliderData} />
            <div className="stripe">
                <div className="row">
                    <section id="featured-products" className="article">
                        <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-4">
                            <CardView
                                cardView={cardView}
                                urlApi={PRODUCT_API}
                                lengthRender={numberRenderProduct}
                            />
                        </div>
                    </section>
                    <section className="article border-top">
                        {equipmentSearch()}
                    </section>
                    <section className="article border-top">
                        {service()}
                    </section>
                    <section className="article border-top" id="feeds">
                        <ul
                            className="tabs"
                            data-tabs=""
                            id="news-tabs"
                            role="tablist"
                        >
                            <li
                                className="tabs-title is-active"
                                role="presentation"
                            >
                                <Link
                                    to="#"
                                    data-tabs-target="featured-news"
                                    aria-selected="true"
                                    role="tab"
                                    aria-controls="featured-news"
                                    id="featured-news-label"
                                >
                                    News
                                </Link>
                            </li>
                            <li className="tabs-title" role="presentation">
                                <Link
                                    to="#"
                                    data-tabs-target="featured-events"
                                    role="tab"
                                    aria-controls="featured-events"
                                    aria-selected="false"
                                    id="featured-events-label"
                                >
                                    Events
                                </Link>
                            </li>
                        </ul>

                        <div className="tabs-content">
                            <div
                                className="tabs-panel is-active"
                                id="feature-news"
                            >
                                <h2>News</h2>
                                <hr></hr>
                                <CardView
                                    cardView={newsService}
                                    urlApi={NEWS_API}
                                    lengthRender={numberRenderNews}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <FooterLayout />
        </Fragment>
    );
}
