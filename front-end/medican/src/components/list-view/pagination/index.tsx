import { default as Pagination } from 'antd/es/pagination'
import 'antd/es/pagination/style/css'
import { default as React } from 'react'
import { useHistory } from 'react-router'

interface PaginationOptions {
    page?: number
    limit?: number
    totalRecords?: number
}

interface Props {
    pagination?: PaginationOptions
}

export function PaginationView(props: Props) {
    const { pagination } = props

    const history = useHistory()

    const onChangeSize = (current: number, size?: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set('page', `${current || pagination?.page}`)
        params.set('limit', `${size || pagination?.limit}`)
        history.replace({ pathname: window.location.pathname, search: params.toString() })
    }

    return (
        <div className='facet_pagination_top'>
            {pagination?.totalRecords! > 0 && (
                <>
                    {pagination?.totalRecords! > 10 && (
                        <ul className='pagination' role='navigation' aria-label='Pagination'>
                            <li>
                                <Pagination
                                    current={pagination?.page}
                                    pageSize={pagination?.limit}
                                    total={pagination?.totalRecords}
                                    size='small'
                                    onChange={onChangeSize}
                                    showSizeChanger={false}
                                />
                            </li>
                        </ul>
                    )}
                    <p className='pagination_result'>
                        Showing {pagination?.page} - {pagination?.limit} of {pagination?.totalRecords} Results
                    </p>
                </>
            )}
        </div>
    )
}
