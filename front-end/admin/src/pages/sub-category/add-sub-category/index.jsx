import { default as notification } from 'antd/es/notification'
import 'antd/es/notification/style/index.css'
import React from 'react'
import { useHistory } from 'react-router'
import api from '../../../constants/api'
import SubCategoriesForm from '../form-sub-category'
interface Values {
    name?: string,
    category?: object
}

export default function AddSubCategoriesPage() {
    const history = useHistory()

    const onAddSubCategories = (values: Values) => {
        api.post('subcategory/create-subcategory', {
            ...values,
            imageSub: "https://www.labconco.com/images/cms/extralarge/flaskscrubber_412101010_window_left_rgb_20200824_web.jpg"
        }).then(() => {
            notification.success({
                message: 'Sub-Categories added successfully',
                description: 'Added successful Sub-Categories'
            })
            history.goBack()
        })
    }

    return <SubCategoriesForm onSubmit={onAddSubCategories} />
}
