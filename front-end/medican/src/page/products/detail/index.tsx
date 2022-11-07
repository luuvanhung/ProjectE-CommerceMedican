/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/iframe-has-title */
import { SmileOutlined } from "@ant-design/icons";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Collapse } from "antd/es/collapse";
import "antd/es/collapse/style/index.css";
import { default as InputNumber } from "antd/es/input-number";
import "antd/es/input-number/style/index.css";
import { default as Modal } from "antd/es/modal";
import "antd/es/modal/style/css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import Cookies from "js-cookie";
import { default as React, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router";
import DetailView from "../../../components/detail-view";
import api from "../../../constants/api";
import "./style.scss";

type Value = {
    id: number;
    name: string;
    type: string;
    unit: string;
    value: string;
    values: {
        id: number;
        name: string;
        attributeId: number;
        catalog: number;
    }[];
};
type Values = {
    id: number;
    name: string;
    attributeId: number;
    catalog: number;
    number: number;
};
const { Panel } = Collapse;
interface Attribute {
    attributeId?: number;
    dimensions?: string;
    dimenstionsMetric?: string;
    weight?: number;
    weightMetric?: number;
    electrical?: String;
    country?: String;
}
interface State {
    dataAttribute: Attribute[];
    quantity?: number;
}

interface listData {
    productId?: number;
    productName?: string;
    image?: string;
    imageProduct?: string;
    catalog?: any;
    estimatedShippingWeight?: number;
    estimatedShippingWeightMetric?: number;
    dimensions?: string;
    dimensionsMetric?: string;
    electrical?: string;
    description?: string;
    feature?: string;
    attribute?: Attribute;
    products?: { referenceLink?: string };
    price?: number;
}

interface Cookies {
    id?: Number | String;
    username?: String;
    email?: String;
    password?: String;
    fullName?: String;
    address?: String;
    phoneNumber?: Number;
    roles?: String[];
}

export function ProductDetail(listData: listData) {
    const getImage = listData.image?.split(",") || [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, setState] = useState<State>({
        dataAttribute: [],
        quantity: 0,
    });
    const history = useHistory();
    const getUserCookie: Cookies = JSON.parse(Cookies.get("user")! || "0");
   
    async function getDataList() {
        try {
            const response = await api.get(
                `values/catalog/${listData.productId}`
            );
            const { data: dataAttribute } = response.data.data;
            setState((prev) => ({ ...prev, dataAttribute }));
        } catch (err) {}
    }

    useEffect(() => {
        getDataList();
    }, [listData.productId]);

    const onChange = (value: number) => {
        setState((prev) => ({ ...prev, quantity: value }));
    };

    const handleQuantity = (value: any) => {
        setState((prev) => ({ ...prev, quantity: value + 1 }));
        const { confirm } = Modal;
        const qty = state.quantity! > 0 ? state.quantity :  1
        new Promise((resolve, reject) => {
            confirm({
                title: "Are you sure you want to add cart ?",
                content: `U want to add product: ${listData.productName}？`,
                onOk: () => {
                    resolve(true);
                    api.put(`/cart/add/${getUserCookie.id}/${listData.productId}?quantity=${qty}`)
                        .then((res) => {
                            notification.success({
                                message: "Add Cart has been Successfully",
                                icon: (
                                    <SmileOutlined
                                        style={{ color: "#108ee9" }}
                                    />
                                ),
                            });
                            setTimeout(function () {
                                history.go(0);
                            }, 1000);
                        })
                        // .catch((err) => handleError(err));
                    // history.push('/quote')
                },
                onCancel: () => {
                    reject(true);
                },
            });
        });
    };

    return (
        <>
            <section id="item-title" className="article">
                <div className="grid-x grid-padding-x">
                    <div className="large-12 cell">
                        <h1>{listData.productName}</h1>
                    </div>
                    <div className="large-4 cell">
                        <div className="c-product-images__lg">
                            <img
                                alt="5' XStream Hood "
                                src={listData.imageProduct}
                                title="5' XStream Hood "
                                className="js-main-img   "
                                data-index={0}
                            />
                        </div>
                        <ul
                            className="c-product-thumbnails js-magnific-popup js-slick slick-initialized slick-slider"
                            data-slick='{"slidesToShow": 4, "slidesToScroll": 4, "arrows" : true, "responsive":  [{"breakpoint":600, "settings":{"slidesToShow":1,"slidesToScroll":1}} ]}'
                        >
                            <div
                                aria-live="polite"
                                className="slick-list draggable"
                            >
                                <div
                                    className="slick-track"
                                    role="listbox"
                                    style={{ opacity: 1, width: "1386px" }}
                                >
                                    {getImage?.map(
                                        (image: string, index: number) => {
                                            return (
                                                <li
                                                    className="c-product-thumbnails__img js-swap-img slick-slide slick-cloned"
                                                    data-index={4}
                                                    data-src="https://www.labconco.com/images/cms/extralarge/clrpmt25.jpg"
                                                    data-slick-index={-2}
                                                    aria-hidden="true"
                                                    tabIndex={-1}
                                                    style={{ width: "89px" }}
                                                    key={index}
                                                >
                                                    <a
                                                        href={image}
                                                        tabIndex={-1}
                                                    >
                                                        <img
                                                            src={image}
                                                            style={{
                                                                width: "89px",
                                                                height: "80px",
                                                            }}
                                                            alt="Paramount Ductless Enclosures"
                                                        />
                                                    </a>
                                                </li>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="large-8 cell">
                        <div className="grid-x  grid-padding-y align-middle">
                            <div className="large-3 cell">
                                <strong>Price:</strong> {listData.price} USD
                            </div>
                            <div className="large-3 cell">
                                <strong>Qty:</strong>
                                <InputNumber
                                    className="c-quote__qty"
                                    id="qty"
                                    min={1}
                                    // max={10}
                                    name="qty"
                                    defaultValue={1}
                                    onChange={onChange}
                                    style={{ margin: "10px" }}
                                />
                            </div>
                            <div className="large-6 cell grid-x">
                                <div className="large-6 cell">
                                    <Button
                                        onClick={(e) => handleQuantity(e)}
                                        // to="/quote"
                                        // to="#"
                                        className="button alert expanded c-quote__button"
                                        id="qty"
                                        style={{height: '50px'}}
                                    >
                                        Request Quote
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid-x grid-padding-y">
                            <div className="large-6 cell">
                                <h3>Attribute</h3>
                                <ul className="no-bullet spec-list">
                                    <li>
                                        <strong>National:</strong>{" "}
                                        {listData.attribute?.country}
                                    </li>
                                </ul>
                            </div>
                            <div className="large-6 cell">
                                <h3>Specifications</h3>
                                <ul className="no-bullet spec-list">
                                    <li>
                                        <strong>
                                            Estimated Shipping Weight:
                                        </strong>{" "}
                                        {listData.attribute?.weightMetric} lbs
                                    </li>
                                    <li>
                                        <strong>
                                            Estimated Shipping Weight metric:
                                        </strong>{" "}
                                        {listData.attribute?.weightMetric} kg
                                    </li>
                                    <li>
                                        <strong>Dimensions:</strong>{" "}
                                        {listData.attribute?.dimensions}
                                    </li>
                                    <li>
                                        <strong>Dimensions metric:</strong>
                                        {listData.attribute?.dimenstionsMetric}
                                    </li>
                                    <li>
                                        <strong>Electrical:</strong>{" "}
                                        {listData.attribute?.electrical}
                                    </li>
                                </ul>
                            </div>
                            <div className="large-12 cell c-prod-detail-links">
                                <ul className="c-prod-detail-links__list grid-x medium-up-2 align-right">
                                    <li className="cell">
                                        <a
                                            data-ga-event-category="PDF Sales Sheet"
                                            data-ga-event-action="Download"
                                            data-ga-event-label="4' Protector XStream Laboratory Hood with 2 service fixtures"
                                            href="/pdf/3764"
                                        >
                                            <i className="material-icons">
                                                file_download
                                            </i>{" "}
                                            Get the Product Datasheet
                                        </a>
                                    </li>
                                    <li className="cell">
                                        <a
                                            href="#related-tools"
                                            className="product-selection"
                                            data-smooth-scroll
                                            id="twhtpn-smooth-scroll"
                                            data-e="bsnxej-e"
                                        >
                                            Use our Product Selection Tools
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="article article--margin largetext"
                id="product-description"
            >
                <div className="grid-x">
                    <div className="large-8 large-push-2 cell">
                        {ReactHtmlParser(listData.description || "")}
                    </div>
                </div>
            </section>
            <section className="article " id="product-long-description">
                <Collapse
                    accordion
                    bordered={false}
                    ghost={true}
                    className="site-collapse-custom-collapse"
                >
                    <Panel
                        header={
                            <div className="grid-x grid-margin-x">
                                <div className="auto cell">
                                    <hr />
                                </div>
                                <div className="shrink cell text-center">
                                    <button
                                        className="button opener"
                                        data-toggle="long-description-content description-opener-icon"
                                    >
                                        Additional Features &amp; Specifications
                                        <i
                                            className="fas fa-chevron-circle-down"
                                            id="description-opener-icon"
                                            data-toggler="fa-chevron-circle-up fa-chevron-circle-down"
                                            aria-expanded="true"
                                            data-e="4krtmx-e"
                                        />
                                    </button>
                                </div>
                                <div className="auto cell">
                                    <hr />
                                </div>
                            </div>
                        }
                        key="id"
                    >
                        <div id="long-description-content" className="">
                            <div className="grid-x">
                                <div className="large-8 large-push-2 cell">
                                    {ReactHtmlParser(listData.feature || "")}
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </section>
            <section className="article  c-videos">
                <div className="grid-x align-center">
                    <div className="large-8  cell text-center ">
                        <div className="responsive-youtube">
                            <iframe
                                id="ytIframe"
                                width={560}
                                height={315}
                                src="https://www.youtube.com/embed/xDm6O4TzHrY?autoplay=0&rel=0"
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="c-videos__desc js-desc text-left js-desc--0">
                            <h4>
                                Benefits of Protector Echo &amp; Airo Filtered
                                Fume Hoods Unique Features
                            </h4>
                            <p>
                                This video shows how filtered fume hoods
                                completely eliminate the largest expense of
                                maintaining a laboratory. Patented features for
                                safety, filtration and connectivity make these
                                hoods uniquely adaptable for a wider variety of
                                uses than any ducted hood.
                            </p>
                        </div>
                        <div className="large-12 cell">
                            <ul className="js-slick c-videos__slider slick-initialized slick-slider">
                                <div className="slick-list draggable">
                                    <div
                                        className="slick-track"
                                        style={{
                                            opacity: 1,
                                            width: "372px",
                                            left: "0px",
                                        }}
                                    >
                                        <li
                                            className="slick-slide slick-current slick-active"
                                            style={{ width: "166px" }}
                                        >
                                            <a className="js-switch-video">
                                                <img src="https://img.youtube.com/vi/xDm6O4TzHrY/0.jpg" />
                                            </a>
                                        </li>
                                        <li
                                            className="slick-slide slick-current slick-active"
                                            style={{ width: "166px" }}
                                        >
                                            <a className="js-switch-video">
                                                <img src="https://img.youtube.com/vi/k9s1U3TEYqI/0.jpg" />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="large-12 cell"></div>
                </div>
            </section>
        </>
    );
}
export default function DetailCatalog() {
    const CATALOG_API = `product`;
    return <DetailView urlApi={CATALOG_API} detailView={ProductDetail} />;
}
