/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as Form } from 'antd/es/form'
import 'antd/es/form/style/css'
import 'antd/es/input/style/index.css'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'


interface Filter {
    key?: string
    value?: string[]
}
interface Props {
    initialFilter?: { keyword?: string; page?: number, filter?: Filter[] }
}
interface Item {
    key: string
    value: string
}
interface Event {
    target: { checked: boolean, name: string }
}

export default function FilterView(props: Props) {
    const { initialFilter = {} } = props
    const history = useHistory()

    const onFilterClick = (event: any) => {
        const filter: Record<string, string> = {
            page: '1',
            keyword: event.target.checked ? event.target.name : '',
        }
        const params = new URLSearchParams(filter)
        history.replace({ pathname: window.location.pathname, search: params.toString() })
    }

    function getItemFilter(value: any) {
        return value?.map((item: Item, index: number) => {
            return <li className='menu-text' key={index}>
                {item.key}
                {Object.entries(item.value).map(([key, value]: string[], i: number) => {
                    return <Form.Item name={key} key={i} >
                        <Checkbox name={key} value={value} onChange={onFilterClick}>{key}({value})</Checkbox>
                    </Form.Item>
                })}
            </li>
        })
    }

    return <Fragment>
        {Object(initialFilter.filter)?.length > 0 && <div className="facet_list_available">
            <div className="facet_head">Filter these products</div>
            <ul className="menu vertical facet_available">
                {getItemFilter(initialFilter.filter)}
            </ul>
        </div>}
    </Fragment >
}


