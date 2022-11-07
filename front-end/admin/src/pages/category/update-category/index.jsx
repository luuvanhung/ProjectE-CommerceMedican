import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../../../constants/api";
import CategoriesForm from "../form-category";

interface Categories {
    id: number;
    name: string;
    image: string;
    description: string;
    referenceLink: string;
    categoryId: number;
}

interface Path {
    id: string;
}

export default function EditCategoriesPage() {
    const [categories, setCategories] = useState({ name: "abc" });
    const path: Path = useParams();
    let history = useHistory();

    useEffect(() => {
        api.get(`categories/${path.id}`).then((res) => {
            const { data: dataSource } = res.data.data
            setCategories({
                ...dataSource
            })
        })
    }, [])

    const onEditCategories = (values: Categories) => {
        api.put(`categories/update/${path.id}`, {
            ...values,
            image: values.image?.toString(),
        })
            .then(() => {
                notification.success({
                    message: "Product updated successfully",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
                history.goBack();
            })
            .catch(() => {
                return notification.error({
                    message: "Product has been updated Failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
            });
    };

    // return <>{categories && <CategoriesForm onSubmit={onEditCategories} categories={categories} />}</>
    return (
        <>
            {categories && (
                <CategoriesForm
                    onSubmit={onEditCategories}
                    categories={categories}
                />
            )}
        </>
    );
}
