/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from "antd";
import Cookies from "js-cookie";
import { default as React, useEffect, useState } from "react";
import { default as InputNumber } from "antd/es/input-number";
import "antd/es/input-number/style/index.css";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import { Fragment } from "react";

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
interface State {
    dataCart: Cart[];
    quantity?: number;
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

function cartItem() {
    const [state, setState] = useState<State>({
        dataCart: [],
        quantity: 0,
    });
    const getUserCookie: Cookies = JSON.parse(Cookies.get("user")! || "0");

    const checkLogin = () => {
        Cookies.get("user") == null
            ? (window.location.href = "/login")
            : (window.location.href = "/checkout");
    };

    async function getDataList() {
        try {
            const response = await api.get(`/cart/get-cartitem/${getUserCookie.id}`);
            const { data: dataCart } = response;
            setState((prev) => ({ ...prev, dataCart }));
        } catch (err) {}
    }
   
    useEffect(() => {
        getDataList();
    }, []);

    return (
        <form id="cart_form">
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
                        {state.dataCart.map((item: any, key?: number) => {
                            return (
                                <tr>
                                    <td className="item-remove">
                                        <button
                                            className="button transparent short"
                                            name="update_quantity"
                                            type="submit"
                                            value="X"
                                        >
                                            <i className="material-icons">
                                                close
                                            </i>
                                        </button>
                                    </td>
                                    <td className="item-image">
                                        <img
                                            src={item.product.imageProduct}
                                            style={{
                                                width: "50%",
                                                height: "60px",
                                            }}
                                        />
                                    </td>
                                    <td className="item-sku">
                                        {item.product.productId}{" "}
                                    </td>
                                    <td className="item-description">
                                        <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                                            {item.product.productName}
                                        </a>
                                    </td>
                                    <td>
                                        <div className="grid-x">
                                            <div className="auto cell">
                                                <InputNumber
                                                    className="qty float-right"
                                                    id="qty"
                                                    min={1}
                                                    // max={10}
                                                    name="qty"
                                                    defaultValue={item.quantity}
                                                />
                                            </div>
                                            <div className="shrink cell">
                                                <button
                                                    className="button transparent short"
                                                    name="update_quantity"
                                                    type="submit"
                                                    value="Update"
                                                >
                                                    <i className="material-icons">
                                                        refresh
                                                    </i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="item-description">
                                        <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                                            {item.product.price} $
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </fieldset>
            <div className="checkout-navigation">
                <Link to="" className="button info">
                    <i className="material-icons">chevron_left</i> Continue
                    Browsing
                </Link>
                <Button
                    // type="submit"
                    value="Checkout"
                    name="checkout"
                    className="button alert float-right"
                    onClick={() => checkLogin()}
                >
                    Checkout <i className="material-icons">chevron_right</i>
                </Button>
            </div>
        </form>
    );
}

export default function QuotePage() {
    return (
        <div className="article">
            <h1>Your Quote</h1>
            <p>
                Click "Checkout" to request a quote. A Labconco representative
                will work with our network of dealers to deliver pricing
                information to you.
            </p>
            <p>
                Click "Continue Browsing" to add more items to your Quote Cart.
            </p>
            {cartItem()}
        </div>
    );
}

function hardCore() {
    return (
        <Fragment>
            <tr>
                <td className="item-remove">
                    <button
                        className="button transparent short"
                        name="update_quantity"
                        type="submit"
                        value="X"
                    >
                        <i className="material-icons">close</i>
                    </button>
                </td>
                <td className="item-image">
                    <img src="https://www.labconco.com/images/cms/thumb/xstream_1105100-_rgb_web_jan11_2019-2.jpg" />
                </td>
                <td className="item-sku">110416000 </td>
                <td className="item-description">
                    <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                        4' Protector XStream I-S Laboratory Hood
                    </a>
                </td>
                <td>
                    <div className="grid-x">
                        <div className="auto cell">
                            <input
                                className="qty float-right"
                                name="quantity[1-7615]"
                                type="text"
                            />
                        </div>
                        <div className="shrink cell">
                            <button
                                className="button transparent short"
                                name="update_quantity"
                                type="submit"
                                value="Update"
                            >
                                <i className="material-icons">refresh</i>
                            </button>
                        </div>
                    </div>
                </td>
                <td className="item-description">
                    <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                        1000 $
                    </a>
                </td>
            </tr>
            <tr>
                <td className="item-remove">
                    <button
                        className="button transparent short"
                        name="update_quantity"
                        type="submit"
                        value="X"
                    >
                        <i className="material-icons">close</i>
                    </button>
                </td>
                <td className="item-image">
                    <img src="https://www.labconco.com/images/cms/thumb/3pmtitem.jpg" />
                </td>
                <td className="item-sku">6963200 </td>
                <td className="item-description">
                    <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                        2' Paramount Ductless Enclosure
                    </a>
                </td>
                <td>
                    <div className="grid-x">
                        <div className="auto cell">
                            <input
                                className="qty float-right"
                                name="quantity[1-7615]"
                                type="text"
                            />
                        </div>
                        <div className="shrink cell">
                            <button
                                className="button transparent short"
                                name="update_quantity"
                                type="submit"
                                value="Update"
                            >
                                <i className="material-icons">refresh</i>
                            </button>
                        </div>
                    </div>
                </td>
                <td className="item-description">
                    <a href="/product/4-protector-xstream-i-s-laboratory-hood/7615">
                        4000 $
                    </a>
                </td>
            </tr>
        </Fragment>
    );
}
