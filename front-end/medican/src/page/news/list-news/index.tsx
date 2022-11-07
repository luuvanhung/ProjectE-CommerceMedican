/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { default as React, Fragment, useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import api from "../../../constants/api";
import SiderBarNewPage from "../../admin/layouts/slider-bar-news";
import { Link } from "react-router-dom";
import Item from "antd/lib/list/Item";

interface State {
    dataNew: New[];
}

interface New {
    title?: String;
    content?: string;
    newsId?: number | string;
    imageurl?: string;
    nameurl?: string;
}

export default function NewsPage() {
    const PRODUCT_API = `/product/list-products`;
    const NEWS_API = "/news/list-news";
    const numberRenderProduct = 4;
    const numberRenderNews = 5;
    const [state, setState] = useState<State>({
        dataNew: [],
    });

    async function getDataList() {
        try {
            const response = await api.get(`/news/list-news`);
            const { content: dataNew } = response.data;
            setState((prev) => ({ ...prev, dataNew }));
        } catch (err) {}
    }

    useEffect(() => {
        getDataList();
    }, []);

    return (
        <Fragment>
            <div className="stripe">
                <div className="row">
                    <div className="grid-x">
                        <SiderBarNewPage />
                        <div className="large-9 cell small-order-1 large-order-2">
                            <div className="article">
                                <h1>Blog</h1>
                                <div
                                    className="row small-up-1 medium-up-2 large-up-3"
                                    id="main-news-feed"
                                >
                                    <div className="column">
                                        <Link to="https://www.labconco.com/news/3d-printing-at-labconco-generates-sustainability">
                                            <div className="cardlike news">
                                                <img src="https://www.labconco.com/images/cms/wide-large/brent-griffith-3d-lab.png" />
                                                <div>
                                                    <h4>
                                                        3D Printing at Labconco
                                                        Generates Sustainability
                                                        and Agility
                                                    </h4>
                                                    <p>
                                                        <span>
                                                            I was amazed to find
                                                            a room populated
                                                            with dozens of 3D
                                                            printers that I
                                                            didn’t even realize
                                                            we had in our
                                                            facilities. They
                                                            overwhelmed most of
                                                            an area we used to
                                                            call “the ping pong
                                                            room” because it
                                                            historically housed
                                                            a popular breaktime
                                                            diversion for our
                                                            engineers. What I
                                                            saw there blew my
                                                            mind.&nbsp;
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    {state.dataNew.map(
                                        (item: New, key: number) => (
                                            <div
                                                className="column"
                                                id="main-news-feed"
                                            >
                                                <Link
                                                    to={`/news/${item.newsId}`}
                                                >
                                                    <div className="cardlike news">
                                                        <img
                                                            src={item.imageurl}
                                                        />
                                                        <div>
                                                            <h4>
                                                                {item.title}
                                                            </h4>
                                                            <p>
                                                                <p
                                                                    style={{whiteSpace: "nowrap", textOverflow: "ellipsis",overflow:  "hidden" }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            item.content ||
                                                                            "",
                                                                    }}
                                                                ></p>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
