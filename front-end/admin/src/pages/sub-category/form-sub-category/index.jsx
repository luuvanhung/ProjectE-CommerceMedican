import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import "antd/es/checkbox/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { default as Select } from "antd/es/select";
import "antd/es/select/style/index.css";
import { default as Spin } from "antd/es/spin";
import "antd/es/spin/style/index.css";
import { default as ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { default as React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../constants/api";
import "./style.css";

interface Props {
    onSubmit: (values: object) => void;
    sub_categories?: object;
}
interface Categories {
    id: number;
    name?: string;
}

interface State {
    dataSource: Categories[];
    dataValueUpdate: object[];
}

export default function SubCategoriesForm(props: Props) {
    const { onSubmit, sub_categories } = props;
    const [form] = Form.useForm();
    let history = useHistory();
    const [state, setState] = useState({
        dataSource: [],
        dataValueUpdate: [],
    });

    async function getDataList() {
        try {
            const response = await api.get("/category/get-categorys");
            const { data: dataSource } = response;
            setState((prev) => ({ ...prev, dataSource }));
        } catch (err) {
            notification.error({
                message: "Error is occured",
                description: "No data found.",
            });
        }
    }

    useEffect(() => {
        getDataList();
        form.setFieldsValue(sub_categories);
        return () => {
            form.setFieldsValue({});
        };
    }, [ form.setFieldsValue(sub_categories)]);
    console.log(sub_categories)
    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    return (
        <div className="sub-categories-form">
            <h2>
                {sub_categories
                    ? "Update sub-categories"
                    : "Add sub-categories"}
            </h2>
            <Form
                onFinish={onSubmit}
                form={form}
                onValuesChange={onChangeUpdate}
            >
                <div className="sub-categories-form item">
                    <div className="sub-categories-form__item__left">
                        <Form.Item
                            className="sub-categories-form__item__left__input"
                            label="Sub-Category Name"
                            name="subCategoryName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!",
                                },
                                {
                                    pattern:
                                        /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+(([a-zA-Z ])?[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*)*$/,
                                    message: "Sub-Category name is not valid",
                                },
                            ]}
                        >
                            <Input type="text" placeholder="Enter full name" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Description!",
                                },
                            ]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "|",
                                        "outdent",
                                        "indent",
                                        "|",
                                        "bulletedList",
                                        "numberedList",
                                        "|",
                                        "code",
                                        "codeBlock",
                                        "|",
                                        "blockQuote",
                                        "insertTable",
                                        "mediaEmbed",
                                        "|",
                                        "undo",
                                        "redo",
                                    ],
                                }}
                                data={sub_categories.description || ""}
                                onReady={(editor) => {}}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        description: data,
                                    });
                                }}
                                onBlur={(event, editor) => {}}
                                onFocus={(event, editor) => {}}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Feature"
                            name="feature"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Feature!",
                                },
                            ]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "|",
                                        "outdent",
                                        "indent",
                                        "|",
                                        "bulletedList",
                                        "numberedList",
                                        "|",
                                        "code",
                                        "codeBlock",
                                        "|",
                                        "blockQuote",
                                        "insertTable",
                                        "mediaEmbed",
                                        "|",
                                        "undo",
                                        "redo",
                                    ],
                                }}
                                data={sub_categories.feature || ""}
                                onReady={(editor) => {}}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        feature: data,
                                    });
                                }}
                                onBlur={(event, editor) => {}}
                                onFocus={(event, editor) => {}}
                            />
                        </Form.Item>
                    </div>
                    <div className="sub-categories-form__item__right">
                        <Form.Item
                            name="categoryId"
                            label="Categories Name : "
                            rules={[
                                {
                                    required: true,
                                    message: "Please choose your categories!",
                                },
                            ]}
                        >
                            {state.dataSource.length > 0 ? (
                                <Select
                                    showSearch
                                    disabled={sub_categories && true}
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    filterOption={(input, option: any) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {state.dataSource.map(
                                        (category: Categories) => {
                                            return (
                                                <Select.Option
                                                    key={category.categoryId}
                                                    value={category.categoryId}
                                                >
                                                    {category.categoryName}
                                                </Select.Option>
                                            );
                                        }
                                    )}
                                </Select>
                            ) : (
                                <Spin size="large" />
                            )}
                        </Form.Item>
                    </div>
                </div>
                <div className="sub-categories-form__onSubmit">
                    <Form.Item>
                        <Button
                            type="primary"
                            className="btnSubmit"
                            htmlType="submit"
                            disabled={
                                Object.keys(state.dataValueUpdate).length > 0
                                    ? false
                                    : true
                            }
                        >
                            {sub_categories ? "Update" : "Submit"}
                        </Button>
                    </Form.Item>
                    <Button type="ghost" onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
}
