/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../constants/api'
import FilterView from './filter-view'
import { PaginationView } from './pagination'

interface Props {
    listView: (listData: object) => JSX.Element
    urlApi: string
}

interface Path {
    id: string
}
interface ListViewFilter {
    page: number
    limit?: number
    keyword?: string
    totalRecords?: number
}
interface ListViewPagination {
    page: number
    limit?: number
    totalRecords?: number
}
interface ListViewState {
    pagination?: ListViewPagination
    dataSource: object[]
    filter?: ListViewFilter
}
function initialState(): ListViewState {
    const value = new URLSearchParams(window.location.search)
    const page = Number(value.get('page') || '1')
    const limit = Number(value.get('limit') || '10')
    const keyword = value.get('keyword') || ''
    return {
        pagination: { page, limit, totalRecords: 0 },
        dataSource: [],
        filter: { page, keyword, totalRecords: 0, limit }
    }
}
export default function ListView(props: Props) {
    const { listView, urlApi } = props
    const [state, setstate] = useState<ListViewState>(initialState())
    const mountStack = useRef({ [urlApi]: true }).current
    const path: Path = useParams()
    const history = useHistory()

    async function getDataSource(query: string = history.location.search) {
        try {
            const response = await api.get(`${urlApi}/${path.id}/${query}`)

            const { data: dataSource, totalRecords, page, filter } = response.data.data
            console.log(state.filter)

            if (mountStack[urlApi]) {
                setstate((prev) => {
                    const { pagination = {}, ...rest } = prev
                    return {
                        ...rest,
                        dataSource,
                        pagination: { ...pagination, totalRecords, page },
                        filter: { filter, page, pagination }
                    }
                })
            }
        } catch (error) {}
    }
    useEffect(() => {
        getDataSource()
        history.listen((location) => {
            mountStack[urlApi] && getDataSource(location.search)
        })
        return () => {
            mountStack[urlApi] = false
        }
    }, [])

    return (
        <div className='grid-x grid-margin-x' id='faceted_search_for_master'>
            <div className='large-3 cell'>
                <FilterView initialFilter={state.filter} />
            </div>
            <div className='large-9 cell'>
                <div className='facet_list_applied'>
                    <div className='facet_applied'> </div>
                </div>
                <div className='facet_result'>
                    <PaginationView pagination={state.pagination} />
                    <div className='grid-x grid-margin-x small-up-1 medium-up-2 large-up-2 xlarge-up-3'>
                        {state.dataSource.map(listView)}
                    </div>
                </div>
            </div>
        </div>
    )
}
