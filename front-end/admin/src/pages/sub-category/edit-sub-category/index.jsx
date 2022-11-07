import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import api from '../../../constants/api'
import SubCategoriesForm from '../form-sub-category'

interface Path {
    id: string,
}
interface SubCategories {
    id: number,
    name: string,
    category: Category[],
}

interface Category {
    id: number,
    name: string,
}

export default function EditSubCategoriesPage() {
    const [subCategories, setSubCategories] = useState({})
    const path: Path = useParams()
    let history = useHistory()

    useEffect(() => {
        api.get(`subcategory/${path.id}`).then((res) => {
            const { data: dataSource } = res
            setSubCategories(dataSource)
        })
    }, [])
    console.log(subCategories)
    const onEditSubCategories = (values: object) => {
        api.put(`sub-categories/update/${path.id}`, { ...values })
            .then(() => {
                notification.success({
                    message: 'Sub-Categories updated successfully',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />
                })
                history.goBack()
            })
            .catch(() => {
                return notification.error({
                    message: 'Sub-Categories has been updated Failed',
                    icon: <FrownOutlined style={{ color: '#f21b3b' }} />
                })
            })
    }

    return <>{subCategories && <SubCategoriesForm onSubmit={onEditSubCategories} sub_categories={subCategories} />}</>
}
