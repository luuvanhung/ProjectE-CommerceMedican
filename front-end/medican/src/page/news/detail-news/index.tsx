/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { default as React, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-slideshow-image/dist/styles.css";
import api from "../../../constants/api";
import SiderBarNewPage from "../../admin/layouts/slider-bar-news";
import { Link } from "react-router-dom";

interface Path {
    id: string;
}

interface State {
    dataNew: New;
}

interface New {
    title?: String;
    content?: string;
    newsId?: number | string;
    imageurl?: string;
    nameurl?: string;
}

export default function DetailNewsPage() {
    const path: Path = useParams();
    const [state, setState] = useState<State>({
        dataNew: {},
    });

    async function getDataList() {
        try {
            const response = await api.get(`/news/${path.id}`);
            const { data: dataNew } = response;
            setState((prev) => ({ dataNew }));
        } catch (err) {}
    }
    console.log(state);
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
                                <h1 className="news-title">
                                    {state.dataNew.title}
                                </h1>
                                <div>
                                    <img
                                        src={state.dataNew.imageurl}
                                        title="Brent Griffith in the Labconco 3D Printing Lab"
                                        alt="Brent Griffith in the Labconco 3D Printing Lab"
                                    />
                                </div>
                                <p
                                    dir="ltr"
                                    style={{
                                        lineHeight: "1.38 ",
                                        marginTop: "0pt",
                                        marginBottom: "0pt",
                                    }}
                                ></p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: "11pt",
                                        fontVariantNumeric: "normal",
                                        fontVariantEastAsian: "normal",
                                        verticalAlign: "baseline",
                                        whiteSpace: "pre-wrap",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: state.dataNew.content || "",
                                    }}
                                ></span>
                            </div>
                            <table className="stepper">
                                <tbody>
                                    <tr>
                                        <td className="text-center">
                                            <button>
                                                <Link to="/news">News</Link>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
