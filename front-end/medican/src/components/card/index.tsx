/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import api from './../../constants/api';
interface Props {
    cardView: (cardData: object) => JSX.Element;
    urlApi: string;
    lengthRender?: number;
}
interface CardViewState {
    dataSource: object[];
}
export default function Card(props: Props) {
    const { cardView, urlApi, lengthRender } = props;
    const [state, setState] = useState<CardViewState>({
        dataSource: [],
    });

    async function getDataList() {
        try {
            const response = await api.get(urlApi);
            const { data: dataSource } = response;
            console.log(response)
            if (dataSource.length >= lengthRender!) {
                const getRandom = (arr: object[], n: number) => {
                    var result = new Array(n),
                        len = arr.length,
                        taken = new Array(len);
                    if (n > len)
                        throw new RangeError(
                            "getRandom: more elements taken than available"
                        );
                    while (n--) {
                        var x = Math.floor(Math.random() * len);
                        result[n] = arr[x in taken ? taken[x] : x];
                        taken[x] = --len in taken ? taken[len] : len;
                    }
                    return result;
                };

                setState((prev) => ({
                    ...prev,
                    dataSource: getRandom(dataSource, lengthRender!),
                }));
            } else {
                setState((prev) => ({ ...prev, dataSource }));
            }
        } catch (error) {}
    }
    useEffect(() => {
        getDataList();
    }, []);
    console.log(state.dataSource)

    return <>{state.dataSource.map(cardView)}</>;
}
