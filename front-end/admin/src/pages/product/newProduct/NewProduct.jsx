/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { notification } from "antd";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import { default as InputNumber } from "antd/es/input-number";
import "antd/es/input-number/style/index.css";
import "antd/es/input/style/index.css";
import "antd/es/notification/style/index.css";
import { default as Select } from "antd/es/select";
import "antd/es/select/style/index.css";
import { default as Spin } from "antd/es/spin";
import "antd/es/spin/style/index.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UploadImage from "../../../components/upload-image";
import api, { URL_UPLOAD } from "../../../constants/api";
import "./newProduct.css";

export default function NewProduct() {
    const [form] = Form.useForm();
    const history = useHistory();
    const [state, setState] = useState({
        country: [],
        dataValueUpdate: {},
        dataSource: [],
        image: [],
    });
    const url = `${URL_UPLOAD}`;

    async function getDataList() {
        try {
            const response = await api.get("subcategory/get-allsub");
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
    }, []);

    const onSubmit = (value) => {
        api.post("/product/create-product", {
            ...value,
            attribute: {
                dimensions: `${value.width}"w + ${value.depth}"d + ${value.height}"h`,
                dimenstionsMetric: `${value.width}w + ${value.depth}d + ${value.height}h cm`,
                weight: value.weight,
                weightMetric: value.weightMetric,
                electrical: value.electrical,
                country: value.country,
            },
            subCategory: {
                subCategoryId: value.subCategoryId,
            },
            imageProduct: value.imageProduct.toString(),
        })
            .then((res) => {
                notification.success({
                    message: "Product has been added Successfully",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
            })
            .catch((err) => {
                handleError(err);
            });
    };

    const handleError = (error) => {
        switch (error.response.status) {
            case 400:
                notification.error({
                    message: "Product add failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
            default:
                notification.error({
                    message: "Catalog has been added Failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
        }
    };

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    const uploadImg = (value: string) => {
        const urlImg = value;
        state.image.push(urlImg);
        console.log(value, state.image);
        form.setFieldsValue({ imageProduct: state.image });
    };

    const deleteImg = (value: string) => {
        const urlImg = url + value;
        const index = state.image.indexOf(urlImg);
        state.image.splice(index, 1);
        form.setFieldsValue({ image: state.image });
        // api.put(`catalogs/update/image/${props.catalog?.id}`, {
        //     image: state.image.toString(),
        // });
    };

    const convertImage = (image?: string) => {
        const data: UploadFile[] =
            image?.split(",").map((file: string, index: number) => {
                return {
                    uid: index.toString(),
                    name: `${file}`,
                    url: `${file}`,
                };
            }) || [];
        return data;
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <Form
                className="addProductForm"
                // initialValues={props.catalog}
                onFinish={onSubmit}
                form={form}
                onValuesChange={onChangeUpdate}
                style={{ flexDirection: "column" }}
            >
                <div className="addProductItem">
                    <Form.Item
                        label="Product Name"
                        name="productName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Name!",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Enter catalog name" />
                    </Form.Item>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Quantity!",
                            },
                            {
                                pattern: /^[0-9]\d*?$/,
                                message: "Quantity cannot enter decimal",
                            },
                            {
                                type: "number",
                                min: 0,
                                message:
                                    "Quantity cannot enter negative numbers",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter Quantity"
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                                parseFloat(`${value}`.replace(/\\s?|(,*)/g, ""))
                            }
                        />
                    </Form.Item>
                    <p>For example: Quantity: 120,000</p>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Price!",
                            },
                            {
                                pattern: /^[0-9]\d*?$/,
                                message: "Price cannot enter decimal",
                            },
                            {
                                type: "number",
                                min: 0,
                                message: "Price cannot enter negative numbers",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter Price"
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                                parseFloat(`${value}`.replace(/\\s?|(,*)/g, ""))
                            }
                        />
                    </Form.Item>
                    <p>For example: Price: 120,000USD</p>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Country!",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Enter catalog name" />
                    </Form.Item>
                    <p>For example: Country: VietNam</p>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        label="Electrical"
                        name="electrical"
                        rules={[
                            {
                                required: true,
                                message: "Please input your electrical!",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            placeholder="Enter catalog electrical"
                        />
                    </Form.Item>
                    <p>
                        For example: Electrical: 115V, 60 Hz, 16A (console);
                        115V, 60 Hz, 16A (tray dryer)A
                    </p>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        name="weight"
                        label="Weight"
                        rules={[
                            {
                                required: true,
                                message: "Please input your weight!",
                            },
                            {
                                pattern: /^[0-9]\d*?$/,
                                message: "weight cannot enter decimal",
                            },
                            {
                                type: "number",
                                min: 0,
                                message: "weight cannot enter negative numbers",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter weight"
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                                parseFloat(`${value}`.replace(/\\s?|(,*)/g, ""))
                            }
                        />
                    </Form.Item>
                    <p>For example: Weight: 678.0 lbs</p>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        name="weightMetric"
                        label="Weight Metric"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Weight Metric!",
                            },
                            {
                                pattern: /^[0-9]\d*?$/,
                                message: "Weight Metric cannot enter decimal",
                            },
                            {
                                type: "number",
                                min: 0,
                                message:
                                    "Weight Metric cannot enter negative numbers",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter Weight Metric"
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                                parseFloat(`${value}`.replace(/\\s?|(,*)/g, ""))
                            }
                        />
                    </Form.Item>
                    <p>For example: Weight metric: 307.5 kg</p>
                </div>

                <div className="addProductItem">
                    <Form.Item
                        label="Dimensions"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Dimensions!",
                            },
                        ]}
                    >
                        <div className="dimensions">
                            <Form.Item
                                name="width"
                                label="Width"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Width!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message: "Width cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Width"
                                />
                            </Form.Item>
                            <Form.Item
                                name="depth"
                                label="Depth"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your depth!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message: "Depth cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Depth"
                                />
                            </Form.Item>
                            <Form.Item
                                name="height"
                                label="Height"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your height!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message:
                                            "Height cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Height"
                                />
                            </Form.Item>
                        </div>
                        <p>
                            For example:Dimensions: 32.4" w x 29.6" d x 63.7" h
                        </p>
                    </Form.Item>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        label="Dimensions Metric"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Dimensions!",
                            },
                        ]}
                    >
                        <div className="dimensions">
                            <Form.Item
                                name="widthMetric"
                                label="Width Metric"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Width!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message: "Width cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Width"
                                />
                            </Form.Item>
                            <Form.Item
                                name="depthMetric"
                                label="Depth Metric"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your depth!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message: "Depth cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Depth"
                                />
                            </Form.Item>
                            <Form.Item
                                name="heightMetric"
                                label="Height Metric"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your height!",
                                    },
                                    {
                                        pattern: /^[0-9]/,
                                        message:
                                            "Height cannot negative number",
                                    },
                                ]}
                            >
                                <InputNumber
                                    type="number"
                                    placeholder="Enter Height"
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <p>
                        For example: Dimensions metric: 82.2 w x 75.1 d x 161.7
                        h cm
                    </p>
                </div>
                <div className="addProductItemDescription">
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
                            // data={props.catalog?.description || ''}
                            onReady={(editor) => {}}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                form.setFieldsValue({ description: data });
                            }}
                            onBlur={(event, editor) => {}}
                            onFocus={(event, editor) => {}}
                        />
                    </Form.Item>
                </div>
                <div className="addProductItem">
                    <Form.Item
                        name="subCategoryId"
                        label="sub Categories Name : "
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
                                // disabled={sub_categories && true}
                                placeholder="Select a sub_categories category"
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
                                                key={category.subCategoryId}
                                                value={category.subCategoryId}
                                            >
                                                {category.subCategoryName}
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
                <div className="addProductItem"></div>
                <Form.Item
                    valuePropName=""
                    label="Image"
                    name="imageProduct"
                    // rules={[{ required: props.isEditCatalog ? false : true, message: 'Please add your Images!' }]}
                >
                    <UploadImage
                        fileListImage={[]}
                        // fileListImage={
                        //     props?.news ? convertImage(props.news.imageurl) : []
                        // }
                        customRequest={(option) => uploadImg(option)}
                        onRemove={(option) => deleteImg(option)}
                    />
                </Form.Item>
                <Button
                    type="primary"
                    className="addProductButton"
                    htmlType="submit"
                    disabled={state?.dataValueUpdate ? false : true}
                >
                    Create
                </Button>
            </Form>
        </div>
    );
}
