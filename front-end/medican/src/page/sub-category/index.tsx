/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { default as Collapse } from "antd/es/collapse";
import "antd/es/collapse/style/index.css";
import { default as React, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import DetailView from "../../components/detail-view";
import api from "../../constants/api";
import { makeTitle, SLUG_URL } from "../../constants/slug";
import ListView from "./../../components/list-view/index";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

interface Path {
    id: string;
}

interface Attribute {
    id?: number;
    name?: string;
    country?: String;
};
interface Catalog {
    id?: number | string;
    name?: string;
    image?: string;
    catalog?: number;
    attribute?: Attribute[];
    value?: Value[];
}
type Value = {
    id: number;
    name: string;
    attribute: Attribute;
};

interface Product {
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
    attribute?: any;
    products?: { referenceLink?: string };
    price?: number;
}

const { Panel } = Collapse;

const PRODUCT_CATALOG_API = `subcategory`;

function ListCatalogView(listData: Catalog) {
    return (
        <div className="cell" key={listData.id}>
            <div className="product-thumb-2 subproduct">
                <h5>
                    <Link
                        to={`/catalog/${SLUG_URL(listData.name || "")}/${
                            listData.catalog
                        }`}
                    >
                        {listData.name}
                    </Link>
                </h5>
                <div className="grid-x">
                    <div className="shrink cell">
                        <Link
                            to={`/catalog/${SLUG_URL(listData.name || "")}/${
                                listData.catalog
                            }`}
                        >
                            <img alt="" src={listData.image?.split(",")[0]} />
                        </Link>
                    </div>
                    <div className="auto cell">
                        <p>
                            <b>Catalog # </b>
                            {listData.catalog}
                        </p>
                        <div className="product-comparison-check show-for-medium">
                            <input
                                className="product-comparison-checkbox"
                                id="compare-product-1109"
                                type="checkbox"
                                defaultValue={1109}
                            />
                            <label
                                htmlFor="compare-product-1109"
                                className="compare-product"
                            >
                                Compare
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductView(listData: any) {
    const getImage = listData.imageSub;
    const [state, setState] = useState<any>({
        dataSource: [],
        dataProduct: [],
    });
    const [paths, setPaths] = useState<{ key: any; title: any }[]>([]);
    const path: Path = useParams();

    async function getDataList() {
        try {
            const response = await api.get(
                `/subcategory/get-products-by-sub-id/${path.id}`
            );
            const { data: dataSource } = response;

            setState((prev: any) => ({ ...prev, dataProduct: dataSource }));
        } catch (err) {}
    }
    console.log(state);
    useEffect(() => {
        getDataList();
    }, []);

    return (
        <>
            <section className="article" id="product-facets">
                <div
                    className="grid-x grid-margin-x"
                    id="faceted_search_for_master"
                >
                    <section id="product-title" className="article">
                        <div className="grid-x grid-margin-x">
                            <div className="large-6 cell c-product-images">
                                <div className="c-product-images__lg">
                                    <img
                                        alt="Paramount Ductless Enclosures"
                                        src={getImage}
                                        title="Paramount Ductless Enclosures"
                                        className="js-main-img  "
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
                                            style={{
                                                opacity: 1,
                                                width: "1386px",
                                            }}
                                        ></div>
                                    </div>
                                </ul>
                            </div>
                            <div className="large-6 cell">
                                <h1 className="c-product-title">
                                    {listData.subCategoryName}
                                </h1>
                                {ReactHtmlParser(listData.description || "")}
                            </div>
                        </div>
                    </section>
                    <section
                        className="article largetext article--margin"
                        id="product-description"
                    >
                        <div className="grid-x">
                            <div className="large-8 large-push-2 cell">
                                {listData.note}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section className="article" id="product-long-description">
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
            <section className="article" id="product-facets">
                <ListView
                    urlApi={PRODUCT_CATALOG_API}
                    listView={ListCatalogView}
                />
            </section>
            <section className="article" id="product-facets">
                <div
                    className="grid-x grid-margin-x"
                    id="faceted_search_for_master"
                >
                    <div className="large-3 cell">
                        <div className="facet_list_available">
                            <div className="facet_head">
                                Filter these products
                            </div>
                            <ul className="menu vertical facet_available">
                                <li className="menu-text">Built-in Options</li>
                                <li className="menu-text">National</li>
                                <li>
                                    <Link to="/#" rel="#">
                                        U.S. and Canada <span>(6)</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/#" rel="#">
                                        International <span>(6)</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="large-9 cell">
                        <div className="facet_list_applied">
                            {" "}
                            <div className="facet_applied"> </div>{" "}
                        </div>
                        <div className="facet_result">
                            <div className="facet_pagination_top">
                                {" "}
                                <p className="pagination_result">
                                    Showing 1 - {state.dataProduct.length} of{" "}
                                    {state.dataProduct.length} Results
                                </p>{" "}
                            </div>
                            <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-2 xlarge-up-3">
                                {state.dataProduct.map(
                                    (item: Product, key: Number) => (
                                        <Fragment key={item.productId}>
                                            <div className="cell">
                                                <div className="product-thumb-2 subproduct">
                                                    <h5>
                                                        <Link
                                                            to={`/products/${SLUG_URL(
                                                                item.productName ||
                                                                    ""
                                                            )}/${
                                                                item.productId
                                                            }`}
                                                        >
                                                            {" "}
                                                            {
                                                                item.productName
                                                            }{" "}
                                                        </Link>
                                                    </h5>
                                                    <div className="grid-x">
                                                        <div className="shrink cell">
                                                            <Link to="https://www.labconco.com/product/2-purifier-filtered-pcr-enclosure-with-uv-light-and-protection-panel/1590">
                                                                <img
                                                                    alt="Filtered PCR Enclosure"
                                                                    src={
                                                                        item.imageProduct
                                                                    }
                                                                />
                                                            </Link>
                                                        </div>{" "}
                                                        <div className="auto cell">
                                                            <p>
                                                                <b>
                                                                    Price:{"  "}
                                                                </b>
                                                                {item.price} USD
                                                            </p>
                                                            <div className="product-comparison-check show-for-medium">
                                                                <input
                                                                    className="product-comparison-checkbox"
                                                                    id="compare-product-1590"
                                                                    type="checkbox"
                                                                    value="1590"
                                                                />{" "}
                                                                <label className="compare-product">
                                                                    Compare
                                                                </label>
                                                            </div>
                                                        </div>{" "}
                                                    </div>
                                                    <ul>
                                                    <li>
                                                        <strong>
                                                            Built-in Options:{" "}
                                                        </strong>
                                                        UV Light
                                                    </li>
                                                    <li>
                                                        <strong>Nominal Width: </strong>
                                                        2'
                                                    </li>
                                                    <li>
                                                        <strong>Region: </strong>{item.attribute.country}
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="article  c-videos">
                <div className="grid-x align-center">
                    <div className="large-8  cell text-center ">
                        <div className="responsive-youtube">
                            <iframe
                                width="854"
                                height="480"
                                src="https://www.youtube.com/embed/7baRFhlcSTQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        </div>
                        <div className="c-videos__desc js-desc text-left js-desc--0">
                            <h4>
                                Gail's Story Changed the Way We Think About Lab
                                Freeze Drying
                            </h4>
                            <p>
                                When she visited Kelly at Labconco, Gail's
                                struggle led to an epiphany that would change
                                how laboratory freeze drying is done. With the
                                creation of Lyo-Works OS, samples can now be
                                monitored from anywhere. And with End-Zone™ End
                                Point Detection, now FreeZone Freeze Dryers can
                                even send you an alert when your samples are
                                completely lyophilized.
                            </p>
                        </div>
                    </div>
                    <div className="large-12 cell"></div>
                </div>
            </section>
        </>
    );
}

export default function SubCategoryPage() {
    const PRODUCT_API = `subcategory`;
    return <DetailView urlApi={PRODUCT_API} detailView={ProductView} />;
}
