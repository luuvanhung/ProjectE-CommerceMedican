/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../constants/api'
import './style.scss'

interface Props {
    detailView: (listData: object) => JSX.Element
    urlApi: string
}

interface Path {
    id: string
}
interface ListViewState {
    dataDetail: object
}

export default function DetailView(props: Props) {
    const { detailView, urlApi } = props
    const [state, setstate] = useState<ListViewState>({
        dataDetail: {}
    })
    const path: Path = useParams()
    
    async function getDataDetail() {
        try {
            const response = await api.get(`${urlApi}/${path.id}`)

            const { data: dataDetail } = response

            setstate((prev) => ({ ...prev, dataDetail }))
        } catch (error) {}
    }
    
    useEffect(() => {
        getDataDetail()
    }, [])

    return <>{detailView(state.dataDetail)}</>
}
