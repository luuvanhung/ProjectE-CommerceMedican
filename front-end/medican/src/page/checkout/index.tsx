/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import Cookies from "js-cookie";
import { default as React, Fragment, useEffect, useState } from "react";
import api from "../../constants/api";
import "./style.scss";
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
interface State {
    dataCart: Cart[];
    quantity?: number;
    totalProduct?: number;
}
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
    products?: { referenceLink?: string };
    price?: number;
}
interface Cart {
    cartItemId?: number;
    quantity?: number;
    totalPrice?: number;
    product?: Product;
}

export default function CheckPage() {
    const [state, setState] = useState<State>({
        dataCart: [],
        quantity: 0,
        totalProduct: 0,
    });
    const getUserCookie: Cookies = JSON.parse(Cookies.get("user")! || "0");
    let priceProduct: number | undefined = state.totalProduct! > 0 ? state.totalProduct : 0;

    async function getDataList() {
        try {
            const response = await api.get(
                `/cart/get-cartitem/${getUserCookie.id}`
            );
            const { data: dataCart } = response;
            setState((prev) => ({ ...prev, dataCart }));
        } catch (err) {}
    }
    
    useEffect(() => {
        getDataList();
    }, []);

    return (
        <div className="article">
            <h1>Quote Cart Checkout</h1>
            <p>
                Please review your data before clicking "Submit Request for
                Quote."
            </p>
            <p>
                If you have an immediate deadline, or if you have other
                questions or comments, please let us know in the "Comments"
                field.
            </p>
            <form action="/quote/checkout" method="post">
                <div className="grid-x grid-margin-x">
                    <div className="large-8 cell">
                        <div id="quote_questions">
                            <p>
                                <b>Please answer the following questions</b>
                            </p>
                            <p>
                                Fields marked with{" "}
                                <span className="hint">*</span> are required.
                            </p>
                            <p>
                                <label
                                    className="align_right_long"
                                    htmlFor="contact_method"
                                >
                                    <span className="hint">*</span> How would
                                    you like to be contacted?{" "}
                                </label>
                                <select
                                    id="contact_method"
                                    name="contact_method"
                                >
                                    <option value="">
                                        Select Contact Method...
                                    </option>
                                    <option value="Email" id="email">
                                        Email
                                    </option>
                                    <option value="Phone" id="phone">
                                        Phone
                                    </option>
                                    <option value="Fax" id="fax">
                                        Fax
                                    </option>
                                </select>
                                <span className="hint"></span>
                            </p>

                            <p>
                                <label
                                    className="align_right_long"
                                    htmlFor="quote_use"
                                >
                                    <span className="hint">*</span> How will
                                    this quote be used?{" "}
                                </label>
                                <select id="use" name="use">
                                    <option value="" id="">
                                        Select Quote Use...
                                    </option>
                                    <option
                                        value="Purchase within 30 days"
                                        id="immediate_purchase"
                                    >
                                        Purchase within 30 days
                                    </option>
                                    <option
                                        value="Purchase within 90 days"
                                        id="purchase_within_90_days"
                                    >
                                        Purchase within 90 days
                                    </option>
                                    <option
                                        value="Purchase within 12 months"
                                        id="purchase_within_12_months"
                                    >
                                        Purchase within 12 months
                                    </option>
                                    <option
                                        value="Budgetary reference"
                                        id="budgetary_reference"
                                    >
                                        Budgetary reference
                                    </option>
                                    <option value="other" id="other">
                                        Other
                                    </option>
                                </select>
                                <span className="hint"></span>
                            </p>

                            <p>
                                <label
                                    htmlFor="comment"
                                    className="align_right_long"
                                >
                                    Comments:{" "}
                                </label>
                                <textarea
                                    rows={6}
                                    cols={35}
                                    name="comment"
                                    id="comment"
                                ></textarea>
                            </p>

                            <p>
                                <label htmlFor="contact_immediately">
                                    <input
                                        type="checkbox"
                                        id="contact_immediately"
                                        value="Y"
                                        name="contact_immediately"
                                    />{" "}
                                    Please have a Labconco representative
                                    contact me immediately.
                                </label>
                            </p>
                        </div>

                        <fieldset>
                            <table className="cart hover unstriped stack">
                                <tbody>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>Catalog #</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>

                                    {state.dataCart.map(
                                        (item: any, key?: number) => (
                                            <tr>
                                                <td className="item-remove"></td>
                                                <td className="item-image">
                                                    <img
                                                        src={
                                                            item.product
                                                                .imageProduct
                                                        }
                                                        style={{
                                                            width: "38px",
                                                            height: "50px",
                                                        }}
                                                    />
                                                </td>
                                                <td className="item-sku">
                                                    {item.product.productId}{" "}
                                                </td>
                                                <td className="item-description">
                                                    <a href="/product/4-purifier-axiom-class-ii-c1-biosafety-cabinet-with-10-sash-opening-5/8668">
                                                        2' Paramount Ductless
                                                        Enclosure
                                                    </a>
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>{item.totalPrice} $ </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>TotalPrice:</td>
                                        <td>{state.dataCart.map((item: any, key: number) => { priceProduct  +=  item.totalPrice})}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{priceProduct}$</td>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </div>
                    <div className="large-4 cell">
                        <div id="quote_profile" className="gray-card">
                            <b>Submitted by</b>
                            <hr />
                            <p>
                                Mr/Ms. {getUserCookie.fullName}
                                <br />
                                {getUserCookie.username}
                                <br />
                                {getUserCookie.address} street
                                <br />
                                Viet Nam, 123456
                                <br />
                                Phone: {getUserCookie.phoneNumber}
                                <br />
                                {getUserCookie.email}
                                <br />
                            </p>
                            <a href="/profile/personal" className="button info">
                                Change
                            </a>
                            <br />
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Submit Request for Quote"
                    name="submit"
                    className="button alert"
                />
            </form>
        </div>
    );
}

function hardCore() {
    return (
        <Fragment>
            <tr>
                <td className="item-remove"></td>
                <td className="item-image">
                    <img src="https://www.labconco.com/images/cms/thumb/xstream_1105100-_rgb_web_jan11_2019-2.jpg" />
                </td>
                <td className="item-sku">110416000 </td>
                <td className="item-description">
                    <a href="/product/4-purifier-axiom-class-ii-c1-biosafety-cabinet-with-10-sash-opening/8664">
                        4' Protector XStream I-S Laboratory Hood
                    </a>
                </td>
                <td>4 </td>
                <td>4000 $ </td>
            </tr>
            <tr>
                <td className="item-remove"></td>
                <td className="item-image">
                    <img src="https://www.labconco.com/images/cms/thumb/3pmtitem.jpg" />
                </td>
                <td className="item-sku">6963200 </td>
                <td className="item-description">
                    <a href="/product/4-purifier-axiom-class-ii-c1-biosafety-cabinet-with-10-sash-opening-5/8668">
                        2' Paramount Ductless Enclosure
                    </a>
                </td>
                <td>1 </td>
                <td>4000 $ </td>
            </tr>
        </Fragment>
    );
}
