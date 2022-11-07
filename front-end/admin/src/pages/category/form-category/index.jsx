/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

interface Props {
    onSubmit: (values: any) => void;
    categories?: {
        id?: number,
        name?: string,
        image: string,
        description?: string,
        referenceLink?: string,
        categoryId?: number,
    };
}

interface State {
    dataValueUpdate: object[];
}

export default function CategoriesForm(props: Props) {
    const { onSubmit, categories } = props;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        dataValueUpdate: [],
    });
    let history = useHistory();

    useEffect(() => {
        form.setFieldsValue(categories);
    }, []);

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    return (
        <div className="form">
            <div className="categories-form">
                <h2>{categories ? "Update Categories" : "Add Categories"}</h2>
                <Form
                    initialValues={categories}
                    onFinish={onSubmit}
                    form={form}
                    onValuesChange={onChangeUpdate}
                >
                    <Form.Item
                        label="Categories Name"
                        name="categoryName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Categories name!",
                            },
                            {
                                pattern:
                                    /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+(([a-zA-Z ])?[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]*)*$/,
                                message: "Categories name is not valid",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="Enter Categories name"
                        />
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
                            data={categories?.description || ""}
                            onReady={(editor) => {}}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                form.setFieldsValue({ description: data });
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />
                    </Form.Item>
                    <div className="categories-form__onSubmit">
                        <Form.Item>
                            <Button
                                type="primary"
                                className="btnSubmit"
                                htmlType="submit"
                                disabled={
                                    Object.keys(state.dataValueUpdate).length >
                                    0
                                        ? false
                                        : true
                                }
                            >
                                {categories ? "Update" : "Submit"}
                            </Button>
                        </Form.Item>
                        <Button type="ghost" onClick={() => history.goBack()}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
